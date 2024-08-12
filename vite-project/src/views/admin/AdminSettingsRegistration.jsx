import { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import SuccessSnackbar from "../../components/popups/CustomSnackbar";
import axiosClient from "../../axios";

export default function AdminSettingsRegistration(){

    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const getAdminSettings = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/admin/settings');
            const data = response.data;
            setSettings(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const saveAdminSettings = async () => {
        const settingsToSave = {
            registration_only_with_invitation: settings.registration_only_with_invitation ? 1 : 0,
        };

        try {
            setLoading(true);
            const response = await axiosClient.post('/admin/saveSettings', settingsToSave);
            console.log(response.data);
            setOpenSnackbar(true);
            setSuccessMessage("Settings saved successfully");
            setLoading(false);
        } catch (error) {
            console.error(error);
            setOpenSnackbar(true);
            setSuccessMessage(error.message ? error.message : "Error saving settings");
        }
    }

    useEffect(() => {
        getAdminSettings();
    }, []);

    const handleChecked = (e) => {
        const { name, checked } = e.target;
        setSettings((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    }

    return (
        <div>
            {loading ? (
          <div className="flex justify-center items-center h-72">
            <CircularProgress />
          </div>
        ) : (
            <Box className="">
                <h1 className="font-semibold">Registration Settings</h1>

                <div className="mt-6 flex flex-col p-3 space-y-4">

                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            name="registration_only_with_invitation"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            checked={settings.registration_only_with_invitation}
                            onChange={handleChecked}

                            
                            

                        />
                        <p className="text-gray-500 ml-2">Registration is only possible by invitation</p>
                    </div>

                </div>

                <div className="mt-72 flex items-center justify-end gap-x-6 border-t border-gray-90 pt-3">

                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        //onClick={handleCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => saveAdminSettings()}
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