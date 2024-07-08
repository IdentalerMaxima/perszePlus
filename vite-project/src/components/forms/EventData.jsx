import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import axiosClient from '../../axios';

const EventData = ({ open, handleClose, handleEventCreated, fetchEvents }) => {
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    console.log('Creating event:', newEvent);

    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('date', newEvent.date);
    formData.append('description', newEvent.description);

    try {
      const response = await axiosClient.post('/addEvent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewEvent({ title: '', date: '', description: '' });
      handleClose();
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className='create-event-dialog'>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Event Title"
            type="text"
            fullWidth
            value={newEvent.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Event Date"
            type="date"
            fullWidth
            value={newEvent.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Event Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newEvent.description}
            onChange={handleChange}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventData;
