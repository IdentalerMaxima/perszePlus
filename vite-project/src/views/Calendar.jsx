import React, { useState, useEffect } from 'react';
import PageComponent from "../components/PageComponent";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, Button, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material'; // Import necessary components
import { useStateContext } from '../contexts/ContextProvider';
import { Delete } from '@mui/icons-material';
import axiosClient from '../axios';
import EventData from '../components/forms/EventData';
import AttendeesDialog from '../components/popups/AttendeesDialog';
import { Edit } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';


export default function Calendar() {
  const { currentUser, isAdmin } = useStateContext();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false); // State for event modal
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event
  const [showAttendees, setShowAttendees] = useState(false); // State for showing attendees list
  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [showOldEvents, setShowOldEvents] = useState(false); // State for toggling old events

  // Media query to check if the screen size is small (mobile view)
  const isMobile = useMediaQuery('(max-width: 600px)');



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

  const handleEdit = (event) => {
    setEditMode(true);
    setSelectedEvent(event);
    setOpen(true);
  }

  const saveEditedEvent = async (editedEvent) => {
    try {
      await axiosClient.put(`/editEvent/${editedEvent.id}`, editedEvent); // Example put request for updating event
      fetchEvents(); // Refresh events after edit
      setSelectedEvent(null);
      setEditMode(false);
      setOpen(false); // Close the form dialog after editing
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };


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
    <PageComponent title="Esemenyek">

      <div className={`flex flex-row ${isMobile ? 'justify-center' : ''}`}>
        {isAdmin && (
          <Button variant="contained" color="primary" style={{ marginBottom: '16px' }} onClick={handleOpen}>
            Create Event
          </Button>
        )}

        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: '16px', marginLeft: '16px' }}
            onClick={() => setShowOldEvents(prevState => !prevState)}
          >
            {showOldEvents ? 'Hide Old Events' : 'Show Old Events'}
          </Button>
        )}


      </div>

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
          // Only render event if showOldEvents is true or event date is in the future
          (showOldEvents || new Date(event.date) >= new Date()) && (
            <Card key={event.id} style={{ marginBottom: '16px', position: 'relative'}}>
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
                  <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px'}}>
                    <IconButton
                      style={{ position: 'absolute', bottom: '2px', right: '40px' }}
                      onClick={() => deleteEvent(event.id)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      style={{ position: 'absolute', bottom: '2px', right: '8px'}}
                      onClick={() => { handleEdit(event) }}
                    >
                      <Edit />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          )
        ))}
      </InfiniteScroll>

      <EventData
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        fetchEvents={fetchEvents}
        editMode={editMode}
        event={selectedEvent}
        saveEditedEvent={saveEditedEvent}
      />
      <AttendeesDialog open={showAttendees} handleClose={handleCloseAttendees} event={selectedEvent} />

    </PageComponent>
  );
}
