import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import axiosClient from '../../axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const EventData = ({ open, handleClose, editMode, event, saveEditedEvent, fetchEvents }) => {
  const initialEventState = {
    title: editMode ? event.title : '',
    date: editMode ? dayjs(event.date) : null,
    description: editMode ? event.description : '',
  };
  const [editedEvent, setEditedEvent] = useState(initialEventState);

  useEffect(() => {
    if (editMode && event) {
      setEditedEvent({
        title: event.title,
        date: dayjs(event.date),
        description: event.description,
      });
    } else {
      setEditedEvent(initialEventState);
    }
  }, [editMode, event]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setEditedEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditedEvent((prevEvent) => ({ ...prevEvent, date }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (editMode) {
      try {
        await saveEditedEvent({
          id: event.id,
          title: editedEvent.title,
          date: editedEvent.date.format('YYYY-MM-DD HH:mm:ss'),
          description: editedEvent.description,
        });
      } catch (error) {
        console.error('Error editing event:', error);
      }
    } else {
      const formData = new FormData();
      formData.append('title', editedEvent.title);
      formData.append('date', editedEvent.date.format('YYYY-MM-DD HH:mm:ss'));
      formData.append('description', editedEvent.description);

      try {
        const response = await axiosClient.post('/addEvent', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setEditedEvent(initialEventState);
        handleClose();
        fetchEvents();
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth className='create-event-dialog'>
      <DialogTitle>{editMode ? 'Edit Event' : 'Create Event'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Event Title"
            type="text"
            fullWidth
            value={editedEvent.title}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Event Date and Time"
              value={editedEvent.date}
              onChange={handleDateChange}
              sx={{ width: '100%', marginTop: '1rem'}}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            name="description"
            label="Event Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedEvent.description}
            onChange={handleChange}
            sx={ { marginTop: '1rem' }  }
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {editMode ? 'Save Changes' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventData;
