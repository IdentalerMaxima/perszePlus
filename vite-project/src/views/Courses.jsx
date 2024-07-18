import { Grid, CircularProgress } from "@mui/material";
import PageComponent from "../components/PageComponent";
import CourseCard from "../components/cards/CourseCard";
import axiosClient from "../axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axiosClient.get('/getCourses');
            console.log(response.data); // Log the response data
            setCourses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    };

    return (
        <PageComponent title={'Kurzusok'}>
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
                            <CourseCard course={course} style={{ height: '100%' }} />
                        </Grid>
                    ))
                )}
            </Grid>
        </PageComponent>
    );
}
