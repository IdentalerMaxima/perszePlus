import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, CardMedia, CardContent, Grid, Typography, Box, useMediaQuery } from "@mui/material";
import PageComponent from "../components/PageComponent";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CourseDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const course = location.state?.course || {}; // Ensure course is defined
    const isMobile = useMediaQuery('(max-width: 600px)');

    const goBack = () => {
        window.history.back();
    };

    return (
        <PageComponent title="Kurzus részletei">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} pt-3`}>
                <IconButton onClick={goBack} className="">
                    <ArrowBackIcon />
                </IconButton>
                <Card style={{ display: 'flex', height: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} style={{ display: 'flex', flexDirection: 'column' }}>
                            <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <CardMedia
                                    component="img"
                                    image={course.image_path}
                                    alt={course.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '1% 0 0 1%',
                                        borderRadius: isMobile ? '1% 1% 0 0' : '1% 0 0 1%'
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} style={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="h5" gutterBottom>
                                    {course.name}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {course.description}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    <strong>Félév:</strong> {course.semester} <strong>Ajánlott évfolyam:</strong> {course.recommended_year} <strong>Host:</strong> {course.host}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    <strong>Időpontok:</strong> {course.dates}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    <strong>Előfeltételek:</strong> {course.requirements}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </PageComponent>
    );
};

export default CourseDetails;
