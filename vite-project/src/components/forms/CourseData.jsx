import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from "../../axios";

const CourseData = ({ open, handleClose, fetchCourses, mode, course }) => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        host: '',
        semester: '',
        recommended_year: '',
        dates: '',
        requirements: '',
    });

    useEffect(() => {
        if (mode === 'edit') {
            setFormData({
                name: course.name,
                description: course.description,
                host: course.host,
                semester: course.semester,
                recommended_year: course.recommended_year,
                dates: course.dates,
                requirements: course.requirements,
            });
            setImagePreview(course.image_path);
        } else {
            setFormData({
                name: '',
                description: '',
                host: '',
                semester: '',
                recommended_year: '',
                dates: '',
                requirements: '',
            });
            setImagePreview(null);
        }
    }, [mode, course]);
    
    const [errors, setErrors] = useState({});

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
        
    };

    const triggerFileInput = () => {
        document.getElementById('file-input').click();
    };

    const handleDeleteImage = () => {
        setFile(null); // Clear the file from state
        setImagePreview(null); // Clear the preview
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) {
            formErrors.name = "Name is required";
        }
        if (!formData.description) {
            formErrors.description = "Description is required";
        }
        if (!formData.host) {
            formErrors.host = "Host is required";
        }
        if (!formData.semester) {
            formErrors.semester = "Semester is required";
        }
        if (!formData.recommended_year) {
            formErrors.recommended_year = "Recommended year is required";
        }
        if (!formData.dates) {
            formErrors.dates = "Dates are required";
        }
        if (!formData.requirements) {
            formErrors.requirements = "Requirements are required";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('host', formData.host);
        formDataToSubmit.append('semester', formData.semester);
        formDataToSubmit.append('recommended_year', formData.recommended_year);
        formDataToSubmit.append('dates', formData.dates);
        formDataToSubmit.append('requirements', formData.requirements);

        if (file) {
            formDataToSubmit.append('image', file);
        }



        try {
            if (mode === 'edit') {
                await axiosClient.put(`/editCourse/${course.id}`, formData);
                await axiosClient.post(`/changeCourseImage/${course.id}`, formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            else {
                await axiosClient.post('/addCourse', formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            fetchCourses();
        } catch (error) {
            console.error('Error submitting course:', error);
        }
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} className="create-event-dialog">
            <DialogTitle>{ mode === 'edit' ? 'Edit event' : 'Add new course'}</DialogTitle>
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
                    required
                    error={!!errors.name}
                    helperText={errors.name}
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
                    required
                    error={!!errors.description}
                    helperText={errors.description}
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
                    required
                    error={!!errors.host}
                    helperText={errors.host}
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
                        required
                        error={!!errors.semester}
                        helperText={errors.semester}
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
                        required
                        error={!!errors.recommended_year}
                        helperText={errors.recommended_year}
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
                    required
                    error={!!errors.dates}
                    helperText={errors.dates}
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
                    required
                    error={!!errors.requirements}
                    helperText={errors.requirements}
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
                            style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
                        />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {mode === 'edit' ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CourseData;
