import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, IconButton
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import PageComponent from '../components/PageComponent';
import axiosClient from '../axios';

const Attendance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [eventName, setEventName] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
    setData(''); //Reset decoded text
  };

  useEffect(() => {
    if (data) {
      handleUserCheckIn();
    }
  }, [data]);

  const handleUserCheckIn = async () => {
    console.log('Checking in user with ID:', data);
    try {
      const response = await axiosClient.post('/checkInEvent', { eventId: data });
      setEventName(response.data.eventName);
      console.log('Setting event name');

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        closeModal();
        window.location.reload();
      }, 2000);
    }
    catch (error) {
      console.error('Error checking in user:', error);
    }
  };

  return (
    <PageComponent title="Attendance">
      <Grid container spacing={3} className="flex justify-center">
        <Grid item xs={12} sm={4} md={3} className="flex justify-center">
          <Button
            component={Card}
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
              borderRadius: '8px',
            }}
            onClick={() => { setIsModalOpen(true) }}
          >
            <CardContent className="rounded-md flex flex-col items-center">
              <Typography variant="h6">
                Check In
              </Typography>
              <EventIcon
                style={{
                  marginTop: '16px',
                  width: '100px',
                  height: '100px',
                  color: '#1976d2',
                }}
              />
            </CardContent>
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          QR Code Scanner
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeModal}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <QrReader
            onResult={(result, error) => {
              if (result) {
                setData(result.text);
                result = null;
              }
              if (error) {
                console.log('Error:', error)
              }
            }}
          />

          {/* <Button onClick={() => {
            setData('26');
          }}>Simulate success</Button> */}

          {/* Success Animation */}
          {showSuccess && (
            <div style={successAnimationStyle}>
              <CheckCircleIcon style={{ fontSize: '100px', color: 'green' }} />
              <Typography variant="h4" style={{ color: 'green' }}>Successfully checked in to {eventName}</Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageComponent >
  );
};

const successAnimationStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  zIndex: 1000,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
};

export default Attendance;
