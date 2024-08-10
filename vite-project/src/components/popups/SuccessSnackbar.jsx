import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function SuccessSnackbar({ open, message, onClose }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert onClose={onClose} severity="success">
                {message}
            </Alert>
        </Snackbar>
    );
}
