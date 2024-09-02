import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, CardMedia, CardContent, Grid, Typography, Box, useMediaQuery, CardActions } from "@mui/material";
import PageComponent from "../components/PageComponent";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import CourseAttendeesDialog from "../components/popups/CourseAttendeesDialog"

const CourseDetails = () => {
    const { currentUser } = useStateContext();
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [enrollClicked, setEnrollClicked] = useState(false);
    const [showAttendees, setShowAttendees] = useState(false);
    const [course, setCourse] = useState(location.state?.course || {});

    useEffect(() => {
        checkEnrollment();
    }, []);

    const goBack = () => {
        window.history.back();
    };

    const checkEnrollment = async () => {
        try {
            const response = await axiosClient.get(`/checkEnrollment/${course.id}`, currentUser.id);
            console.log(response);
            if (response.data.isEnrolled === true) {
                setEnrollClicked(true);
            }
        }
        catch (error) {
            console.error('Error checking enrollment:', error);
        }
    };

    const fetchCourse = async () => {
        try {
            const response = await axiosClient.get(`/getCourseById/${course.id}`);
            console.log('Fetched course: ', response.data);
            setCourse(response.data);
        } catch (error) {
            console.log('Error fetching course: ', error);
        }
    };

    const handleEnroll = async () => {
        if (enrollClicked) {
            try {
                await axiosClient.post(`/unsubscribeFromCourse/${course.id}`, currentUser.id);
                setEnrollClicked(false);
            } catch (error) {
                console.error('Error unsubscribing from course:', error);
            }
        } else {
            try {
                await axiosClient.post(`/subscribeToCourse/${course.id}`, currentUser.id);
                setEnrollClicked(true);
            } catch (error) {
                console.error('Error subscribing to course:', error);
            }
        }
        fetchCourse();
    };

    

    return (
        <PageComponent title="Kurzus részletei">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row items-center'} pt-3`}>
                <IconButton onClick={goBack}>
                    <ArrowBackIcon className="mb-6"/>
                </IconButton>
<                Card style={{ display: 'flex', height: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} style={{ display: 'flex', flexDirection: 'column' }}>
                            <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <CardMedia
                                    component="img"
                                    image={course.image_path}
                                    alt={course.name}
                                    style={{
                                        width: '900px',
                                        height: '300px',
                                        objectFit: 'cover',
                                        borderRadius: isMobile ? '1% 1% 0 0' : '1% 0 0 1%'
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} style={{ display: 'flex', flexDirection: 'column', padding: '3px' }}>
                            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}>
                                <Typography variant="h5" gutterBottom>
                                    {course.name} {'-'} {course.host}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    <strong>Félév:</strong> {course.semester} <strong>Ajánlott évfolyam:</strong> {course.recommended_year}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {course.description}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    <strong>Időpontok:</strong> {course.dates}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    <strong>Előfeltételek:</strong> {course.requirements}
                                </Typography>
                            </CardContent>
                            <CardActions className="flex justify-end mt-auto">
                                <Button
                                    variant="contained"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleEnroll();
                                    }}
                                    style={
                                        enrollClicked ? { backgroundColor: 'grey' } : { backgroundColor: 'green' }
                                    }
                                >
                                    {enrollClicked ? 'Leiratkozás' : 'Feliratkozás'}
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowAttendees(true);
                                    }}
                                    
                                >
                                    Jelentkezők
                                </Button>

                                <CourseAttendeesDialog open={showAttendees} handleClose={() => setShowAttendees(false)} course={course}></CourseAttendeesDialog>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </PageComponent>
    );
};

export default CourseDetails;
