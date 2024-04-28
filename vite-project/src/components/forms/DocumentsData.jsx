import React, { useState, useEffect } from 'react';
import { Fab, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import FileUpload from '../../components/upload/FileUpload';
import axiosClient from '../../axios';
import DeleteFile from '../../components/popups/DeleteFile';


export default function DocumentsData() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [checkboxedDocuments, setCheckboxedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const openUploadDialog = () => {
    setIsUploadClicked(true);
  };

  const closeDialog = () => {
    setIsUploadClicked(false);
    fetchDocuments();
  };

  const openDeleteDialog = () => {
    setIsDeleteClicked(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteClicked(false);
    fetchDocuments();
  };

  useEffect(() => {
    fetchDocuments();
  }, []);



  const fetchDocuments = async () => {
    try {
      const response = await axiosClient.get('/user/documents');
      setUploadedFiles(response.data.documents);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const getFileExtension = (fileName) => {
    const parts = fileName.split('.');
    const extension = parts[parts.length - 1];
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
        return '../../src/assets/IconZIP.png';
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

  const handleCheckboxChange = (file) => {
    // Check if the file is already in the checkboxedDocuments array
    const isChecked = checkboxedDocuments.some((doc) => doc.id === file.id);

    if (isChecked) {
      // If the file is already checked, remove it from the checkboxedDocuments array
      setCheckboxedDocuments(
        checkboxedDocuments.filter((doc) => doc.id !== file.id)
      );
    } else {
      // If the file is not checked, add it to the checkboxedDocuments array
      setCheckboxedDocuments([...checkboxedDocuments, file]);
    }

    console.log(checkboxedDocuments);
  };

  const handleDeleteSelected = async () => {
    try {
      await axiosClient.delete('/delete/documents', {
        data: { documents: checkboxedDocuments.map((doc) => doc.id) },
      });
      setCheckboxedDocuments([]);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  };

  const checkboxAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckboxedDocuments([...uploadedFiles]);
    } else {
      setCheckboxedDocuments([]);
    }
  };


  return (
    <div className='h-full relative'>
      <h2 className="text-base font-semibold leading-7 text-gray-900 ">Uploaded Documents</h2>

      <div className='flex justify-end mb-10 space-x-4'>
        <div className="">
          <Button
            variant="contained"
            color="secondary"
            disabled={checkboxedDocuments.length === 0}
            onClick={openDeleteDialog}
            startIcon={<DeleteIcon />}
          >
            Delete
            {/* {checkboxedDocuments.length== 0 ? '' : '(' + checkboxedDocuments.length + ')'} */}
          </Button>
        </div>

        <div className="">
          <Button
            variant="contained"
            color="primary"
            disabled={checkboxedDocuments.length === 0}
            onClick={handleDeleteSelected}
            startIcon={<DownloadIcon />}
          >
            Download
            {/* {checkboxedDocuments.length== 0 ? '' : '(' + checkboxedDocuments.length + ')'} */}
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded-full border-gray-300 text-indigo-600"
          onChange={(e) => checkboxAll(e)}
        />
        <div className="text-gray-600 font-semibold w-2/6 flex justify-start pl-20">Name</div>
        <div className="text-gray-600 font-semibold w-2/6 flex justify-start">Type</div>
        <div className="text-gray-600 font-semibold w-1/6 flex justify-start pl-4">Size</div>
        <div className="text-gray-600 font-semibold w-1/6 flex justify-centre pl-4">Upload date</div>
      </div>

      <div className="mt-3 mb-24">
        {loading ? (
          <div className="flex justify-center items-center h-72">
            <CircularProgress />
          </div>
        ) : (
          <>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center border-b py-2">

                <div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 pt-2"
                    onChange={() => handleCheckboxChange(file)}
                    checked={checkboxedDocuments.some((doc) => doc.id === file.id)}
                  />
                </div>

                <div className="w-2/6 flex justify-start px-8">
                  <img
                    src={getFileIcon(file)}
                    alt="file icon"
                    className="w-6 h-6"
                  />
                  <p className="font-semibold pl-6 truncate ...">{file.name}</p>
                </div>

                <div className="w-2/6 ">
                  <p>{file.type}</p>
                </div>

                <div className="w-1/6 px-4">
                  <p>{formatSize(file.size)}</p>
                </div>

                <div className="w-1/6 pl-4 justify-end">
                  <p>{formatDate(file.last_modified)}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {!selectedDocument && (
        <div className="absolute bottom-4 right-4">
          <Fab
            color="primary"
            aria-label="add"
            onClick={openUploadDialog}
          >
            <AddIcon />
          </Fab>
        </div>
      )}

      {isUploadClicked && <FileUpload handleClose={closeDialog} />}

      {isDeleteClicked && <DeleteFile

        handleClose={closeDeleteDialog}
        filesToDelete={checkboxedDocuments}
        refreshFiles={fetchDocuments}
        
        />}

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
