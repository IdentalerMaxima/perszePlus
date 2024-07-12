import React, { useState } from 'react';
import { Alert } from '@mui/material';
import axiosClient from '../../axios';
import { useTranslation } from "react-i18next";
import { CircularProgress } from '@mui/material';

const ForgotPassword = () => {
    const { t } = useTranslation(['translation']);

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosClient.post('/forgotPassword', { email });
            console.log(response.data);
            //store email in local storage
            localStorage.setItem('reset_email', email);
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setLoading(false);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setSuccessMessage('');
        }
    };

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {'Email to reset password'}
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                {successMessage && (
                    <Alert severity="success" onClose={() => setSuccessMessage('')}>
                        {successMessage}
                    </Alert>
                )}
                {errorMessage && (
                    <Alert severity="error" onClose={() => setErrorMessage('')}>
                        {errorMessage}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                    <div>
                        <div className="mt-14">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={t("type your email")}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Email'}
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
};

export default ForgotPassword;
