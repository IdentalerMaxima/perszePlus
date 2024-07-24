import React, { useState, useRef, useEffect } from 'react';
import {
  Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, IconButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import PageComponent from '../components/PageComponent';
import { QrReader } from '@blackbox-vision/react-qr-reader';

const Attendance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDecodedText(''); // Reset decoded text
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
            onClick={openModal}
          >
            <CardContent className="rounded-md flex flex-col items-center">
              <Typography variant="h6">
                Kozossegi
              </Typography>
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
              <Typography variant="h6">
                Esemeny
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
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: '100%' }}
          />
          <p>{data}</p>
        </DialogContent>
      </Dialog>
    </PageComponent>
  );
};

export default Attendance;
