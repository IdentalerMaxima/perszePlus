import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function PostData({ open, handleClose, editMode, post, saveEditedPost }) {
  const [newPost, setNewPost] = useState({content: '' });

  useEffect(() => {
    if (post) {
      setNewPost({content: post.content });
    } else {
      setNewPost({content: '' });
    }
  }, [editMode, post]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async () => {
    if (editMode) {
      await saveEditedPost({ ...post, ...newPost });
    } else {
      // Logic to create new post
    }
  };

  return (
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '600px' }, className: 'create-event-dialog' }}>
        <DialogTitle>{"Edit Post"}</DialogTitle>
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
            value={newPost.content}
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
