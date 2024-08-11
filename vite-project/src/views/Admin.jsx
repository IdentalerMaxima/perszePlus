import React, { useEffect, useState } from 'react';
import PageComponent from '../components/PageComponent';
import { MenuItem, CircularProgress, useMediaQuery } from '@mui/material';
import AdminSettingsRegistration from './admin/AdminSettingsRegistration';
import Invite from './admin/Invite';


const profileLayouts = [
  { name: 'Registration', active: true },
  { name: 'Invite', active: false },
  { name: 'Documents', active: false },
  { name : 'Settings', active: false }
];

export default function Profile() {
  const [activeContent, setActiveContent] = useState('Registration');
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleClick = (layout) => {
    setActiveContent(layout.name);
    profileLayouts.forEach(item => {
      item.active = item.name === layout.name;
    });
  };


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
              {activeContent === 'Registration' && <AdminSettingsRegistration />}
              {activeContent === 'Invite' && <Invite />}
            </>
          )}
        </div>
      </div>
    </PageComponent>
  );
}
