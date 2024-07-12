import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';

const PasswordResetForm = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate API call or actual backend integration here
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            // Redirect to login after successful reset
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds
        }, 2000); // Simulating a delay

        setPassword('');
        setConfirmPassword('');
    };

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {'Set New Password'}
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <div className="mt-14">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={'New Password'}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={'Confirm Password'}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
                            </button>
                        </div>
                        {error && <div className="text-red-500 text-center">{error}</div>}
                    </form>
                ) : (
                    <div className="text-green-500 text-center">
                        Password reset successfully! Redirecting to login...
                    </div>
                )}
            </div>
        </>
    );
};

export default PasswordResetForm;
