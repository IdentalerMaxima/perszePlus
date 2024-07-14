import React, { useState, useEffect } from 'react';
import PageComponent from "../components/PageComponent";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, Button, CircularProgress, IconButton, TextField, Box, Avatar, Divider } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import { Delete, Edit, ThumbUp, Comment } from '@mui/icons-material';
import axiosClient from '../axios';
import PostData from '../components/forms/PostData';

const dummyPosts = [
    {
        id: 1,
        content: "We are launching our new product next week!",
        image: "https://via.placeholder.com/150",
        author: "John Doe",
        createdAt: "2024-07-10",
        comments: [
            { user: "Bob Smith", comment: "Can't wait to see it!" },
            { user: "Jane Doe", comment: "This is amazing news!" }
        ],
        likes: 5
    },
    {
        id: 2,
        content: "We are hiring!",
        image: "https://via.placeholder.com/150",
        author: "Jane Doe",
        createdAt: "2024-07-12",
        comments: [
            { user: "John Doe", comment: "Great news!" },
            { user: "Bob Smith", comment: "I'm interested!" }
        ],
        likes: 3
    }
];

export default function Posts() {
    const { currentUser, isAdmin } = useStateContext();
    const [posts, setPosts] = useState(dummyPosts);
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [commentBoxVisible, setCommentBoxVisible] = useState({}); // Track visibility of comment box per post
    const [postLikes, setPostLikes] = useState(4); // Track likes per post
    const [postComments, setPostComments] = useState(4); // Track comments per post

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (post) => {
        setEditMode(true);
        setSelectedPost(post);
        setOpen(true);
    };

    const saveEditedPost = async (editedPost) => {
        try {
            await axiosClient.put(`/editPost/${editedPost.id}`, editedPost);
            fetchPosts();
            setSelectedPost(null);
            setEditMode(false);
            setOpen(false);
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    const fetchPosts = async () => {
        console.log('Fetching posts...');
        try {
            const response = await axiosClient.get('/getPosts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const deletePost = async (postId) => {
        try {
            await axiosClient.delete(`/deletePost/${postId}`);
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const toggleComment = (postId) => {
        if (!newComment) return;
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, { user: currentUser.name, comment: newComment }]
                };
            }
            return post;
        });
        setPosts(updatedPosts);
        setNewComment('');
        setCommentBoxVisible(prev => ({ ...prev, [postId]: false }));
    };

    const likePost = (postId) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: post.likes + 1
                };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    const toggleCommentBox = (postId) => {
        setCommentBoxVisible(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const submitPost = async () => {
        try {
            const response = await axiosClient.post('/addPost', {});
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <PageComponent title="Posts">
            <div className='create-event-dialog' style={{ margin: '0 auto' }}>
                <Box display="flex" justifyContent="center" width="100%">
                    <Card style={{ marginBottom: '16px', width: '100%' }}>
                        <CardContent style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                            <Avatar src={currentUser.avatar_path} style={{ marginRight: '8px', width: '32px', height: '32px' }} />
                            <TextField
                                label="What's on your mind?"
                                variant="outlined"
                                fullWidth
                                size="small"
                                style={{ marginRight: '8px' }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ padding: '6px 12px' }}
                                onClick={submitPost}
                            >
                                Post
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            </div>

            <InfiniteScroll
                dataLength={posts.length}
                loader={<CircularProgress />}
                endMessage={<p style={{ textAlign: 'center' }}><b>That's all folks!</b></p>}
            >
                {posts.map((post) => (
                    <Card key={post.id} style={{ marginBottom: '16px', position: 'relative' }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" marginBottom={'16px'}>
                                <Avatar src={currentUser.avatar_path} style={{ marginRight: '16px' }} />
                                <Typography color="text.secondary">
                                    {post.author} - {post.createdAt}
                                </Typography>
                            </Box>

                            <Typography variant="h6">
                                {post.content}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <IconButton onClick={() => likePost(post.id)}>
                                    <ThumbUp /> {postLikes}
                                </IconButton>
                                <IconButton onClick={() => toggleCommentBox(post.id)}>
                                    <Comment /> {postComments}
                                </IconButton>
                            </Box>

                            {commentBoxVisible[post.id] && (
                                <Box sx={{ display: 'flex', gap: '8px', marginTop: '', flexDirection: 'column',justifyItems: 'center' }}>
                                    <Divider style={{ margin: '16px 0' }} />
                                    {post.comments.map((comment, index) => (
                                        <Box key={index} display="flex" alignItems="flex-start" style={{ marginLeft: '16px' }}>
                                            <Avatar src={currentUser.avatar_path} style={{ marginRight: '8px', width: '32px', height: '32px' }} />
                                            <Box>
                                                <Typography variant="body2" fontWeight="bold">{comment.user}</Typography>
                                                <Typography variant="body2">{comment.comment}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            

                            <div className='create-event-dialog'>
                                {commentBoxVisible[post.id] && (
                                    <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                        <TextField
                                            label="Add a comment"
                                            variant="outlined"
                                            fullWidth
                                            value={newComment}
                                            size='small'
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                        <Button variant="contained" color="primary" onClick={() => toggleComment(post.id)}>
                                            Comment
                                        </Button>
                                    </Box>
                                )}
                            </div>
                            {isAdmin && (
                                <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                    <IconButton
                                        style={{ position: 'absolute', top: '2px', right: '40px' }}
                                        onClick={() => deletePost(post.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                    <IconButton
                                        style={{ position: 'absolute', top: '2px', right: '8px' }}
                                        onClick={() => handleEdit(post)}
                                    >
                                        <Edit />
                                    </IconButton>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </InfiniteScroll>

            <PostData
                open={open}
                handleClose={handleClose}
                fetchPosts={fetchPosts}
                editMode={editMode}
                post={selectedPost}
                saveEditedPost={saveEditedPost}
            />
        </PageComponent>
    );
}
