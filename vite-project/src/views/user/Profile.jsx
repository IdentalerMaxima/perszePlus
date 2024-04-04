import React, { useState } from 'react';
import PageComponent from '../../components/PageComponent';
import Avatar from '@mui/material/Avatar';
import { MenuItem } from '@mui/material';
import PersonalData from '../../components/forms/PersonalData';
import DocumentsData from '../../components/forms/DocumentsData';
import UniversityData from '../../components/forms/UniversityData';
import FileUploadButton from '../../components/FileUploadButton';
import { useStateContext } from '../../contexts/ContextProvider';


const profileLayouts = [
  { name: 'Personal data', active: true },
  { name: 'University', active: false },
  { name: 'Documents', active: false },
];

export default function Profile() {
  const { currentUser, setCurrentUser } = useStateContext();
  const [activeContent, setActiveContent] = useState('Personal data');
  const [selectedFile, setSelectedFile] = useState(null);


  const handleClick = (layout) => {
    setActiveContent(layout.name);
    profileLayouts.forEach(item => {
      item.active = item.name === layout.name;
    });
  };


  return (
    <PageComponent title={'Profile'}>
      <div className="flex">
        <div className="basis-1/4 mr-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex justify-center mt-3">
            <Avatar
              alt={currentUser.name}
              src={currentUser.imageUrl || "../../src/assets/defaultAvatar.PNG"}
              sx={{ width: 156, height: 156 }}
            >
            </Avatar>
          </div>
          <div className="mt-3 flex justify-center">
            <FileUploadButton
              config={{
                  fileKey: 'avatar',
                  endpoint: '/upload/avatar',
                }}
              onSuccess={(data) => console.log("Avatar uploaded:", data)}
              onError={(error) => console.error("Error uploading avatar:", error)}
            />
          </div>
          <div className="mt-16 flex justify-center font-bold">{currentUser.name}</div>
          <div className="mt-16 flex justify-center font-bold">Erik</div>
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
        </div>
        <div className="basis-3/4 p-4 bg-gray-100 rounded-lg shadow-md">
          {/* Content for the second container */}
          {activeContent === 'Personal data' && <PersonalData />}
          {activeContent === 'University' && <UniversityData />}
          {activeContent === 'Documents' && <DocumentsData />}
        </div>
      </div>
    </PageComponent>
  );
}
