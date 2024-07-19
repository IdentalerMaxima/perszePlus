import { Grid, CircularProgress, Button } from "@mui/material";
import PageComponent from "../components/PageComponent";
import CourseCard from "../components/cards/CourseCard";
import axiosClient from "../axios";
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import CourseData from "../components/forms/CourseData";

export default function Dashboard() {
    const { currentUser, isAdmin } = useStateContext();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openCourseDialog, setOpenCourseDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCreateCourse = () => {
        setDialogMode('create');
        setOpenCourseDialog(true);
    };

    const fetchCourses = async () => {
        try {
            const response = await axiosClient.get('/getCourses');
            setCourses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axiosClient.delete(`/deleteCourse/${id}`);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleEditCourse = (course) => {
        console.log('edit course', course);
        setSelectedCourse(course);
        setDialogMode('edit');
        setOpenCourseDialog(true);

    };

    return (
        <PageComponent title={'Kurzusok'}>
            {isAdmin && (
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '20px' }}>
                    <Button variant="contained" color="primary" onClick={handleCreateCourse}>
                        Új kurzus
                    </Button>
                </Grid>
            )}
            <Grid container spacing={2} style={{ display: 'flex' }}>
                {loading ? (
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="flex items-center justify-center" style={{ minHeight: '200px' }}>
                            <CircularProgress />
                        </div>
                    </Grid>
                ) : courses.length === 0 ? (
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="flex items-center justify-center">
                            <p>No courses available.</p>
                        </div>
                    </Grid>
                ) : (
                    courses.map(course => (
                        <Grid item key={course.id} xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                            <CourseCard course={course} onDelete={handleDeleteCourse} onEdit={handleEditCourse}/>
                        </Grid>
                    ))
                )}
            </Grid>

            {openCourseDialog && (
                <CourseData open={openCourseDialog} handleClose={() => setOpenCourseDialog(false)} fetchCourses={fetchCourses} mode={dialogMode} course={selectedCourse}/>
            )}

        </PageComponent>
    );
}
