import React, { useState, useEffect, useRef } from 'react';
import {
  Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, IconButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import PageComponent from '../components/PageComponent';
import { BrowserQRCodeReader } from '@zxing/library';

const Attendance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [decodedText, setDecodedText] = useState('');
  const [error, setError] = useState('');
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null); // Added for holding codeReader instance

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (codeReaderRef.current) {
      codeReaderRef.current.reset(); // Reset the reader when the modal is closed
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader; // Store the instance in the ref

      console.log('ZXing code reader initialized');

      codeReader.getVideoInputDevices()
        .then(devices => {
          setVideoInputDevices(devices);
          if (devices.length > 0) {
            setSelectedDeviceId(devices[0].deviceId);
          }
        })
        .catch(err => {
          console.error(err);
          setError('Error accessing video input devices');
        });

      const startDecoding = () => {
        if (selectedDeviceId && videoRef.current) {
          codeReader.decodeFromInputVideoDevice(selectedDeviceId, videoRef.current)
            .then(result => {
              console.log(result);
              setDecodedText(result.text);
              setError('');
              setIsModalOpen(false); // Close the modal when a QR code is successfully decoded
              codeReader.reset(); // Reset the reader after successful decoding
            })
            .catch(err => {
              console.error(err);
              setError('QR code decoding failed');
            });
        }
      };

      startDecoding();

      return () => {
        if (codeReader) {
          codeReader.reset(); // Ensure reader is reset when the component unmounts
        }
      };
    }
  }, [isModalOpen, selectedDeviceId]);

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
            onClick={openModal}
          >
            <CardContent className="rounded-md flex flex-col items-center">
              <Typography variant="h6">Kozossegi</Typography>
              <HomeIcon
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
            onClick={() => console.log("Esemenyre valo becsekkolas button clicked")}
          >
            <CardContent className="rounded-md flex flex-col items-center">
              <Typography variant="h6">Esemeny</Typography>
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

      {/* QR Reader Modal */}
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
          <div>
            <label htmlFor="sourceSelect">Change video source:</label>
            <select
              id="sourceSelect"
              onChange={(e) => setSelectedDeviceId(e.target.value)}
            >
              {videoInputDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <video ref={videoRef} width="300" height="200" style={{ border: '1px solid gray' }} />
          </div>

          {/* <div>
            <label>Result:</label>
            <pre>{decodedText}</pre>
            {error && <pre style={{ color: 'red' }}>{error}</pre>}
          </div> */}

        </DialogContent>
      </Dialog>
    </PageComponent>
  );
};

export default Attendance;
