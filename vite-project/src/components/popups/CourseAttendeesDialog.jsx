import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const CourseAttendeesDialog = ({ open, handleClose }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>
                Attendees
            </DialogTitle>
            <DialogContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit cumque nostrum,
                inventore consequuntur vel architecto, aperiam dolorem quo ex reiciendis sint aliquam! Eius velit quia aut praesentium facere voluptatum. Fugiat?
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CourseAttendeesDialog;