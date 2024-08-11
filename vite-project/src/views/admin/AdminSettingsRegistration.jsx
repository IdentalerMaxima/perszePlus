import React, { useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import SuccessSnackbar from "../../components/popups/CustomSnackbar";

export default function AdminSettingsRegistration(){

    const [loading, setLoading] = useState(false);
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
                            name="newEvents"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"

                        />
                        <p className="text-gray-500 ml-2">Registration is bound to invitation</p>
                    </div>

                </div>

                <div className="mt-40 flex items-center justify-end gap-x-6 border-t border-gray-90 pt-4">

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
                        //onClick={handleSave}
                    >
                        Save
                    </button>

                </div>
            </Box>
        )}

            <SuccessSnackbar
                //open={openSnackbar}
                //message={successMessage}
                onClose={() => setOpenSnackbar(false)}
            />
        </div>
    );
}