import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function CustomSnackbar({ open, message, severity = "success", onClose }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            message={message} // Optional: Displays the message in case of any issue with Alert
        >
            <Alert onClose={onClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}
