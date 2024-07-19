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
    const [openCreateCourse, setOpenCreateCourse] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCreateCourse = () => {
        setOpenCreateCourse(true);
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
                        //log
                        console.log('Courses:', courses),
                        <Grid item key={course.id} xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                            <CourseCard course={course} />
                        </Grid>
                    ))
                )}
            </Grid>

            {openCreateCourse && (
                <CourseData open={openCreateCourse} handleClose={() => setOpenCreateCourse(false)} fetchCourses={fetchCourses} />
            )}

        </PageComponent>
    );
}
