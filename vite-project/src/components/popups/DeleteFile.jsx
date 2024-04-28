import React from "react";
import { Dialog, Button, Typography, TextField, DialogContent } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import axiosClient from '../../axios';

export default function DeleteFile({ handleClose, filesToDelete, refreshFiles }) {

    const closeDialog = () => {
        handleClose();
    }

    const deleteFile = async (fileId) => {
        try {
          await axiosClient.delete(`/user/documents/${fileId}`);
          refreshFiles();
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      };

      const handleDelete = () => {
        filesToDelete.forEach((file) => {
          deleteFile(file.id); // Use file.id here
        });
        closeDialog();
      };

        return (
            <Dialog open={true} onClose={handleClose} className="w-">
                <DialogTitle>Delete {filesToDelete.length > 1 ? 'File' : 'Files'}</DialogTitle>
                <DialogContent
                    className="flex flex-col"
                >
                    <div>
                        {filesToDelete.length > 1 ? 'Are you sure you want to delete the selected file?' : 'Are you sure you want to delete the selected files?'}
                    </div>

                    <div className="flex w-full mt-4 justify-end">
                        <Button
                            onClick={closeDialog}
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            onClick={handleDelete}
                        >
                            Delete {filesToDelete.length > 1 ? 'File' : 'Files'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
