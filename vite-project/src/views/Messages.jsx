import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import { Avatar, Box, Container, Grid, List, ListItemAvatar, ListItemText, ListItemButton } from "@mui/material";

export default function Messages() {

    const dummyMessages = [
        {
            id: '1',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name',
            message: 'adsfasdfasdfasdf'
        },
        {
            id: '2',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name',
            message: 'Content'
        },
        {
            id: '3',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam sit amet nisi'
        },
        {
            id: '4',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam sit amet nisi'
        },
        {
            id: '5',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam sit amet nisi'
        },
        {
            id: '6',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam sit amet nisi'
        },
        {
            id: '7',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam sit amet nisi'
        },
    ];

    const [messageLoaded, setMessageLoaded] = useState(dummyMessages[0]);

    const loadMessage = (message) => {
        console.log('Message ID:', message.id);
        setMessageLoaded(message);
    }

    return (
        <PageComponent title="Messages">
            <Box className="pt-1 bg-slate-100 rounded-md h-128 overflow-hidden">
                <Grid container spacing={3} className="h-full">
                    {/* List of messages */}
                    <Grid item xs={12} md={4} className="h-full">
                        <Box className="border-r-2 h-full overflow-y-auto">
                            <List>
                                {dummyMessages.map((message) => (
                                    <ListItemButton
                                        key={message.id}
                                        alignItems="flex-start"
                                        className="mb-1 border border-red-400"
                                        onClick={() => loadMessage(message)}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt={message.senderName} src={message.senderAvatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={message.senderName}
                                            secondary={
                                                <Box className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {message.message}
                                                </Box>
                                            }
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Box>
                    </Grid>

                    {/* Detailed Message */}
                    <Grid item xs={12} md={8} className="h-full">
                        <Container className="min-h-full p-4 flex flex-col justify-start">
                            {/* Sender details and title */}
                            <Box className='flex items-center space-x-4'>
                                <Avatar src={messageLoaded.senderAvatar} alt={messageLoaded.senderName}></Avatar>
                                <h3 className="text-2xl font-bold">{messageLoaded.senderName}</h3>
                            </Box>
                                
                            {/* Message content */} 
                            <Box className="mt-6 flex-grow overflow-y-auto">
                                <p>{messageLoaded.message}</p>
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        </PageComponent>
    );
}
