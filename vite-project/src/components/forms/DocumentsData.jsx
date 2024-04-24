import React, { useState } from 'react';
import { Button } from '@mui/material';
import FileUpload from '../../components/upload/FileUpload';

export default function DocumentsData() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      name: 'Test Document 1',
      type: 'application/pdf',
      lastModifiedDate: new Date(),
    },
    {
      name: 'Test Document 2',
      type: 'application/pdf',
      lastModifiedDate: new Date(),
    },
  ]);

  const [isUploadCicked, setIsUploadCicked] = useState(false);

  const openDialog = () => {
    setIsUploadCicked(true);
  };

  const closeDialog = () => {
    setIsUploadCicked(false);
  };


  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Uploaded Documents</h2>

      <div className="mt-3 flex justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={openDialog}
        >
          Upload Document
        </Button>
      </div>

      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index} className="flex justify-between">
            <p>{file.name}</p>
            <p>{file.type}</p>
            <p>{file.lastModifiedDate.toLocaleDateString()}</p>
            <p>{file.name}</p>
            {/* Replace with your icon */}
            <p>📄</p>
          </li>
        ))}
      </ul>

      {isUploadCicked && <FileUpload handleClose={closeDialog} />}

    </div>
  );
}
