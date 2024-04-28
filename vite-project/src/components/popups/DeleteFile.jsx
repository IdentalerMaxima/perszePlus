import React from "react";
import { Dialog, Button, Typography, TextField, DialogContent } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import axiosClient from '../../axios';

export default function DeleteFile({ handleClose, file }) {

    const closeDialog = () => {
        handleClose();
    }

    const handleDelete = () => {
        deleteFile();
        closeDialog();
    }

    const deleteFile = () => {
        try {
            axiosClient.delete(`/upload/file/${file.id}`);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
        
    }






        return (
            <Dialog open={true} onClose={handleClose} className="w-">
                <DialogTitle>Delete {file ? 'File' : 'Files'}</DialogTitle>
                <DialogContent
                    className="flex flex-col"
                >
                    <div>
                        {file ? 'Are you sure you want to delete the selected file?' : 'Are you sure you want to delete the selected files?'}
                    </div>

                    <div className="flex w-full mt-4 justify-end">
                        <Button
                            onClick={handleClose}
                            //variant="contained"
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            //variant="contained"
                            color="primary"
                            onClick={handleDelete}
                        >
                            Delete {file ? 'File' : 'Files'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
