import React, { useEffect, useState } from 'react';
import PageComponent from '../../components/PageComponent';
import Avatar from '@mui/material/Avatar';
import { MenuItem, CircularProgress } from '@mui/material';
import PersonalData from '../../components/forms/PersonalData';
import DocumentsData from '../../components/forms/DocumentsData';
import UniversityData from '../../components/forms/UniversityData';
import FileUploadButton from '../../components/FileUploadButton';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

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
      console.log(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleClick = (layout) => {
    setActiveContent(layout.name);
    profileLayouts.forEach(item => {
      item.active = item.name === layout.name;
    });
  };

  const handleAvatarUpload = (avatarPath) => {
    setCurrentUser({ ...currentUser, avatar_path: avatarPath });
    console.log("Current user:", currentUser); 
  }

  // const StyledBadge = styled(Badge)(({ theme }) => ({
  //   '& .MuiBadge-badge': {
  //     backgroundColor: '#44b700',
  //     color: '#44b700',
  //     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  //     '&::after': {
  //       position: 'absolute',
  //       top: 0,
  //       left: 0,
  //       width: '100%',
  //       height: '100%',
  //       borderRadius: '50%',
  //       animation: 'ripple 1.2s infinite ease-in-out',
  //       border: '1px solid currentColor',
  //       content: '""',
  //     },
  //   },
  //   '@keyframes ripple': {
  //     '0%': {
  //       transform: 'scale(.8)',
  //       opacity: 1,
  //     },
  //     '100%': {
  //       transform: 'scale(2.4)',
  //       opacity: 0,
  //     },
  //   },
  // }));
  
  // const SmallAvatar = styled(Avatar)(({ theme }) => ({
  //   width: 22,
  //   height: 22,
  //   border: `2px solid ${theme.palette.background.paper}`,
  // }));


  return (
    <PageComponent title={'Profile'}>
      <div className="flex">
        <div className="basis-1/4 mr-4 bg-gray-100 rounded-lg shadow-md">
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
                {/* <Stack direction="row" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="string"
                  >
                    <Avatar
                    alt="Remy Sharp" 
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 156, height: 156 }} />
                  </StyledBadge>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    }
                  >
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  </Badge>
                </Stack> */}
              </div>
              <div className="mt-3 flex justify-center">
                <FileUploadButton
                  config={{
                    fileKey: 'avatar',
                    endpoint: '/upload/avatar',
                  }}
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
        <div className="basis-3/4 p-4 bg-gray-100 rounded-lg shadow-md">
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
