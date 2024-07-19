import React from 'react';
import { Card, CardActions, CardMedia, CardContent, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import './CourseCard.css'; 

const MAX_DESCRIPTION_LENGTH = 100;

const CourseCard = ({ course, onEdit, onDelete }) => {
    
    const truncateDescription = (description) => {
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
        }
        return description;
    };

    return (
        <Link to={`/courses/${course.id}`} className="card" state={{ course }}>
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: '400px'}}>
                <CardMedia
                    component="img"
                    height="100"
                    image={course.image_path}
                    alt={course.name}
                />
                <CardContent style={{ flexGrow: 1, position: 'relative' }}>
                    {/* Container for name and icons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>{course.name}</h2>
                        <div>
                            {/* Edit and Delete buttons */}
                            <IconButton color="primary" onClick={(e) => {
                                e.preventDefault();
                                onEdit(course);
                            }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={(e) => {
                                e.preventDefault();
                                onDelete(course.id);
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                    <p>{truncateDescription(course.description)}</p>
                </CardContent>
                <CardActions style={{ marginTop: 'auto' }}>
                    <Button fullWidth variant="contained" color="secondary">
                        Enroll
                    </Button>
                    <Button fullWidth variant="contained" color="secondary">
                        Results
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
};

export default CourseCard;
