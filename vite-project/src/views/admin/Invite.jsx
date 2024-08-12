import React, { useState } from "react";
import { CircularProgress, Box, Button } from "@mui/material";
import CustomSnackbar from "../../components/popups/CustomSnackbar";
import axiosClient from "../../axios";

export default function Invite() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const handleInvite = async () => {
        setLoading(true);
        console.log('Invite user with email:', email, 'and role:', role);

        try {
            const response = await axiosClient.post('/admin/invite', { email, role });
            console.log('Response:', response.data);
            setMessage(response.data.message);
            setSeverity("success");
        } catch (error) {
            console.error('Error inviting user:', error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
            setMessage(errorMessage);
            setSeverity("error");
        } finally {
            setOpenSnackbar(true);
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-72">
                    <CircularProgress />
                </div>
            ) : (
                <Box className="h-80">
                    <h1 className="font-semibold">Invite a new user</h1>

                    <div className="mt-6 flex flex-col p-3 space-y-4 items-center">
                        <div className="flex flex-row items-center space-x-4">
                            <select
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="vezetőség">Vezetőség</option>
                                <option value="munkatárs">Munkatárs</option>
                                <option value="hallgató">Hallgató</option>
                            </select>

                            <input
                                type="text"
                                name="email_invited"
                                autoComplete="given-name"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <Button 
                                variant="contained"
                                onClick={handleInvite}
                                disabled={!email || !role}
                            >
                                Invite
                            </Button>
                        </div>
                    </div>
                </Box>
            )}

            <CustomSnackbar
                open={openSnackbar}
                message={message}
                severity={severity}
                onClose={() => setOpenSnackbar(false)}
            />
        </div>
    );
}
