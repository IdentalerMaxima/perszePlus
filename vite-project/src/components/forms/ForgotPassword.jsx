import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';
import axiosClient from '../../axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/forgotPassword', { email });
            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setSuccessMessage('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Forgot Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Send Reset Link
                </Button>
            </form>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Container>
    );
};

export default ForgotPassword;
