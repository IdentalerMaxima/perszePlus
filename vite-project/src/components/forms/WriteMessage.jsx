import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
} from "@mui/material";
import SearchBar from "../searchbar/Searchbar";
import SuccessSnackbar from "../popups/CustomSnackbar";

export default function WriteMessage({ open, handleClose, newMessage, setNewMessage, handleSendMessage }) {
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSend = async () => {
        if (selectedRecipient && newMessage.trim()) {
            try {
                await handleSendMessage(selectedRecipient.id);
                setSuccessMessage("Message sent successfully!");
                setOpenSnackbar(true);
                setNewMessage("");
                setSelectedRecipient(null);
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }
    };

    useEffect(() => {
        console.log("Selected recipient:", selectedRecipient);
    }, [selectedRecipient]);

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Message</DialogTitle>
                <DialogContent>
                    <DialogContentText className="p-4">
                        Please select a recipient and enter your message below.
                    </DialogContentText>

                    <SearchBar selectedRecipient={selectedRecipient} setSelectedRecipient={setSelectedRecipient} />

                    <TextField
                        margin="dense"
                        id="newMessage"
                        label="Message"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="create-event-dialog"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSend}
                        color="primary"
                        disabled={!selectedRecipient || !newMessage.trim()}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>

            <SuccessSnackbar
                open={openSnackbar}
                message={successMessage}
                onClose={() => setOpenSnackbar(false)}
            />
        </>
    );
}
