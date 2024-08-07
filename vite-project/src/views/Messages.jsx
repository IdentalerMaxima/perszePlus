import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import { Avatar, Box, Container, Grid, List, ListItemAvatar, ListItemText, ListItemButton, Pagination, Stack } from "@mui/material";

export default function Messages() {

    const dummyMessages = [
        {
            id: '1',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 1',
            message: 'Message content 1'
        },
        {
            id: '2',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 2',
            message: 'Message content 2'
        },
        {
            id: '3',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 3',
            message: 'Message content 3'
        },
        {
            id: '4',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 4',
            message: 'Message content 4'
        },
        {
            id: '5',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 5',
            message: 'Message content 5'
        },
        {
            id: '6',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 6',
            message: 'Message content 6'
        },
        {
            id: '7',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 7',
            message: 'Message content 7'
        },
        {
            id: '8',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 8',
            message: 'Message content 8'
        },
        {
            id: '9',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 9',
            message: 'Message content 9'
        },
        {
            id: '10',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 10',
            message: 'Message content 10'
        },
        {
            id: '11',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 11',
            message: 'Message content 11'
        },
        {
            id: '12',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 12',
            message: 'Message content 12'
        },
        {
            id: '13',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 13',
            message: 'Message content 13'
        },
        {
            id: '14',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 14',
            message: 'Message content 14'
        },
        {
            id: '15',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 15',
            message: 'Message content 15'
        },
        {
            id: '16',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 16',
            message: 'Message content 16'
        },
        {
            id: '17',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 17',
            message: 'Message content 17'
        },
        {
            id: '18',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 18',
            message: 'Message content 18'
        },
        {
            id: '19',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 19',
            message: 'Message content 19'
        },
        {
            id: '20',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 20',
            message: 'Message content 20'
        },
        {
            id: '21',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 21',
            message: 'Message content 21'
        },
        {
            id: '22',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 22',
            message: 'Message content 22'
        },
        {
            id: '23',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 23',
            message: 'Message content 23'
        },
        {
            id: '24',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 24',
            message: 'Message content 24'
        },
        {
            id: '25',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 25',
            message: 'Message content 25'
        },
        {
            id: '26',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 26',
            message: 'Message content 26'
        },
        {
            id: '27',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 27',
            message: 'Message content 27'
        },
        {
            id: '28',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 28',
            message: 'Message content 28'
        },
        {
            id: '29',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 29',
            message: 'Message content 29'
        },
        {
            id: '30',
            senderAvatar: 'pathToAvatar',
            senderName: 'Test Name 30',
            message: 'Message content 30'
        }
    ];
    

    const [messageLoaded, setMessageLoaded] = useState(dummyMessages[0]);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 7;

    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = dummyMessages.slice(indexOfFirstMessage, indexOfLastMessage);

    const totalPages = Math.ceil(dummyMessages.length / messagesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }



    const loadMessage = (message) => {
        console.log('Message ID:', message.id);
        setMessageLoaded(message);
    }

    return (
        <PageComponent title="Messages">
            <Box className="pt-1 bg-slate-100 rounded-md overflow-hidden" sx={{ height: '64vh'}}>
                <Grid container spacing={3} className="h-full ">
                    {/* List of messages */}
                    <Grid item xs={12} md={4} className="">
                        <Box className="border-r-2 overflow-y-auto h-full flex flex-col">
                            <List className="">
                                {currentMessages.map((message) => (
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

                            {/* Pagination */}
                            <Stack direction="row" spacing={2} className="justify-center p-4 flex mt-auto">
                                <Pagination count={totalPages} page={currentPage} onChange={(e, page) => setCurrentPage(page)} />
                            </Stack>

                        </Box>
                    </Grid>

                    {/* Detailed Message */}
                <Grid item xs={12} md={8}>
                    <Container className="p-4 flex flex-col justify-start items-end">
                        {/* Sender details and title */}
                        <Box className="flex items-center space-x-4">
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
