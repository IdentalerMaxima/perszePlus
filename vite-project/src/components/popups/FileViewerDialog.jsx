import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import FileViewer from 'react-file-viewer';

const FileViewerDialog = ({ document, onClose }) => {

  const getFileType = () => {

    const extension = document.extension;

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
      return 'image';
    } else if (extension === 'pdf') {
      return 'pdf';
    } else if (['doc', 'docx'].includes(extension)) {
      return 'word';
    } else {
      return 'unsupported';
    }
  };

  const fileType = getFileType(document.name || document.url);

  const renderContent = () => {
    switch (fileType) {
      case 'image':
        return (
          <img
            src={document.url}
            alt={document.title}
            style={{ maxWidth: '100%', maxHeight: '600px' }}
          />
        );
      case 'pdf':
        return (
          <iframe
            src={document.url}
            title={document.title}
            style={{ width: '100%', height: '600px', border: 'none' }}
          />
        );
      case 'word':
        return null;

      default:
        return <Typography>Unsupported file type</Typography>;
    }
  };

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
          {fileType.toUpperCase()}
        </Typography>
        <div className="flex justify-center content-center" style={{ padding: '16px' }}>
          {renderContent()}
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
