import React, { useEffect, useState } from 'react';
import PageComponent from '../../components/PageComponent';
import Avatar from '@mui/material/Avatar';
import { MenuItem, CircularProgress, useMediaQuery } from '@mui/material';
import PersonalData from '../../components/forms/PersonalData';
import DocumentsData from '../../components/forms/DocumentsData';
import UniversityData from '../../components/forms/UniversityData';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';
import AvatarUpload from '../../components/upload/AvatarUpload';
import Settings from '../../components/forms/Settings';

const profileLayouts = [
  { name: 'Personal data', active: true },
  { name: 'University', active: false },
  { name: 'Documents', active: false },
  { name : 'Settings', active: false }
];

export default function Profile() {
  const { currentUser, setCurrentUser } = useStateContext();
  const [activeContent, setActiveContent] = useState('Personal data');
  const [loading, setLoading] = useState(true);

  // Media query to check if the screen size is small (mobile view)
  const isMobile = useMediaQuery('(max-width: 600px)');

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get('/user/info');
      setCurrentUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    return () => {
      profileLayouts.forEach(item => {
        item.active = item.name === 'Personal data';
      });
      setActiveContent('Personal data');
    };
  }, []);

  const handleClick = (layout) => {
    setActiveContent(layout.name);
    profileLayouts.forEach(item => {
      item.active = item.name === layout.name;
    });
  };

  const handleAvatarUpload = (avatarPath) => {
    setCurrentUser({ ...currentUser, avatar_path: avatarPath });
  }

  return (
    <PageComponent title={'Profile'}>
      <div className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row'} min-h-full`}>
        <div
          className={`bg-white rounded-lg shadow-2xl ${isMobile ? 'w-full mb-4' : 'basis-1/4 mr-4'}`}
          style={{ height: isMobile ? 'auto' : '29rem' }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-72">
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className="flex justify-center mt-3">
                <Avatar
                  alt={currentUser.name}
                  src={currentUser.avatar_path || "../../src/assets/defaultAvatar.PNG"}
                  sx={{ width: 156, height: 156 }}
                />
              </div>
              <div className="mt-3 flex justify-center">
                <AvatarUpload
                  onSuccess={handleAvatarUpload}
                  onError={(error) => console.error("Error uploading avatar:", error)}
                />
              </div>
              <div className="mt-16 flex justify-center font-bold">{currentUser.first_name + " " + currentUser.last_name}</div>
              <div className="mt-3">
                {profileLayouts.map((layout) => (
                  <MenuItem
                    key={layout.name}
                    onClick={() => handleClick(layout)}
                    sx={{
                      ...(layout.active && { fontWeight: 'italic', backgroundColor: 'rgba(0, 0, 0, 0.04)' }),
                    }}
                  >
                    {layout.name}
                  </MenuItem>
                ))}
              </div>
            </>
          )}
        </div>
        <div className={`bg-white rounded-lg shadow-2xl ${isMobile ? 'w-full p-4' : 'basis-3/4 p-4'}`}>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress />
            </div>
          ) : (
            <>
              {activeContent === 'Personal data' && <PersonalData />}
              {activeContent === 'University' && <UniversityData />}
              {activeContent === 'Documents' && <DocumentsData />}
              {activeContent === 'Settings' && <Settings />}
            </>
          )}
        </div>
      </div>
    </PageComponent>
  );
}
