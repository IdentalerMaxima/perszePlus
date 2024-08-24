import React, { useState, useEffect } from 'react';
import PageComponent from "../components/PageComponent";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, Button, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import { Delete, Edit, Close } from '@mui/icons-material';
import axiosClient from '../axios';
import EventData from '../components/forms/EventData';
import AttendeesDialog from '../components/popups/AttendeesDialog';
import { useMediaQuery } from '@mui/material';

export default function Events() {
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

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axiosClient.get('/getEvents');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const endEvent = (eventId) => {
    markUncheckedUsersAsMissed(eventId);
    closeEvent(eventId);
    fetchEvents();
  };

  const reopenEvent = async (eventId) => {
    try {
      const response = await axiosClient.post('/reopenEvent', { eventId });
      console.log('Event reopened:', response.data);
      fetchEvents();
    } catch (error) {
      console.error('Error reopening event:', error);
    }
  };

  const markUncheckedUsersAsMissed = async () => {
    try {
      const response = await axiosClient.post('/setMissedStatus');
      console.log('Unchecked users marked as missed');
      console.log(response.data);
      // fetchEvents();
    } catch (error) {
      console.error('Error updating events:', error);
    }
  };

  const closeEvent = async (eventId) => {
    try {
      console.log('Closing event:', eventId);
      const response = await axiosClient.post('/closeEvent', { eventId: eventId });
      console.log('Event closed:', response.data);
      fetchEvents();
    } catch (error) {
      console.error('Error closing event:', error);
    }
  };

  const handleShowAttendees = (event) => {
    setSelectedEvent(event);
    setShowAttendees(true);
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

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  return (
    <PageComponent title="Events">
      <div className={`flex flex-row ${isMobile ? 'justify-center' : ''}`}>
        {isAdmin && (
          <Button variant="contained" color="primary" style={{ marginBottom: '16px' }} onClick={() => setOpen(true)}>
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

      {loading ? (
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
                    {/* Disable buttons if event is closed */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateAttendance(event.id, currentUser.id, 'going')}
                      disabled={getUserAttendanceStatus(event, currentUser.id) === ('going' || 'went') || event.isClosed}
                    >
                      Going
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => updateAttendance(event.id, currentUser.id, 'not_going')}
                      disabled={getUserAttendanceStatus(event, currentUser.id) === 'not_going' || event.isClosed}
                    >
                      Can't go
                    </Button>

                    <Button variant="outlined" color="primary" onClick={() => handleShowAttendees(event)} disabled={event.isClosed}>
                      Show Attendees
                    </Button>

                    {isAdmin && (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleShowQrCode(event)}
                          disabled={event.isClosed}
                        >
                          QR Code
                        </Button>
                        <Button variant="outlined" onClick={() => endEvent(event.id)} disabled={event.isClosed}>
                          End Event
                        </Button>
                      </>
                    )}
                  </div>
                  {isAdmin && (
                    <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                      <IconButton
                        style={{ position: 'absolute', bottom: '2px', right: '40px' }}
                        onClick={() => deleteEvent(event.id)}
                        disabled={event.isClosed}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        style={{ position: 'absolute', bottom: '2px', right: '8px' }}
                        onClick={() => handleEdit(event)}
                        disabled={event.isClosed}
                      >
                        <Edit />
                      </IconButton>
                    </Box>
                  )}

                  {event.closed === 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(128, 128, 128, 0.5)',
                        zIndex: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="h6" color="white">
                        Closed
                      </Typography>
                    </div>
                  )}

                  {event.closed === 1 && isAdmin && (
                    <IconButton
                      onClick={() => reopenEvent(event.id)}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        color: 'white',
                        zIndex: 3,
                      }}
                    >
                      <Close></Close>

                    </IconButton>
                  )}

                </CardContent>
              </Card>
            )
          ))}
        </InfiniteScroll>
      )}

      <EventData
        open={open}
        handleClose={() => setOpen(false)}
        handleChange={handleChange}
        fetchEvents={fetchEvents}
        editMode={editMode}
        event={selectedEvent}
        saveEditedEvent={saveEditedEvent}
      />

      <AttendeesDialog open={showAttendees} handleClose={ () => setShowAttendees(false)} event={selectedEvent} />

      {isAdmin && qrCode && (
        <Dialog open={qrCodeDialogOpen} onClose={() => setQrCodeDialogOpen(false)}>
          <DialogTitle>QR Code</DialogTitle>
          <DialogContent>
            {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setQrCodeDialogOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </PageComponent>
  );
}
