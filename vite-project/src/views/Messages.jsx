// Messages.js
import React, { useEffect, useState } from "react";
import { useStateContext } from '../contexts/ContextProvider';
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
  MenuItem
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axiosClient from "../axios";

export default function Messages() {
  const { selectedMessageId } = useStateContext(); // Access the selected message ID from context
  const [messages, setMessages] = useState([]);
  const [messageLoaded, setMessageLoaded] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const messagesPerPage = 7;

  const getMessagesOfUser = async () => {
    try {
      const response = await axiosClient.get('/messages');
      const data = response.data;
      setMessages(data);

      const selectedMsg = data.find((msg) => msg.id === selectedMessageId);
      if (selectedMsg) {
        setMessageLoaded(selectedMsg);
      } else {
        setMessageLoaded(data[0]); // Default to first message if none is selected
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMessagesOfUser();
  }, [selectedMessageId]);

  const handleMenuClick = (event, message) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedMessage(message);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const deleteMessage = async () => {
    if (!selectedMessage) return;

    try {
      await axiosClient.delete(`/messages/${selectedMessage.id}`);
      setMessages(messages.filter(message => message.id !== selectedMessage.id));
      if (messageLoaded && messageLoaded.id === selectedMessage.id) {
        setMessageLoaded(messages[0]);
      }
    } catch (error) {
      console.error(error);
    }

    handleMenuClose();
  };

  const loadMessage = (message) => {
    setMessageLoaded(message);
  }

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  return (
    <PageComponent title="Messages">
      <Box className="pt-1 bg-slate-100 rounded-md overflow-hidden" sx={{ height: '64vh' }}>
        <Grid container spacing={3} className="h-full">
          {/* List of messages */}
          <Grid item xs={12} md={4}>
            <Box className="border-r-2 overflow-y-auto h-full flex flex-col">
              <List>
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
              {messageLoaded && (
                <>
                  <Box className="flex items-center space-x-4">
                    <Avatar src={messageLoaded.senderAvatar} alt={messageLoaded.senderName}></Avatar>
                    <h3 className="text-2xl font-bold">{messageLoaded.senderName}</h3>
                  </Box>
                  <Box className="mt-6 flex-grow overflow-y-auto">
                    <p>{messageLoaded.message}</p>
                  </Box>
                </>
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
    </PageComponent>
  );
}
