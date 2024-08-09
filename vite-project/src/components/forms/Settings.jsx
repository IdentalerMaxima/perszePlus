import { Box } from "@mui/material";
import React from "react";

export default function Settings() {
    return (
        <div>
            <Box className="">
                <h1 className="font-semibold">Notifications</h1>

                <div className="mt-6 flex flex-col p-3 space-y-4">

                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <p className="text-gray-500 ml-2"> Receive notifications of new events</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <p className="text-gray-500 ml-2"> Receive email notifications of new posts</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <p className="text-gray-500 ml-2"> Receive email notifications of new courses</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <p className="text-gray-500 ml-2"> Receive emails of notifications</p>
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
                    //onClick={handleSubmit}
                    >
                        Save
                    </button>

                </div>
            </Box>
        </div>
    );
}