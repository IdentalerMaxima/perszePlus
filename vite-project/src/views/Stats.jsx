import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import PageComponent from '../components/PageComponent';
import axiosClient from '../axios';

export default function Stats() {
    const totalUsersDoughnutRef = useRef(null);
    const documentsBarRef = useRef(null);
    const levelOfEducationBarRef = useRef(null);
    const yearsInEducationBarRef = useRef(null);

    let totalUsersDoughnut = useRef(null);
    let documentsBar = useRef(null);
    let levelOfEducationBar = useRef(null);
    let yearsInEducationBar = useRef(null);

    const [loading, setLoading] = useState(true);
    const [loadingOfDocuments, setLoadingOfDocuments] = useState(true);
    const [loadingOfEducation, setLoadingOfEducation] = useState(true);
    const [loadingOfYearsInEducation, setLoadingOfYearsInEducation] = useState(true);

    const [totalUsers, setTotalUsers] = useState(0);
    const [userCategories, setUserCategories] = useState([]);
    const [usersByEachCategory, setUsersByEachCategory] = useState([]);

    const [typesOfDocs, setTypesOfDocs] = useState([]);
    const [usersWithEachTypeOfDoc, setUsersWithEachTypeOfDoc] = useState([]);

    const [levelsOfEducation, setLevelsOfEducation] = useState([]);
    const [usersWithEachLevelOfEducation, setUsersWithEachLevelOfEducation] = useState([]);

    const [yearsInEducation, setYearsInEducation] = useState([]);
    const [usersWithEachYearInEducation, setUsersWithEachYearInEducation] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [categoryResponse, documentsResponse, educationResponse, yearsResponse] = await Promise.all([
                    axiosClient.get('/getUsersByCategory'),
                    axiosClient.get('/getCountOfDocumentsByType'),
                    axiosClient.get('/getUsersByLevelOfEducation'),
                    axiosClient.get('/getUsersByYearsInEducation'),
                ]);

                const categoryData = categoryResponse.data;
                const documentsData = documentsResponse.data;
                const educationData = educationResponse.data;
                const yearsData = yearsResponse.data;

                const userCategories = categoryData.map(item => item.category);
                const usersByCategory = categoryData.map(item => item.count);
                const totalUsers = usersByCategory.reduce((acc, curr) => acc + curr, 0);

                setUserCategories(userCategories);
                setUsersByEachCategory(usersByCategory);
                setTotalUsers(totalUsers);
                setLoading(false);

                const typesOfDocs = documentsData.map(item => item.type);
                const usersWithEachTypeOfDoc = documentsData.map(item => item.user_count);

                setTypesOfDocs(typesOfDocs);
                setUsersWithEachTypeOfDoc(usersWithEachTypeOfDoc);
                setLoadingOfDocuments(false);

                const levelsOfEducation = educationData.map(item => item.level_of_education);
                const usersWithEachLevelOfEducation = educationData.map(item => item.count);

                setLevelsOfEducation(levelsOfEducation);
                setUsersWithEachLevelOfEducation(usersWithEachLevelOfEducation);
                setLoadingOfEducation(false);

                const yearsInEducation = yearsData.map(item => item.current_semester);
                const usersWithEachYearInEducation = yearsData.map(item => item.count);

                setYearsInEducation(yearsInEducation);
                setUsersWithEachYearInEducation(usersWithEachYearInEducation);
                setLoadingOfYearsInEducation(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                setLoadingOfDocuments(false);
                setLoadingOfEducation(false);
                setLoadingOfYearsInEducation(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const renderDoughnutChart = () => {
            if (totalUsersDoughnutRef.current) {
                if (totalUsersDoughnut.current) {
                    totalUsersDoughnut.current.destroy();
                }

                totalUsersDoughnut.current = new Chart(totalUsersDoughnutRef.current, {
                    type: 'doughnut',
                    data: {
                        labels: userCategories,
                        datasets: [{
                            label: 'Total Users',
                            data: usersByEachCategory,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)', // Red
                                'rgba(54, 162, 235, 0.6)', // Blue
                                'rgba(255, 206, 86, 0.6)', // Yellow
                            ],
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem) => {
                                        return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString();
                                    },
                                },
                            },
                        },
                    },
                });
            }
        };

        renderDoughnutChart();

        return () => {
            if (totalUsersDoughnut.current) {
                totalUsersDoughnut.current.destroy();
            }
        };
    }, [userCategories, usersByEachCategory]);

    useEffect(() => {
        const renderBarChart = () => {
            if (documentsBarRef.current) {
                if (documentsBar.current) {
                    documentsBar.current.destroy();
                }

                documentsBar.current = new Chart(documentsBarRef.current, {
                    type: 'bar',
                    data: {
                        labels: typesOfDocs,
                        datasets: [{
                            label: 'Number of users with each type of document',
                            data: usersWithEachTypeOfDoc,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: (value) => {
                                        return value.toLocaleString();
                                    }
                                },
                            },
                        },
                    },
                });
            }
        };

        renderBarChart();

        return () => {
            if (documentsBar.current) {
                documentsBar.current.destroy();
            }
        };
    }, [typesOfDocs, usersWithEachTypeOfDoc]);

    useEffect(() => {
        const renderLevelOfEducationBarChart = () => {
            if (levelOfEducationBarRef.current) {
                if (levelOfEducationBar.current) {
                    levelOfEducationBar.current.destroy();
                }

                levelOfEducationBar.current = new Chart(levelOfEducationBarRef.current, {
                    type: 'bar',
                    data: {
                        labels: levelsOfEducation,
                        datasets: [{
                            label: 'Level of Education',
                            data: usersWithEachLevelOfEducation,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: (value) => {
                                        return value.toLocaleString();
                                    }
                                },
                            },
                        },
                    },
                });
            }
        };

        renderLevelOfEducationBarChart();

        return () => {
            if (levelOfEducationBar.current) {
                levelOfEducationBar.current.destroy();
            }
        };
    }, [levelsOfEducation, usersWithEachLevelOfEducation]);

    useEffect(() => {
        const renderYearsInEducationBarChart = () => {
            if (yearsInEducationBarRef.current) {
                if (yearsInEducationBar.current) {
                    yearsInEducationBar.current.destroy();
                }

                yearsInEducationBar.current = new Chart(yearsInEducationBarRef.current, {
                    type: 'bar',
                    data: {
                        labels: yearsInEducation,
                        datasets: [{
                            label: 'Years in Education',
                            data: usersWithEachYearInEducation,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: (value) => {
                                        return value.toLocaleString();
                                    }
                                },
                            },
                        },
                    },
                });
            }
        };

        renderYearsInEducationBarChart();

        return () => {
            if (yearsInEducationBar.current) {
                yearsInEducationBar.current.destroy();
            }
        };
    }, [yearsInEducation, usersWithEachYearInEducation]);

    return (
        <PageComponent title={'Statisztikák'}>
            <Grid container spacing={3}>
                {/* Doughnut Chart */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div" align="center">
                                Total Users: {totalUsers}
                            </Typography>
                            {loading ? (
                                <div className="flex items-center justify-center h-64">
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <canvas ref={totalUsersDoughnutRef} style={{ maxWidth: '100%', height: 'auto', maxHeight: '282px' }} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bar Chart */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div" align="center">
                                Dokumentumok
                            </Typography>
                            {loadingOfDocuments ? (
                                <div className="flex items-center justify-center h-64">
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <canvas ref={documentsBarRef} style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Level of Education Bar Chart */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div" align="center">
                                Users by Level of Education
                            </Typography>
                            {loadingOfEducation ? (
                                <div className="flex items-center justify-center h-64">
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <canvas ref={levelOfEducationBarRef} style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Years in Education Bar Chart */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div" align="center">
                                Users by semesters in education
                            </Typography>
                            {loadingOfYearsInEducation ? (
                                <div className="flex items-center justify-center h-64">
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <canvas ref={yearsInEducationBarRef} style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </PageComponent>
    );
}
