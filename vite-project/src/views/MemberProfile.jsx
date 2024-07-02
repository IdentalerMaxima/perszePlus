import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardCotent';
import CircularProgress from '@mui/material/CircularProgress';
import PageComponent from '../components/PageComponent'; // Adjust the import path based on your actual file structure
import axiosClient from '../axios';

export default function Members() {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMembers = async () => {
    console.log('Fetching members');
    try {
      const response = await axiosClient.get('/getMemberList');
      console.log(response.data); // Log the response data
      setMemberList(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <PageComponent title={'Tagok'}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {['vezetőség', 'munkatárs', 'hallgató'].map((category) => (
            <div key={category} className="flex flex-col">
              <h2 className="text-xl font-bold mb-2">{category === 'vezetőség' ? 'Vezetőség' : category === 'munkatárs' ? 'Munkatársak' : 'Hallgatók'}</h2>
              <div className="flex flex-wrap">
                {memberList.map((member) => {
                  if (member.category === category) {
                    return (
                      <Card key={member.first_name} className="m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5">
                        <a href={`/profile/${encodeURIComponent(member.first_name + " " + member.last_name)}`} className="block px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 hover:underline transition-all duration-300 ease-in-out">
                          <div className="flex items-center space-x-4">
                            <Avatar src={member.avatar_path} className="w-12 h-12 rounded-full" />
                            <div className="flex flex-col">
                              <span className="text-lg font-medium text-gray-800">{`${member.first_name} ${member.last_name}`}</span>
                              {/* <p className="text-sm text-gray-500">{member.university ? member.university : ""}</p>
                              <p className="text-sm text-gray-500">{member.faculty ? member.faculty : ""}</p> */}
                            </div>
                          </div>
                        </a>
                      </Card>
                    );
                  }
                  return null; // Return null for categories that don't match
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageComponent>
  );
}
