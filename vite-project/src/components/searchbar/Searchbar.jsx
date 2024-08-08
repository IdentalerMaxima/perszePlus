import React, { useState, useEffect, useRef } from 'react';
import { TextField, List, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress, IconButton, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axiosClient from "../../axios";

export default function SearchBar({ selectedRecipient, setSelectedRecipient }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(""); // State for the message input
    const debounceRef = useRef(null);

    useEffect(() => {
        // Clean up previous debounce timer
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (searchTerm) {
            setLoading(true);

            // Set a new debounce timer
            debounceRef.current = setTimeout(async () => {
                try {
                    const response = await axiosClient.get(`/users?search=${searchTerm}`);
                    setSearchResults(response.data.users || []);
                } catch (error) {
                    console.error(error);
                    setSearchResults([]);
                } finally {
                    setLoading(false);
                }
            }, 400); // Delay in milliseconds
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleSelectRecipient = (user) => {
        setSelectedRecipient(user);
        setSearchTerm("");
        setSearchResults([]);
    };

    const handleClearSelection = () => {
        setSelectedRecipient(null);
        setSearchTerm("");
        setSearchResults([]);
        setMessage(""); // Clear the message input when the selection is cleared
    };

    return (
        <div>
            {!selectedRecipient ? (
                <>
                    <TextField
                        label="Search Recipients"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='create-event-dialog'
                    />
                    {loading && searchTerm !== '' ? (
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <List className='max-h-60 overflow-y-auto'>
                            {searchResults.length === 0 && !loading && searchTerm !== '' ? (
                                <ListItem>
                                    <ListItemText primary="No results found" />
                                </ListItem>
                            ) : (
                                searchResults.map((user) => (
                                    <ListItem button key={user.id} onClick={() => handleSelectRecipient(user)}>
                                        <ListItemAvatar>
                                            <Avatar src={user.avatar_path} alt={user.first_name} />
                                        </ListItemAvatar>
                                        <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                                    </ListItem>
                                ))
                            )}
                        </List>
                    )}
                </>
            ) : (
                <Box>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={selectedRecipient.avatar_path} alt={selectedRecipient.first_name} />
                            </ListItemAvatar>
                            <ListItemText primary={`${selectedRecipient.first_name} ${selectedRecipient.last_name}`} />
                            <IconButton onClick={handleClearSelection}>
                                <ClearIcon />
                            </IconButton>
                        </ListItem>
                    </List>

                    
                </Box>
            )}
        </div>
    );
}
