import React, { useState, useEffect } from 'react';
import PageComponent from "../components/PageComponent";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, Button, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material'; // Import necessary components
import { useStateContext } from '../contexts/ContextProvider';
import { Delete } from '@mui/icons-material';
import axiosClient from '../axios';
import EventData from '../components/forms/EventData';
import AttendeesDialog from '../components/popups/AttendeesDialog';

export default function Calendar() {
  const { currentUser, isAdmin } = useStateContext();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false); // State for event modal
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event
  const [showAttendees, setShowAttendees] = useState(false); // State for showing attendees list


  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleShowAttendees = (event) => {
    setSelectedEvent(event);
    setShowAttendees(true);
  }

  const handleCloseAttendees = () => {
    setShowAttendees(false);
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  }

  const fetchEvents = async () => {
    console.log('Fetching events...');
    try {
      const response = await axiosClient.get('/getEvents');
      setEvents(response.data);
      console.log('Events:', response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    console.log('Deleting event:', eventId);
    try {
      await axiosClient.delete(`/deleteEvent/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const updateAttendance = async (eventId, userId, status) => {
    console.log('Updating attendance:', eventId, userId, status);
    try {
      await axiosClient.post('/updateAttendance', { eventId, userId, status });
      fetchEvents();
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const getUserAttendanceStatus = (event, userId) => {
    const userAttendance = event.users.find(user => user.id === userId);
    return userAttendance ? userAttendance.pivot.status : null;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <PageComponent title="Naptar">
      {isAdmin && (
        <Button variant="contained" color="primary" style={{ marginBottom: '16px' }} onClick={handleOpen}>
          Create Event
        </Button>
      )}
      <InfiniteScroll
        dataLength={events.length}
        loader={<CircularProgress />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            {/* <b>Yay! You have seen it all</b> */}
          </p>
        }
      >
        {events.map((event) => (
          <Card key={event.id} style={{ marginBottom: '16px', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {event.title}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {event.date}
              </Typography>
              <Typography variant="body2">
                {event.description}
              </Typography>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateAttendance(event.id, currentUser.id, 'going')}
                  disabled={getUserAttendanceStatus(event, currentUser.id) === 'going'}
                >
                  Attend
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => updateAttendance(event.id, currentUser.id, 'not_going')}
                  disabled={getUserAttendanceStatus(event, currentUser.id) === 'not_going'}
                >
                  Can't Attend
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleShowAttendees(event)}>
                  Show Attendees
                </Button>
              </div>
              {isAdmin && (
                <IconButton
                  style={{ position: 'absolute', top: '8px', right: '8px' }}
                  onClick={() => deleteEvent(event.id)}
                >
                  <Delete />
                </IconButton>
              )}
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>

      <EventData open={open} handleClose={handleClose} handleChange={handleChange} fetchEvents={fetchEvents} />
      <AttendeesDialog open={showAttendees} handleClose={handleCloseAttendees} event={selectedEvent} />

    </PageComponent>
  );
}
