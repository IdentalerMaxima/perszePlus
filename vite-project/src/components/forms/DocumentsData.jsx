import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FileUpload from '../../components/upload/FileUpload';
import axiosClient from '../../axios';

export default function DocumentsData() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const openDialog = () => {
    setIsUploadClicked(true);
  };

  const closeDialog = () => {
    setIsUploadClicked(false);
    fetchDocuments();
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axiosClient.get('/user/documents');
      setUploadedFiles(response.data.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const openDocument = (document) => {
    setSelectedDocument(document);
    console.log('Opening document:', document);
  };

  const getFileExtension = (fileName) => {
    const parts = fileName.split('.');
    const extension = parts[parts.length - 1];
    console.log('File extension:', extension);
    return extension;
  };

  const getFileIcon = (file) => {

    switch (getFileExtension(file.file_path)) {
      case 'jpeg':
      case 'png':
        return '../../src/assets/IconIMG.png';
      case 'pdf':
        return 'png';
      case 'docx':
        return '../../src/assets/IconDOC.png';
      case 'xlsx':
        return '../../src/assets/IconXLS.png';
      case 'zip':
        return '../../src/assets/IconZIP.png';
      default:
        return '../../src/assets/defaultFileIcon.jpg';
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='h-full relative'>
      <h2 className="text-base font-semibold leading-7 text-gray-900 mb-4">Uploaded Documents</h2>

      <div className="flex justify-between mb-4 pl-4">
        <div className="text-gray-600 font-semibold w-1/5 flex justify-start">Name</div>
        <div className="text-gray-600 font-semibold w-1/5 flex justify-start">Type</div>
        <div className="text-gray-600 font-semibold w-1/5 flex justify-start">Upload date</div>
        <div className="text-gray-600 font-semibold w-1/5 flex justify-start">Size</div>
        <div className="text-gray-600 font-semibold w-1/5 flex justify-end"></div>
      </div>

      <div className="mt-3 mb-24">
        {uploadedFiles.map((file, index) => (

          <div key={index} className="flex justify-start items-center border-b py-2">

            <div className="w-1/5 flex justify-start px-4 cursor-pointer" onClick={() => openDocument(file)}>
              <p className="font-semibold">{file.name}</p>
            </div>

            <div className="w-1/5 px-4">
              <p>{file.type}</p>
            </div>

            <div className="w-1/5 px-4">
              <p>{formatDate(file.last_modified)}</p>
            </div>

            <div className="w-1/5 px-4">
              <p>{formatSize(file.size)}</p>
            </div>

            <div className="w-1/5 px-4 flex justify-end">
              <img
                src={getFileIcon(file)}
                alt="file icon"
                className="w-6 h-6 cursor-pointer"
                onClick={() => openDocument(file)}
              />
            </div>
          </div>
        ))}
      </div>

      {!selectedDocument && (
        <div className="absolute bottom-4 right-4">
          <Fab
            color="primary"
            aria-label="add"
            onClick={openDialog}
          >
            <AddIcon />
          </Fab>
        </div>
      )}

      {isUploadClicked && <FileUpload handleClose={closeDialog} />}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <iframe
            title="document"
            className="w-3/4 h-3/4"
            src={`http://127.0.0.1:8000/${selectedDocument.file_path}`}
          />

          <div
            className="absolute top-4 right-4 bg-white rounded-full p-2 cursor-pointer"
            onClick={() => setSelectedDocument(null)}
          >
            <CloseIcon />
          </div>
        </div>
      )}
    </div>
  );
}
