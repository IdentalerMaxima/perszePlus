import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import PageComponent from '../components/PageComponent';
import Avatar from '@mui/material/Avatar';
import { CircularProgress, useMediaQuery, Button, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const MemberProfile = () => {
  const { id } = useParams();
  const { currentUser } = useStateContext();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const { userIsAdmin } = useStateContext();
  const isAdmin = userIsAdmin(currentUser);

  // Media query to check if the screen size is small (mobile view)
  const isMobile = useMediaQuery('(max-width: 600px)');

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get(`/user/${id}`);
      setUserData(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageComponent>
      <div className={`flex flex-col ${isMobile ? 'items-center' : 'items-start'} bg-white rounded-lg shadow-2xl p-8`}>
        {loading ? (
          <div className="flex justify-center items-center h-72 w-full">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center w-full">
            <IconButton onClick={goBack} className="">
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
    </PageComponent>
  );
};

export default MemberProfile;
