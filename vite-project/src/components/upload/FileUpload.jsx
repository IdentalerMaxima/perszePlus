import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function FileUpload({handleClose}) {

  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('Egyeb');
  const [tempDocument, setTempDocument] = useState(null);
  const [tempDocumentUrl, setTempDocumentUrl] = useState(null);

  const closeDialog = () => {
    setDocumentName('');
    setDocumentType('Egyeb');
    setTempDocument(null);
    setTempDocumentUrl(null);
    handleClose();
  };

  const handleFileUpload = (file) => {
    setTempDocument(file);

    const url = URL.createObjectURL(file);
    setTempDocumentUrl(url);
  };

  const handleDocumentUpload = () => {
    handleDocumentUpload(tempDocument);
    setTempDocument(null); // Clear temporary document
    closeDialog();
  };

  const getFileIcon = (type) => {
  switch (type) {
    case 'image/jpeg':
    case 'image/png':
      return '../../src/assets/IconIMG.png';
    case 'application/pdf':
      return '../../src/assets/IconPDF.png';
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return '../../src/assets/IconDOC.png';
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return '../../src/assets/IconXLS.png';
    case 'application/zip':
      return '../../src/assets/IconZIP.png';
    default:
      return '../../src/assets/defaultFileIcon.jpg';
  }
};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload Document</DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Document Name"
          type="text"
          fullWidth
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          InputProps={{
            sx: {
              '& input[type="text"]:focus': {
                boxShadow: 'none !important',
              },
            },
          }}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="document-type-label">Document Type</InputLabel>
          <Select
            labelId="document-type-label"
            label="Document Type"
            id="document-type"
            value={documentType}
            defaultValue=""
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <MenuItem value="Hatranyos helyzet">Hatranyos helyzet</MenuItem>
            <MenuItem value="Halmozottan hatranyos helyzet">Halmozottan hatranyos helyzet</MenuItem>
            <MenuItem value="MASZ">MASZ</MenuItem>
            <MenuItem value="Cigany/Roma tanusitvany">Cigany/Roma tanusitvany</MenuItem>
            <MenuItem value="Egyeb">Egyeb</MenuItem>
          </Select>
        </FormControl>

        <div className="flex justify-center mt-8">
          <Button
            variant="contained"
            component="label"
            color="primary"
            sx={{ width: 200 }}
          >
            {tempDocument ? 'Change Document' : 'Upload Document'}
            <input
              type="file"
              hidden
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </Button>
        </div>


        {tempDocumentUrl && (
          <div className="mt-2 items-center justify-center">
            <div className="flex justify-center">
              <img src={ getFileIcon(tempDocument.type) } alt={tempDocument.name} className="w-32 h-32" />
            </div>
            <div className="flex justify-center">
              <p className="mt-2">{tempDocument.name}</p>
            </div>
          </div>
        )}


      </DialogContent>

      <DialogActions >
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDocumentUpload} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
