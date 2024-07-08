// AttendeesDialog.jsx

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Avatar,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Icon for "not answered"

const AttendeesDialog = ({ open, handleClose, event }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{event ? event.title : ''} - Attendees</DialogTitle>
            <DialogContent dividers>
                {event &&
                    event.users.map((user) => (
                        <div key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt={user.name} src={user.avatar_path} />
                                <Typography variant="body2" style={{ marginLeft: '8px' }}>{user.first_name} {user.last_name}</Typography>
                            </div>
                            <div>
                                {user.pivot.status === 'going' && <CheckIcon style={{ marginLeft: '8px', color: 'green' }} />}
                                {user.pivot.status === 'not_going' && <CancelIcon style={{ marginLeft: '8px', color: 'red' }} />}
                                {user.pivot.status === 'not_answered' && <HelpOutlineIcon style={{ marginLeft: '8px', color: 'gray' }} />}
                            </div>
                        </div>
                    ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AttendeesDialog;
