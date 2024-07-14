import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function CommentData({ open, handleClose, editMode, comment, saveEditedComment }) {
  const [newComment, setNewComment] = useState({content: '' });

  useEffect(() => {
    if (comment) {
      setNewComment({content: comment.comment });
    } else {
      setNewComment({content: '' });
    }
  }, [editMode, comment]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setNewComment((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async () => {
    if (editMode) {
      await saveEditedComment({ ...comment, ...newComment });
    } else {
      // Logic to create new post
    }
  };

  return (
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '600px' }, className: 'create-event-dialog'}}>
        <DialogTitle>{"Edit Comment"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            minRows={4} // Adjust this value as needed
            value={newComment.content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{"Save"}</Button>
        </DialogActions>
      </Dialog>
  );
}
