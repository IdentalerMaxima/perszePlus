import React, { useState, useEffect } from 'react';
import { Fab, Button, CircularProgress, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FileUpload from '../../components/upload/FileUpload';
import axiosClient from '../../axios';
import DeleteFile from '../../components/popups/DeleteFile';
import FileViewerDialog from '../../components/popups/FileViewerDialog';
import { use } from 'i18next';

export default function DocumentsData() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [checkboxedDocuments, setCheckboxedDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [selectedDocumentToView, setSelectedDocumentToView] = useState(null);

  const closeUploadDialog = () => {
    setIsUploadClicked(false);
    fetchDocuments();
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
      console.log(response.data.documents)
      setUploadedFiles(response.data.documents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const downloadFile = async (fileId) => {
    try {
      const response = await axiosClient.get(`/user/documents/${fileId}`, {
        responseType: 'blob',
      });

      const contentType = response.headers['content-type'];
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      let fileName = 'downloaded-file';
      if (response.headers && response.headers['content-disposition']) {
        const contentDisposition = response.headers['content-disposition'];
        const match = contentDisposition.match(/filename=([^;]+)/);

        if (match && match[1]) {
          fileName = match[1].trim();
        } else {
          console.warn('Filename not found in Content-Disposition header.');
        }
      }

      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  const downloadSelectedFiles = async () => {
    for (const file of checkboxedDocuments) {
      await downloadFile(file.id);
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
      case 'jpg':
      case 'png':
        return '../../src/assets/IconIMG.png';
      case 'pdf':
        return '../../src/assets/IconPDF.png';
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCheckboxChange = (file) => {
    const isChecked = checkboxedDocuments.some((doc) => doc.id === file.id);

    if (isChecked) {
      setCheckboxedDocuments(
        checkboxedDocuments.filter((doc) => doc.id !== file.id)
      );
    } else {
      setCheckboxedDocuments([...checkboxedDocuments, file]);
    }

    console.log(checkboxedDocuments);
  };

  // const handleDeleteSelected = async () => {
  //   try {
  //     await axiosClient.delete('/delete/documents', {
  //       data: { documents: checkboxedDocuments.map((doc) => doc.id) },
  //     });
  //     setCheckboxedDocuments([]);
  //     fetchDocuments();
  //   } catch (error) {
  //     console.error('Error deleting documents:', error);
  //   }
  // };

  const checkboxAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckboxedDocuments([...uploadedFiles]);
    } else {
      setCheckboxedDocuments([]);
    }
  };

  const handleViewDocument = (document) => {
    getFile(document);
  };

  const getFile = async (file) => {
    try {
      console.log('file:', file);
      const retrievedFile = await axiosClient.get(`/user/documents/show/${file.id}`, {
        responseType: 'blob',
      });
      console.log('retrievedFile:', retrievedFile);
      const fileURL = URL.createObjectURL(retrievedFile.data);
      setSelectedDocumentToView({
        title: file.name,
        type: file.type,
        url: fileURL,
        extension: getFileExtension(file.original_name),
      });
    } catch (error) {
      console.error('Error viewing file:', error);
    }
  };

  const handleCloseDocument = () => {
    setSelectedDocumentToView(null);
  }


  return (
    <div className='h-full relative'>
      {/* //"text-base font-semibold leading-7 text-gray-900 */}
      <h2 className={` ${isMobile ? "text-base font-semibold leading-7 text-gray-900 mb-6 text-center" : "text-base font-semibold leading-7 text-gray-900"}`}>Uploaded Documents</h2>

      <div className='flex justify-end mb-10 space-x-4'>
        <div className="">
          <Button
            variant="contained"
            color="secondary"
            disabled={checkboxedDocuments.length === 0}
            onClick={() => setIsDeleteClicked(true) }
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>

        <div className="">
          <Button
            variant="contained"
            color="primary"
            disabled={checkboxedDocuments.length === 0}
            onClick={downloadSelectedFiles}
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
        </div>
      </div>

      {!isMobile && (
        <div className="flex justify-between items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-full border-gray-300 text-indigo-600"
            onChange={(e) => checkboxAll(e)}
          />
          <div className="text-gray-600 font-semibold w-2/6 flex justify-start pl-20">Name</div>
          <div className="text-gray-600 font-semibold w-2/6 flex justify-start">Type</div>
          <div className="text-gray-600 font-semibold w-1/6 flex justify-centre pl-4">Upload date</div>
          <div className="text-gray-600 font-semibold w-1/6 flex justify-centre pl-4">Actions</div>
        </div>
      )}

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

                <div className={`flex ${isMobile ? 'w-full justify-start px-4' : 'w-2/6 justify-start px-8 p-2'}`}>
                  <img
                    src={getFileIcon(file)}
                    alt="file icon"
                    className="w-6 h-6"
                  />
                  <p className="font-semibold pl-6 truncate ...">{file.name}</p>
                </div>

                {!isMobile && (
                  <>
                    <div className="w-2/6">
                      <p>{file.type}</p>
                    </div>

                    <div className="w-1/6 pl-4 justify-end">
                      <p>{formatDate(file.last_modified)}</p>
                    </div>

                    <div className="w-1/6 px-4">
                      {['jpg', 'jpeg', 'png', 'pdf'].includes(getFileExtension(file.file_path)) && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewDocument(file)}
                        >
                          View
                        </Button>
                      )}
                    </div>

                  </>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {!selectedDocument && (
        <div className={` ${isMobile ? "flex justify-end" : "absolute bottom-4 right-4"} `}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={ () => setIsUploadClicked(true) } 
          >
            <AddIcon />
          </Fab>
        </div>
      )}

      {isUploadClicked && <FileUpload
        handleClose={closeUploadDialog}
        refreshFiles={fetchDocuments}
      />}

      {isDeleteClicked && <DeleteFile
        handleClose={closeDeleteDialog}
        filesToDelete={checkboxedDocuments}
        refreshFiles={fetchDocuments}
      />}

      {selectedDocumentToView && (
        <FileViewerDialog
          document={selectedDocumentToView}
          onClose={handleCloseDocument}
        />
      )}

    </div>
  );
}
