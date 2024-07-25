import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import PageComponent from '../components/PageComponent';
import Avatar from '@mui/material/Avatar';
import { CircularProgress, useMediaQuery, Button, IconButton, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import FileViewerDialog from '../components/popups/FileViewerDialog';

const MemberProfile = () => {
  const { id } = useParams();
  const { isAdmin } = useStateContext();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [eventsOfUser, setEventsOfUser] = useState([]);

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    fetchUserData();
    if (isAdmin) {
      fetchDocuments();
      getEventsOfUser();
    }
  }, [id, isAdmin]);

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get(`/user/${id}`);
      setUserData(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await axiosClient.get(`/user/getDocumentsOfUser/${id}`);
      setDocuments(response.data.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleViewDocument = (document) => {
    console.log('document:', document);
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
        setSelectedDocument({
            title: file.name,
            type: file.type,
            url: fileURL,
        });
    } catch (error) {
        console.error('Error viewing file:', error);
    }
  };

  const handleCloseDocument = () => {
    setSelectedDocument(null);
  };

  const getEventsOfUser = async () => {
    try {
      const response = await axiosClient.get(`/getEventsOfUser/${id}`);
      console.log('events of user:', response);
      setEventsOfUser(response.data);
    }
    catch (error) {
      console.error('Error getting events of user:', error);
    }
  };

  const setStatusAndIcon = (status) => {
    if (status === 'went') {
      return (
        <div className="flex items-center">
          <span className="material-icons text-green-500">Went</span>
        </div>
      );
    } else if (status === 'missed') {
      return (
        <div className="flex items-center">
          <span className="material-icons text-red-500">Missed</span>
        </div>
      );
    } else if (status === 'going') {
      return (
        <div className="flex items-center">
          <span className="material-icons text-green-300">Going</span>
        </div>
      );
    } else if (status === 'not_going') {
      return (
        <div className="flex items-center">
          <span className="material-icons text-red-300">Not going</span>
        </div>
      );
    }
  }

  return (
    <PageComponent>
      <div className={`flex flex-col ${isMobile ? 'items-center' : 'items-start'} bg-white rounded-lg shadow-2xl p-8 mb-8`}>
        {loading ? (
          <div className="flex justify-center items-center h-72 w-full">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center w-full">
            <IconButton onClick={goBack}>
              <ArrowBackIcon />
            </IconButton>
            <div className="flex flex-col items-center md:w-1/5 mb-8 md:mb-0">
              <Avatar
                alt={userData.first_name + " " + userData.last_name}
                src={userData.avatar_path ? userData.avatar_path : '/images/avatar.png'}
                sx={{ width: 156, height: 156 }}
              />
              <div className="mt-4 text-center md:text-left font-bold text-xl">
                {userData.first_name + " " + userData.last_name}
              </div>
              <div className="text-center md:text-left italic">
                {userData.category}
              </div>
            </div>
            <div className="flex flex-col md:ml-8 w-full md:w-4/5">
              <div className="py-2">
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>University:</strong> {userData.university}</p>
                <p><strong>Faculty:</strong> {userData.faculty}</p>
              </div>
              {isAdmin && (
                <>
                  <div className="border-y border-gray-900/10 py-2">
                    <p><strong>Neptun code:</strong> {userData.neptun_code}</p>
                    <p><strong>Start year:</strong> {userData.start_year}</p>
                    <p><strong>Current semester:</strong> {userData.current_semester}</p>
                    <p><strong>Educational format:</strong> {userData.educational_format}</p>
                    <p><strong>Level of education:</strong> {userData.level_of_education}</p>
                  </div>
                  <div className="pt-2">
                    <p><strong>Birth date:</strong> {userData.birth_date}</p>
                    <p><strong>Birth place:</strong> {userData.birth_place}</p>
                    <p><strong>Mother's name:</strong> {userData.mothers_name}</p>
                    <p><strong>Phone number:</strong> {userData.phone_number}</p>
                    <p><strong>Address:</strong> {userData.street_address} {userData.city} {userData.state} {userData.zip}</p>
                    <p><strong>Temporary address:</strong> {userData.temp_addr_street} {userData.temp_addr_city} {userData.temp_addr_state} {userData.temp_addr_zip}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {isAdmin && (
        <Card className="bg-white rounded-lg shadow-2xl p-2">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Documents uploaded by {userData.first_name} {userData.last_name}
            </Typography>
            {documents.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date Uploaded</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.last_modified}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewDocument(doc)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography>No documents uploaded</Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* list of what events user attended and missed */}
      {isAdmin && (
        <Card className="bg-white rounded-lg shadow-2xl p-2 mt-8">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Attendance
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventsOfUser.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{setStatusAndIcon(event.pivot.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {selectedDocument && (
        <FileViewerDialog
          document={selectedDocument}
          onClose={handleCloseDocument}
        />
      )}
    </PageComponent>
  );
};

export default MemberProfile;
