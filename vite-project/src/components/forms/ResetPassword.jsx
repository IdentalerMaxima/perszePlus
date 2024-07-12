import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axiosClient from '../../axios';
import { useTranslation } from 'react-i18next';

const PasswordResetForm = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const resetEmail = localStorage.getItem('reset_email');
    const { t } = useTranslation(['translation']);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ __html: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setError({ __html: '' });
    }, []);

    const translateErrors = (errorMessages) => {
        const errors = errorMessages.split('<br>');
        const translatedErrors = errors.map(errorMessage => t(errorMessage));
        setError({ __html: translatedErrors.join('<br>') });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError({ __html: 'Passwords do not match' });
            return;
        }

        setLoading(true);
        setError({ __html: '' });

        try {
            const response = await axiosClient.post('resetPassword', {
                token,
                email: resetEmail,
                password,
                password_confirmation: confirmPassword,
            });

            if (response.status === 200) {
                setSubmitted(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const finalErrors = Object.values(error.response.data.errors)
                    .reduce((accum, next) => [...accum, ...next], [])
                    .join('<br>');
                translateErrors(finalErrors);
            } else {
                setError({ __html: 'An unexpected error occurred' });
            }
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {'Set a new password'}
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error.__html && (
                    <div className="bg-red-500 rounded py-2 px-3 text-white"
                        dangerouslySetInnerHTML={error}>
                    </div>
                )}

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mt-14">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={'New password'}
                            />
                        </div>

                        <div className="pb-4">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={'Confirm new password'}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-green-500 text-center">
                        {t('password reset successfully! Redirecting to login...')}
                    </div>
                )}
            </div>
        </>
    );
};

export default PasswordResetForm;
