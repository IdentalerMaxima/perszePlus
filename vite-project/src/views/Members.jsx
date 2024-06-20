import PageComponent from "../components/PageComponent";
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const testMemberList = [
  { name: 'Test Elek', category: 'vezetőség' },
  { name: 'Test Elek 2', category: 'vezetőség' },
  { name: 'Test Elek 3', category: 'vezeőség' },
  { name: 'Test Elek 4', category: 'munkatárs' },
  { name: 'Test Elek 5', category: 'munkatárs' },
  { name: 'Test Elek 6', category: 'munkatárs' },
  { name: 'Test Elek 7', category: 'munkatárs' },
  { name: 'Test Elek 8', category: 'hallgató' },
  { name: 'Test Elek 9', category: 'hallgató' },
  { name: 'Test Elek 10', category: 'hallgató' },
  { name: 'Test Elek 11', category: 'hallgató' },
  { name: 'Test Elek 12', category: 'hallgató' },
  { name: 'Test Elek 13', category: 'hallgató' },
  { name: 'Test Elek 14', category: 'hallgató' },
  { name: 'Test Elek 15', category: 'hallgató' },
  { name: 'Test Elek 16', category: 'hallgató' },
  { name: 'Test Elek 17', category: 'hallgató' },
  { name: 'Test Elek 18', category: 'hallgató' },
  { name: 'Test Elek 19', category: 'hallgató' },
  { name: 'Test Elek 20', category: 'hallgató' },
  { name: 'Test Elek 21', category: 'hallgató' },
];

const getInitials = (name) => {
  const nameParts = name.split(' ');
  if (nameParts.length === 1) return nameParts[0][0];
  return nameParts[0][0] + nameParts[1][0];
};

export default function Members() {
  return (
    <PageComponent title={'Tagok'}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-2">Vezetőség</h2>
          <div className="flex flex-wrap -m-2">
            {testMemberList.map((member) => {
              if (member.category === 'vezetőség') {
                return (
                  <Card key={member.name} className="m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <CardContent>
                      <div className="flex flex-row items-center space-x-4">
                        <Avatar>{getInitials(member.name)}</Avatar>
                        <div className="flex flex-col">
                          <p>{member.name}</p>
                          <p className="text-sm text-gray-500">{member.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-2">Munkatársak</h2>
          <div className="flex flex-wrap -m-2">
            {testMemberList.map((member) => {
              if (member.category === 'munkatárs') {
                return (
                  <Card key={member.name} className="m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <CardContent>
                      <div className="flex flex-row items-center space-x-4">
                        <Avatar>{getInitials(member.name)}</Avatar>
                        <div className="flex flex-col">
                          <p>{member.name}</p>
                          <p className="text-sm text-gray-500">{member.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-2">Hallgatók</h2>
          <div className="flex flex-wrap -m-2">
            {testMemberList.map((member) => {
              if (member.category === 'hallgató') {
                return (
                  <Card key={member.name} className="m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <CardContent>
                      <div className="flex flex-row items-center space-x-4">
                        <Avatar>{getInitials(member.name)}</Avatar>
                        <div className="flex flex-col">
                          <p>{member.name}</p>
                          <p className="text-sm text-gray-500">{member.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
