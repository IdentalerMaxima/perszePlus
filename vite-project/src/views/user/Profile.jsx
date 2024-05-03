import React, { useEffect, useState } from 'react';
import PageComponent from '../../components/PageComponent';
import Avatar from '@mui/material/Avatar';
import { MenuItem, CircularProgress } from '@mui/material';
import PersonalData from '../../components/forms/PersonalData';
import DocumentsData from '../../components/forms/DocumentsData';
import UniversityData from '../../components/forms/UniversityData';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';
import AvatarUpload from '../../components/upload/AvatarUpload';

const profileLayouts = [
  { name: 'Personal data', active: true },
  { name: 'University', active: false },
  { name: 'Documents', active: false },
];

export default function Profile() {
  const { currentUser, setCurrentUser } = useStateContext();
  const [activeContent, setActiveContent] = useState('Personal data');
  const [loading, setLoading] = useState(true);

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
      <div className="flex min-h-full">
        <div className="basis-1/4 mr-4 bg-white rounded-lg shadow-2xl" style={{ height: '27rem' }}>
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
                >
                </AvatarUpload>

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
        <div className="basis-3/4 p-4 bg-white rounded-lg shadow-2xl">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress />
            </div>
          ) : (
            <>
              {activeContent === 'Personal data' && <PersonalData currentUser={currentUser} />}
              {activeContent === 'University' && <UniversityData />}
              {activeContent === 'Documents' && <DocumentsData />}
            </>
          )}
        </div>
      </div>
    </PageComponent>
  );
}
