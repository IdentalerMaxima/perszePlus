import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import {
    Avatar,
    Box,
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
    Button,
    Container
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import WriteMessage from "../components/forms/WriteMessage";
import { useMediaQuery, useTheme } from '@mui/material';

export default function Messages() {
    const { selectedMessageId, setSelectedMessageId, messages, setMessages } = useStateContext();
    const [messageLoaded, setMessageLoaded] = useState(selectedMessageId ? messages.find(msg => msg.id === selectedMessageId) : null);
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const messagesPerPage = 7;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (messages.length > 0 && !selectedMessageId && !isMobile) {
            setMessageLoaded(messages[0]);
            setSelectedMessageId(messages[0].id);
        } else if (selectedMessageId) {
            setMessageLoaded(messages.find(msg => msg.id === selectedMessageId));
        }
    }, [messages, selectedMessageId]);

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
            const newMessages = messages.filter(message => message.id !== selectedMessageId);
            setMessages(newMessages);
            if (messageLoaded?.id === selectedMessageId) {
                const newLoadedMessage = newMessages[0] ? newMessages[0] : null;
                setMessageLoaded(newLoadedMessage);
                setSelectedMessageId(newLoadedMessage ? newLoadedMessage.id : null);
            }
            if (!newMessages.length) {
                setSelectedMessageId(null);
            }
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
        console.log('loadMessage', message);
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
            await axiosClient.post('/messages', {
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
            <Box className="pt-1 bg-slate-100 rounded-md overflow-hidden" sx={{ height: { xs: 'auto', md: '700px' } }}>
                <Grid container spacing={2} className="h-full">
                    {/* List of messages */}
                    {(!selectedMessageId || !isMobile) && (
                        <Grid item xs={12} md={4} sx={{ height: { xs: 'auto', md: '100%' }, overflowY: 'auto' }}>
                            <Box className="border-r-2 flex flex-col">
                                <Box className="p-4">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                        onClick={handleNewMessageOpen}
                                        fullWidth
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
                    )}

                    {/* Detailed Message */}
                    {(selectedMessageId || isMobile) && (
                        <Grid item xs={12} md={8}>
                            <Container className="p-4 flex flex-col" sx={{ height: { xs: 'auto', md: '100%' }, overflowY: 'auto' }}>
                                {selectedMessageId && isMobile && (
                                    <Box>
                                        <Box className="flex items-center">
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedMessageId(null);
                                                    setMessageLoaded(null);
                                                }}
                                                sx={{ marginRight: 2 }}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                            {messageLoaded && (
                                                <Box className="flex items-center space-x-4">
                                                    <Avatar src={messageLoaded.senderAvatar} alt={messageLoaded.senderName} />
                                                    <h3 className="text-2xl font-bold">{messageLoaded.senderName}</h3>
                                                </Box>
                                            )}
                                        </Box>
                                        {messageLoaded && (
                                            <Container className="p-6">
                                                {messageLoaded.message}
                                            </Container>
                                        )}
                                    </Box>
                                )}
                                {messageLoaded && !isMobile && (
                                    <>
                                        <Box>
                                            <Box className="flex items-center">
                                                {messageLoaded && (
                                                    <Box className="flex items-center space-x-4">
                                                        <Avatar src={messageLoaded.senderAvatar} alt={messageLoaded.senderName} />
                                                        <h3 className="text-2xl font-bold">{messageLoaded.senderName}</h3>
                                                    </Box>
                                                )}
                                            </Box>
                                            <Container className="p-6">
                                                {messageLoaded.message}
                                            </Container>
                                        </Box>
                                    </>
                                )}
                            </Container>
                        </Grid>
                    )}
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
