import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axiosClient from '../../axios';

export default function FileUpload({handleClose, refreshFiles}) {

  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('Egyeb');
  const [tempDocument, setTempDocument] = useState(null);
  const [tempDocumentUrl, setTempDocumentUrl] = useState(null);
  const [error, setError] = useState(null);

  const closeDialog = () => {
    handleClose();
  };

  const validateFileType = (type) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip'];
    return allowedTypes.includes(type);
  };

  const handleTempUpload = (file) => {

    setTempDocument(null);
    setTempDocumentUrl(null);

    if(file){
      if(validateFileType(file.type)){
        setTempDocument(file);
        const url = URL.createObjectURL(file);
        setTempDocumentUrl(url);
        setError(null)
      } else {
        setError("Invalid file type!")
      }
    }
  };

  const handleFinalUpload = () => {
    if (tempDocument) {
      // Create metadata record and upload file
      uploadFile(tempDocument, documentName, documentType);
      console.log("Uploading document: ", documentName, documentType, tempDocument);
      closeDialog();
    } else {
      setError("Please select a file to upload");
    }
  };

  const uploadFile = async (file, name, type) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', documentName);
      formData.append('type', documentType);

      console.log('Uploading file:', formData);

      const response = await axiosClient.post('/upload/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File uploaded successfully:', response.data);
      refreshFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file');
    }
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

        
        <FormControl fullWidth sx={{ mt: 2}}>
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
              onChange={(e) => handleTempUpload(e.target.files[0])}
            />
          </Button>
        </div>

        {error && (
          <div className="flex justify-center mt-2">
            <p className="text-red-500">{error}</p>
          </div>
        )}

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
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFinalUpload} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
