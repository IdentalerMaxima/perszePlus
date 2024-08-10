import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import SuccessSnackbar from "../popups/SuccessSnackbar";

export default function Settings() {

    const [settings, setSettings] = useState({
        newEvents: false,
        newPosts: false,
        newCourses: false,
        emailNotifications: false
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        console.log('Settings: ', settings)
    }), [settings];

    useEffect(() => {
        getUserSettings();
    }, []);

    const getUserSettings = async () => {
        try {
            const response = await axiosClient.get('/user/settings');
            console.log('Response: ', response.data);

            const settingsData = response.data[0];

            const mappedSettings = {
                newEvents: settingsData.receive_notification_new_event === 1,
                newPosts: settingsData.receive_notification_new_post === 1,
                newCourses: settingsData.receive_notification_new_course === 1,
                emailNotifications: settingsData.receive_email_notifications === 1,
            };

            setSettings(mappedSettings);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching settings:', error);
        }
    };

    const handleChecked = (e) => {
        const { name, checked } = e.target
        setSettings(prevState => ({
            ...prevState,
            [name]: checked
        }))
    }

    const handleCancel = () => {
        getUserSettings();
    }

    const handleSave = () => {
        saveUserSettings();
    }

    const saveUserSettings = async () => {
        // Map component state to server format
        const settingsToSave = {
            receive_notification_new_event: settings.newEvents ? 1 : 0,
            receive_notification_new_post: settings.newPosts ? 1 : 0,
            receive_notification_new_course: settings.newCourses ? 1 : 0,
            receive_email_notifications: settings.emailNotifications ? 1 : 0,
        };

        try {
            const response = await axiosClient.post('/user/saveSettings', settingsToSave);
            console.log('Settings saved successfully:', response.data);
            setSuccessMessage("Settings saved successfully!");
            setOpenSnackbar(true);
        } catch (error) {
            console.log('Error saving settings:', error);
        }
    };


    return (
        <div>
            {loading ? (
          <div className="flex justify-center items-center h-72">
            <CircularProgress />
          </div>
        ) : (
            <Box className="">
                <h1 className="font-semibold">Notifications</h1>

                <div className="mt-6 flex flex-col p-3 space-y-4">

                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            name="newEvents"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={handleChecked}
                            checked={settings.newEvents}
                        />
                        <p className="text-gray-500 ml-2"> Receive notifications of new events</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            name="newPosts"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={handleChecked}
                            checked={settings.newPosts}

                        />
                        <p className="text-gray-500 ml-2"> Receive email notifications of new posts</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            name="newCourses"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={handleChecked}
                            checked={settings.newCourses}

                        />
                        <p className="text-gray-500 ml-2"> Receive email notifications of new courses</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            name="emailNotifications"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={handleChecked}
                            checked={settings.emailNotifications}

                        />
                        <p className="text-gray-500 ml-2"> Receive emails of notifications</p>
                    </div>

                </div>

                <div className="mt-40 flex items-center justify-end gap-x-6 border-t border-gray-90 pt-4">

                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleSave}
                    >
                        Save
                    </button>

                </div>
            </Box>
        )}

            <SuccessSnackbar
                open={openSnackbar}
                message={successMessage}
                onClose={() => setOpenSnackbar(false)}
            />
        </div>
    );
}