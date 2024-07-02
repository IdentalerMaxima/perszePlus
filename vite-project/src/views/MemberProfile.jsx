import React from 'react';
import { useParams } from 'react-router-dom';

const MemberProfile = () => {
  const { name } = useParams();

  // Fetch additional member details based on `name` parameter if necessary

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Showing profile for: {name}</p>
      {/* Render member details here */}
    </div>
  );
};

export default MemberProfile;
