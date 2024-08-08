import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import {
    Avatar,
    Box,
    Container,
    Grid,
    List,
    ListItemAvatar,
    ListItemText,
    ListItemButton,
    IconButton,
    Pagination,
    Stack,
    Menu,
    MenuItem,
    Button
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import WriteMessage from "../components/forms/WriteMessage";

export default function Messages() {
    const { selectedMessageId, setSelectedMessageId } = useStateContext();
    const [messages, setMessages] = useState([]);
    const [messageLoaded, setMessageLoaded] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const messagesPerPage = 7;

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axiosClient.get('/messages');
                setMessages(response.data);

                if (!selectedMessageId && response.data.length > 0) {
                    const firstMessageId = response.data[0].id;
                    setSelectedMessageId(firstMessageId);
                    loadMessage(response.data[0]);
                } else if (selectedMessageId) {
                    const selected = response.data.find(message => message.id === selectedMessageId);
                    if (selected) {
                        loadMessage(selected);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        getMessages();
    }, [selectedMessageId, setSelectedMessageId]);

    const handleMenuClick = (event, message) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setSelectedMessageId(message.id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteMessage = async () => {
        if (!selectedMessageId) return;

        try {
            await axiosClient.delete(`/messages/${selectedMessageId}`);
            setMessages(messages.filter(message => message.id !== selectedMessageId));
            if (messageLoaded?.id === selectedMessageId) {
                const newLoadedMessage = messages[0] ? messages[0] : null;
                setMessageLoaded(newLoadedMessage);
                setSelectedMessageId(newLoadedMessage ? newLoadedMessage.id : null);
            }
            setSelectedMessageId(null);
        } catch (error) {
            console.error(error);
        }

        handleMenuClose();
    };

    const markMessageAsRead = async (messageId) => {
        try {
            await axiosClient.put(`/messages/${messageId}/read`);
            setMessages(messages.map(msg =>
                msg.id === messageId ? { ...msg, read: true } : msg
            ));
        } catch (error) {
            console.error(error);
        }
    };

    const loadMessage = (message) => {
        setMessageLoaded(message);
        setSelectedMessageId(message.id);
        if (!message.read) {
            markMessageAsRead(message.id);
        }
    };

    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
    const totalPages = Math.ceil(messages.length / messagesPerPage);

    const handleNewMessageOpen = () => {
        setOpenDialog(true);
    };

    const handleNewMessageClose = () => {
        setOpenDialog(false);
    };

    const handleSendMessage = async (recipientId) => {
        try {
            const response = await axiosClient.post('/messages', {
                message: newMessage,
                recipientId: recipientId,
            });
            
            setNewMessage("");
            setOpenDialog(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PageComponent title="Messages">
            <Box className="pt-1 bg-slate-100 rounded-md overflow-hidden" sx={{ height: '68vh' }}>
                <Grid container spacing={3} className="h-full">
                    {/* List of messages */}
                    <Grid item xs={12} md={4}>
                        <Box className="border-r-2 overflow-y-auto h-full flex flex-col">
                            <Box className="p-4">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleNewMessageOpen}
                                    className="w-full"
                                >
                                    Write Message
                                </Button>
                            </Box>
                            <List>
                                {currentMessages.map((message) => (
                                    <ListItemButton
                                        key={message.id}
                                        alignItems="flex-start"
                                        className={`mb-1 border ${message.read ? 'border-gray-400' : 'border-red-400'}`}
                                        onClick={() => loadMessage(message)}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt={message.senderName} src={message.senderAvatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={message.senderName}
                                            secondary={
                                                <Box className={`max-w-full overflow-hidden text-ellipsis whitespace-nowrap ${!message.read ? 'font-bold' : ''}`}>
                                                    {message.message}
                                                </Box>
                                            }
                                        />
                                        <IconButton
                                            edge="end"
                                            aria-label="more"
                                            onClick={(e) => handleMenuClick(e, message)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </ListItemButton>
                                ))}
                            </List>
                            <Stack direction="row" spacing={2} className="justify-center p-4 flex mt-auto">
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={(e, page) => setCurrentPage(page)}
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    {/* Detailed Message */}
                    <Grid item xs={12} md={8}>
                        <Container className="p-4 flex flex-col justify-start items-end">
                            {messageLoaded ? (
                                <>
                                    <Box className="flex items-center space-x-4">
                                        <Avatar src={messageLoaded.senderAvatar} alt={messageLoaded.senderName}></Avatar>
                                        <h3 className="text-2xl font-bold">{messageLoaded.senderName}</h3>
                                    </Box>
                                    <Box className="mt-6 flex-grow overflow-y-auto">
                                        <p>{messageLoaded.message}</p>
                                    </Box>
                                </>
                            ) : (
                                <Box className="mt-6 flex-grow overflow-y-auto">
                                    <p>No message selected</p>
                                </Box>
                            )}
                        </Container>
                    </Grid>
                </Grid>

                {/* Menu for delete option */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={deleteMessage}>Delete</MenuItem>
                </Menu>
            </Box>
            <WriteMessage
                open={openDialog}
                handleClose={handleNewMessageClose}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
            />
        </PageComponent>
    );
}
