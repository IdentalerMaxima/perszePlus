import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Avatar, Typography } from "@mui/material";



const CourseAttendeesDialog = ({ open, handleClose, course }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>
                Attendees
            </DialogTitle>
            <DialogContent dividers>
                {course && (
                    course.users.map((user) =>
                        <div key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt={user.name} src={user.avatar_path} />
                                <Typography variant="body2" style={{ marginLeft: '8px' }}>{user.first_name} {user.last_name}</Typography>
                            </div>
                        </div>)
                )}

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