import React, { useState, useEffect } from 'react';
import PageComponent from "../components/PageComponent";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, Button, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import { Delete, Edit } from '@mui/icons-material';
import axiosClient from '../axios';
import EventData from '../components/forms/EventData';
import AttendeesDialog from '../components/popups/AttendeesDialog';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

export default function Calendar() {
  const { currentUser, isAdmin } = useStateContext();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAttendees, setShowAttendees] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showOldEvents, setShowOldEvents] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowAttendees = (event) => {
    setSelectedEvent(event);
    setShowAttendees(true);
  };

  const handleCloseAttendees = () => {
    setShowAttendees(false);
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleEdit = (event) => {
    setEditMode(true);
    setSelectedEvent(event);
    setOpen(true);
  };

  const saveEditedEvent = async (editedEvent) => {
    try {
      await axiosClient.put(`/editEvent/${editedEvent.id}`, editedEvent);
      fetchEvents();
      setSelectedEvent(null);
      setEditMode(false);
      setOpen(false);
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axiosClient.get('/getEvents');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axiosClient.delete(`/deleteEvent/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const updateAttendance = async (eventId, userId, status) => {
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

  const handleShowQrCode = async (event) => {
    setSelectedEvent(event);
    try {
      const response = await axiosClient.get(`/generateQr/${event.id}`);
      const qrCodeBase64 = response.data.qr_code;
      setQrCode(qrCodeBase64);
      setQrCodeDialogOpen(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleCloseQrCodeDialog = () => {
    setQrCodeDialogOpen(false);
  };

  const handleUpdateEvents = async () => {
    try {
      await axiosClient.post('/updateMissedEvents')
      fetchEvents();
    } catch (error) {
      console.error('Error updating events:', error);
    }
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

      { loading ? (
        <div className="flex justify-center items-center h-96">
          <CircularProgress />
        </div>
      ) : (
        <InfiniteScroll
        dataLength={events.length}
        loader={<CircularProgress />}
        endMessage={
          <p style={{ textAlign: 'center' }}></p>
        }
      >
        {events.map((event) => (
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
                    disabled={getUserAttendanceStatus(event, currentUser.id) === ('going' || 'went')  }
                  >
                    Going
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => updateAttendance(event.id, currentUser.id, 'not_going')}
                    disabled={getUserAttendanceStatus(event, currentUser.id) === 'not_going'}
                  >
                    Can't go
                  </Button>

                  <Button variant="outlined" color="primary" onClick={() => handleShowAttendees(event)}>
                    Show Attendees
                  </Button>

                  { isAdmin && (
                    <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleShowQrCode(event)} // Correctly pass event here
                  >
                  QR Code
                  </Button>
                  )}

                  { isAdmin && (
                    <Button
                    variant="outlined"
                    onClick={ handleUpdateEvents }>
                    End Event
                  </Button>
                  )}

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
      )}

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

      {isAdmin && qrCode && (
        <Dialog open={qrCodeDialogOpen} onClose={handleCloseQrCodeDialog}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQrCodeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      )}

    </PageComponent>
  );
}
