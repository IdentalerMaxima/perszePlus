import React from "react";
import { Dialog, Button, Typography, TextField, DialogContent } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";

export default function Cancel({ handleClose, resetForm}) {

    const closeDialog = () => {
        handleClose();
    }

    const cancelOperation = () => {
        resetForm();
        closeDialog();
    }

        return (
            <Dialog open={true} onClose={handleClose} className="w-">
                <DialogTitle>Cancel?</DialogTitle>
                <DialogContent
                    className="flex flex-col"
                >
                    <div>
                        Changes will not be saved. Are you sure you want to cancel?
                    </div>

                    <div className="flex w-full mt-4 justify-end">
                        <Button
                            onClick={closeDialog}
                            color="secondary"
                        >
                            No
                        </Button>
                        <Button
                            color="primary"
                            onClick={cancelOperation}
                        >
                            Yes 
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
