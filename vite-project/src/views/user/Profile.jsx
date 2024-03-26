import React, { useState } from 'react';
import PageComponent from '../../components/PageComponent';
import Avatar from '@mui/material/Avatar';
import { MenuItem } from '@mui/material';

const profileLayouts = [
  { name: 'Personal data', active: true },
  { name: 'University', active: false },
  { name: 'Documents', active: false },
];

export default function Dashboard() {
  const [activeContent, setActiveContent] = useState('Personal data');

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
              alt="Remy Sharp"
              src="..\..\src\assets\0.PNG"
              sx={{ width: 156, height: 156 }}
            />
          </div>
          <div className=" mt-3 flex justify-center">
            <button type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
          </div>
          <div className="mt-3 flex justify-center font-bold">Bako Erik</div>
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
          {activeContent === 'Personal data' && <div>Personal data content goes here</div>}
          {activeContent === 'University' && <div>University content goes here</div>}
          {activeContent === 'Documents' && <div>Documents content goes here</div>}
        </div>
      </div>
    </PageComponent>
  );
}
