import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const FileViewerDialog = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <Dialog 
      open={Boolean(document)} 
      onClose={onClose} 
      maxWidth={false}
    >
      <DialogTitle>
        <div className="flex justify-between items-center pl-4">
          <Typography variant="h6">{document.title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="textSecondary" paragraph style={{ textAlign: 'center' }}>
          {document.type}
        </Typography>
        <div className="flex justify-center content-center" style={{ padding: '16px' }}>
          <img
            src={document.url}
            alt={document.title}
            style={{ maxWidth: '100%', maxHeight: '600px' }}
          />
        </div>
        <div className="mt-4 flex justify-center" style={{ padding: '16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open(document.url)}
          >
            View Fullscreen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileViewerDialog;
