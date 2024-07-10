import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; // Importing Chart.js
import { Card, CardContent, Typography, Grid } from '@mui/material'; // Importing Material-UI components
import PageComponent from '../components/PageComponent';
import axiosClient from '../axios';

export default function Stats() {
    const totalUsersDoughnutRef = useRef(null);
    const documentsBarRef = useRef(null);
    const levelOfEducationBarRef = useRef(null);

    let totalUsersDoughnut = useRef(null); // To store the Doughnut Chart instance
    let documentsBar = useRef(null); // To store the Bar Chart instance
    let levelOfEducationBar = useRef(null); // To store the Bar Chart instance

    const [loading, setLoading] = useState(true); // State to store the loading status [Optional]

    const [totalUsers, setTotalUsers] = useState(0);
    const [userCategories, setUserCategories] = useState([]);
    const [usersByEachCategory, setUsersByEachCategory] = useState(null);

    const [typesOfDocs, setTypesOfDocs] = useState([]);
    const [usersWithEachTypeOfDoc, setUsersWithEachTypeOfDoc] = useState([]);


    const usersByCategory = async () => {
        try {
            const response = await axiosClient.get('/getUsersByCategory');
            const data = response.data;

            const userCategories = data.map((item) => item.category);
            const usersByCategory = data.map((item) => item.count);
            const totalUsers = usersByCategory.reduce((acc, curr) => acc + curr, 0);

            setUserCategories(userCategories);
            setUsersByEachCategory(usersByCategory);
            setTotalUsers(totalUsers);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching total users and categories:', error);
        }
    };

    const countOfDocumentsByType = async () => {
        try {
            const response = await axiosClient.get('/getCountOfDocumentsByType');
            const data = response.data;

            const typesOfDocs = data.map((item) => item.type);
            const usersWithEachTypeOfDoc = data.map((item) => item.user_count);

            setTypesOfDocs(typesOfDocs);
            setUsersWithEachTypeOfDoc(usersWithEachTypeOfDoc);
        } catch (error) {
            console.error('Error fetching count of documents by type:', error);
        }
    };

    useEffect(() => {
        const doughnutChartData = {
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
        };

    
        const barChartData = {
            labels: typesOfDocs,
            datasets: [{
                label: 'Number of users with each type of document',
                data: usersWithEachTypeOfDoc,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }],
        };

        // Mock data for level of education bar chart
        const levelOfEducationBarData = {
            labels: ['Alapfokú', 'Középfokú', 'Felsőfokú', 'PhD'],
            datasets: [{
                label: 'Level of Education',
                data: [50, 100, 200, 50],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            }],
        };

        // Function to render or update the doughnut chart
        const renderDoughnutChart = () => {
            if (totalUsersDoughnutRef.current) {
                if (totalUsersDoughnut.current) {
                    // If chart instance already exists, destroy it first
                    totalUsersDoughnut.current.destroy();
                }

                // Create new doughnut chart instance
                totalUsersDoughnut.current = new Chart(totalUsersDoughnutRef.current, {
                    type: 'doughnut', // Doughnut chart type
                    data: doughnutChartData,
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

        // Function to render or update the bar chart
        const renderBarChart = () => {
            if (documentsBarRef.current) {
                if (documentsBar.current) {
                    documentsBar.current.destroy();
                }

                documentsBar.current = new Chart(documentsBarRef.current, {
                    type: 'bar',
                    data: barChartData,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                },
                            }],
                        },
                    },
                });
            }
        };

        // Function to render or update the level of education bar chart
        const renderLevelOfEducationBarChart = () => {
            if (levelOfEducationBarRef.current) {
                if (levelOfEducationBar.current) {
                    // If chart instance already exists, destroy it first
                    levelOfEducationBar.current.destroy();
                }

                // Create new bar chart instance
                levelOfEducationBar.current = new Chart(levelOfEducationBarRef.current, {
                    type: 'bar', // Bar chart type
                    data: levelOfEducationBarData,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                },
                            }],
                        },
                    },
                });
            }
        };

        // Render all charts
        renderDoughnutChart();
        renderBarChart();
        renderLevelOfEducationBarChart();

        // Clean up function to destroy the charts on unmount
        return () => {
            if (totalUsersDoughnut.current) {
                totalUsersDoughnut.current.destroy();
            }
            if (documentsBar.current) {
                documentsBar.current.destroy();
            }
            if (levelOfEducationBar.current) {
                levelOfEducationBar.current.destroy();
            }
        };
    }, [usersByEachCategory]);

    useEffect(() => {
        usersByCategory();
        countOfDocumentsByType();
    }, []);




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
                                    Loading...
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <canvas ref={totalUsersDoughnutRef} style={{ maxWidth: '100%', height: 'auto' , maxHeight: '282px'}} />
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
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <canvas ref={documentsBarRef} style={{ maxWidth: '100%', height: 'auto' }} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Level of Education Bar Chart */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div" align="center">
                                Level of Education Bar Chart
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <canvas ref={levelOfEducationBarRef} style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
        </PageComponent>
    );
}
