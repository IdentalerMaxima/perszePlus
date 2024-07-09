import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importing Chart.js
import { Card, CardContent, Typography, Grid } from '@mui/material'; // Importing Material-UI components
import PageComponent from '../components/PageComponent';

export default function Stats() {
    const totalUsersDoughnutRef = useRef(null);
    const documentsBarRef = useRef(null);
    const levelOfEducationBarRef = useRef(null);

    let totalUsersDoughnut = useRef(null); // To store the Doughnut Chart instance
    let documentsBar = useRef(null); // To store the Bar Chart instance
    let levelOfEducationBar = useRef(null); // To store the Bar Chart instance

    useEffect(() => {
        // Mock data for doughnut chart
        const doughnutChartData = {
            labels: ['Vezetőség', 'Munkatárs', 'Hallgató'], // Labels for three types of users
            datasets: [{
                label: 'Total Users', // Label for the dataset (optional)
                data: [300, 200, 100], // Example data for three types of users
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Red
                    'rgba(54, 162, 235, 0.6)', // Blue
                    'rgba(255, 206, 86, 0.6)', // Yellow
                ],
            }],
        };

        // Mock data for bar chart
        const barChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Bar Chart',
                data: [65, 59, 80, 81, 56, 55, 40],
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
                                    afterLabel: () => {
                                        return 'Total: ' + calculateTotalUsers(doughnutChartData).toLocaleString();
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
                    // If chart instance already exists, destroy it first
                    documentsBar.current.destroy();
                }

                // Create new bar chart instance
                documentsBar.current = new Chart(documentsBarRef.current, {
                    type: 'bar', // Bar chart type
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

        // Function to calculate total users
        const calculateTotalUsers = (data) => {
            let total = 0;
            data.datasets[0].data.forEach(value => {
                total += value;
            });
            return total;
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
    }, []);

    return (
        <PageComponent title={'Statisztikák'}>
            <Grid container spacing={3}>
                {/* Doughnut Chart */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div" align="center">
                                Total Users (Doughnut Chart)
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <canvas ref={totalUsersDoughnutRef} style={{ maxWidth: '100%', height: 'auto', maxHeight: '282px'}} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bar Chart */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div" align="center">
                                Bar Chart
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
