import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from "../../axios";

const CourseData = ({ open, handleClose, fetchCourses }) => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        host: '',
        semester: '',
        recommended_year: '',
        dates: '',
        requirements: '',
    });

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile)); // Set the preview URL
        }
    };

    const triggerFileInput = () => {
        document.getElementById('file-input').click();
    };

    const handleDeleteImage = () => {
        setFile(null); // Clear the file from state
        setImagePreview(null); // Clear the preview
    };

    const handleSubmit = async () => {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('host', formData.host);
        formDataToSubmit.append('semester', formData.semester);
        formDataToSubmit.append('recommended_year', formData.recommended_year);
        formDataToSubmit.append('dates', formData.dates);
        formDataToSubmit.append('requirements', formData.requirements);

        if (file) {
            formDataToSubmit.append('image', file); // Append file directly
        }

        try {
            console.log('Form data to submit:', formDataToSubmit);
            const response = await axiosClient.post('/addCourse', formDataToSubmit, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            fetchCourses();
        } catch (error) {
            console.error('Error creating course:', error);
        }

        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} className="create-event-dialog">
            <DialogTitle>{editMode ? 'Edit event' : 'Add new course'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    multiline
                    rows={4}
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="host"
                    name="host"
                    label="Host"
                    type="text"
                    fullWidth
                    value={formData.host}
                    onChange={handleChange}
                />
                <div style={{ display: 'flex', gap: '16px' }}>
                    <TextField
                        margin="dense"
                        id="semester"
                        name="semester"
                        label="Semester"
                        type="text"
                        fullWidth
                        value={formData.semester}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="recommended_year"
                        name="recommended_year"
                        label="Recommended year"
                        type="text"
                        fullWidth
                        value={formData.recommended_year}
                        onChange={handleChange}
                    />
                </div>
                <TextField
                    margin="dense"
                    id="dates"
                    name="dates"
                    label="Dates"
                    type="text"
                    fullWidth
                    value={formData.dates}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="requirements"
                    name="requirements"
                    label="Requirements"
                    type="text"
                    fullWidth
                    value={formData.requirements}
                    onChange={handleChange}
                />

                {/* Image Upload Field */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <IconButton
                        color="primary"
                        component="span"
                        onClick={triggerFileInput}
                    >
                        <PhotoCameraIcon />
                    </IconButton>

                    {file && (
                        <IconButton
                            color="secondary"
                            onClick={handleDeleteImage}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>

                {imagePreview && (
                    <div style={{ marginTop: '16px' }}>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: '100%', maxHeight: '200px', objectFit: 'contain'}}
                        />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {editMode ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CourseData;
