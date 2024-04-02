import React from "react";
import { Button } from "@mui/material";
import axiosClient from "../axios";

const FileUploadButton = ({ config, onSuccess, onError }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleUpload(file);
        }
    };

    const handleUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append(config.fileKey, file);
            console.log("FormData:", formData);
            const response = await axiosClient.post(config.endpoint, formData, {
                headers: {
                    "Content-Type": "multipart/form-data" 
                }
            });
            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            if (onError) {
                onError(error);
            }
        }
    };

    return (
        <Button
            component="label"
            variant="contained"
            color="grey"
        >
            Upload
            <input
                type="file"
                hidden
                onChange={handleFileChange}
            />
        </Button>
    );
};


export default FileUploadButton;
