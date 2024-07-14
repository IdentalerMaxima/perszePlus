import React, { useState, useEffect } from 'react';
import PageComponent from "../components/PageComponent";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, CardContent, Typography, Button, CircularProgress, IconButton, TextField, Box, Avatar, Divider } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import { Delete, Edit, ThumbUp, Comment } from '@mui/icons-material';
import axiosClient from '../axios';
import PostData from '../components/forms/PostData';
import CommentData from '../components/forms/CommentData';
import { use } from 'i18next';

export default function Posts() {
    const { currentUser } = useStateContext();
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const [openEditPost, setOpenEditPost] = useState(false);
    const [openEditComment, setOpenEditComment] = useState(false);

    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);

    const [showPostEditor, setShowPostEditor] = useState(false);
    const [showCommentEditor, setShowCommentEditor] = useState(false);

    const [newComment, setNewComment] = useState({});
    const [commentBoxVisible, setCommentBoxVisible] = useState({});
    const [postContent, setPostContent] = useState('');

    const [canEdit, setCanEdit] = useState(false);


    useEffect(() => {
        fetchPosts();
    }, []);

    //Post logic
    const fetchPosts = async () => {
        try {
            const response = await axiosClient.get('/getPosts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const submitPost = async () => {
        try {
            const response = await axiosClient.post('/addPost', {
                content: postContent,
                author_id: currentUser.id
            });
            setPostContent('');
            fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
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

    const editPost = (post) => {
        setShowPostEditor(true);
        setSelectedPost(post);
        setOpenEditPost(true);
    };


    const closeEditPost = () => {
        setOpenEditPost(false);
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

    const saveEditedPost = async (editedPost) => {
        try {
            await axiosClient.put(`/editPost/${editedPost.id}`, editedPost);
            fetchPosts();
            setSelectedPost(null);
            setShowPostEditor(false);
            setOpenEditPost(false);
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    //Comment logic
    const submitComment = async (postId) => {
        try {
            const response = await axiosClient.post('/addComment', {
                content: newComment[postId],
                post_id: postId,
                author_id: currentUser.id
            });
            setNewComment({ ...newComment, [postId]: '' });
            fetchPosts();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const editComment = (comment) => {
        setShowCommentEditor(true);
        setSelectedComment(comment);
        setOpenEditComment(true);
    };

    const saveEditedComment = async (editedComment) => {
        try {
            await axiosClient.put(`/editComment/${editedComment.id}`, editedComment);
            fetchPosts();
            setShowCommentEditor(false);
            setOpenEditComment(false);
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const closeEditComment = () => {
        setOpenEditComment(false);
    };

    const toggleCommentBox = (postId) => {
        setCommentBoxVisible(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const deleteComment = async (commentId) => {
        try {
            const response = await axiosClient.delete(`/deleteComment/${commentId}`);
            fetchPosts();
        }
        catch (error) {
            console.error('Error deleting comment:', error);
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
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
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
                                <Avatar src={post.author.avatar_path} style={{ marginRight: '16px' }} />
                                <Typography color="text.secondary">
                                    {`${post.author.first_name} ${post.author.last_name}`} - {post.date} {post.id}
                                </Typography>
                            </Box>

                            <Typography variant="h6" paddingBottom={'22px'}>
                                {post.content}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px', position: 'absolute', bottom: 4, left: 4 }}>
                                {/* <IconButton onClick={() => likePost(post.id)}>
                                    <ThumbUp /> {post.likes}
                                </IconButton> */}
                                <IconButton onClick={() => toggleCommentBox(post.id)}>
                                    <Comment /> {post.comments.length}
                                </IconButton>
                            </Box>

                            {commentBoxVisible[post.id] && (
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Divider style={{ margin: '16px 0' }} />
                                    {post.comments.map((comment) => (
                                        <Box key={comment.id} display="flex" alignItems="flex-start" style={{ marginLeft: '16px', width: '100%', position: 'relative' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <Avatar src={comment.avatar_path} style={{ marginRight: '8px', width: '32px', height: '32px' }} />
                                                <Box>
                                                    <Typography variant="body2" fontWeight="bold">{comment.user}</Typography>
                                                    <Typography
                                                        variant="body2"
                                                        paddingRight={'32px'}
                                                    >{comment.comment}</Typography>
                                                </Box>
                                            </Box>

                                            {currentUser && (currentUser.id === comment.author_id || currentUser.category == 'admin') && (
                                                <Box sx={{ position: 'absolute', top: 4, right: 8, display: 'flex', gap: '4px' }}>
                                                    <IconButton size="small" onClick={() => deleteComment(comment.id)} style={{ padding: 0 }}>
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small" onClick={() => editComment(comment)} style={{ padding: 0 }}>
                                                        <Edit fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            )}


                            <div className='create-event-dialog'>
                                {commentBoxVisible[post.id] && (
                                    <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px', paddingBottom: '22px' }}>
                                        <Avatar src={currentUser.avatar_path} style={{ marginRight: '8px' }} />
                                        <TextField
                                            label="Add a comment"
                                            variant="outlined"
                                            wordWrap="break-word"
                                            fullWidth
                                            value={newComment[post.id] || ''}
                                            size='small'
                                            onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                                        />
                                        <Button variant="contained" color="primary" onClick={() => submitComment(post.id)}>
                                            Comment
                                        </Button>
                                    </Box>
                                )}
                            </div>
                            {currentUser && (currentUser.id === post.author.id || currentUser.category == 'admin') && (
                                <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                    <IconButton
                                        style={{ position: 'absolute', top: '2px', right: '40px' }}
                                        onClick={() => deletePost(post.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                    <IconButton
                                        style={{ position: 'absolute', top: '2px', right: '8px' }}
                                        onClick={() => editPost(post)}
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
                open={openEditPost}
                handleClose={closeEditPost}
                editMode={showPostEditor}
                post={selectedPost}
                saveEditedPost={saveEditedPost}
            />

            <CommentData
                open={openEditComment}
                handleClose={closeEditComment}
                editMode={showCommentEditor}
                comment={selectedComment}
                saveEditedComment={saveEditedComment}
            />

        </PageComponent>
    );
}
