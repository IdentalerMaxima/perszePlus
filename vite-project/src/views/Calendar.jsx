import React, { useState, useEffect } from 'react';
import PageComponent from "../components/PageComponent";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

const generateMockEvents = (count) => {
  // Function to generate mock events data
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Event ${index + 1}`,
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    description: `Description for Event ${index + 1}`,
  }));
};

export default function Calendar() {
  const { currentUser, isAdmin } = useStateContext();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [hasMore, setHasMore] = useState(true);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(newEvent);
    setOpen(false);
  }

  useEffect(() => {
    // Initial load of events
    const initialEvents = generateMockEvents(10);
    setEvents(initialEvents);
  }, []);

  useEffect(() => {
    console.log(currentUser);
    console.log(isAdmin);
  }, [currentUser, isAdmin]);

  const fetchMoreEvents = () => {
    // Fetch more events when the user scrolls down
    if (events.length >= 50) {
      setHasMore(false); // No more events to load
      return;
    }

    setTimeout(() => {
      const newEvents = generateMockEvents(10);
      setEvents((prevEvents) => [...prevEvents, ...newEvents]);
    }, 1500);
  };

  return (
    <PageComponent title="Naptar">
      {isAdmin && (
        <Button variant="contained" color="primary" style={{ marginBottom: '16px' }} onClick={handleOpen}>
          Create Event
        </Button>
      )}
      <InfiniteScroll
        dataLength={events.length}
        next={fetchMoreEvents}
        hasMore={hasMore}
        loader={<CircularProgress />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {events.map((event) => (
          <Card key={event.id} style={{ marginBottom: '16px' }}>
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
              <Button variant="contained" color="primary" style={{ marginTop: '8px' }}>
                Attend
              </Button>
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>

      {/* Dialog for creating new event */}

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

    </PageComponent>
  );
}
