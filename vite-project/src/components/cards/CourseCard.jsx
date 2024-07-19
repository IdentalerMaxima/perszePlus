import React from 'react';
import { Card, CardActions, CardMedia, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './CourseCard.css'; 

const MAX_DESCRIPTION_LENGTH = 100;

const CourseCard = ({ course }) => {
    
    const truncateDescription = (description) => {
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
        }
        return description;
    };

    console.log('Course passed to card:', course);

    return (
        <Link to={`/courses/${course.id}`} className="card" state={{ course }}>
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                <CardMedia
                    component="img"
                    height="100"
                    image={course.image_path}
                    alt={course.name}
                />
                <CardContent style={{ flexGrow: 1 }}>
                    <h2>{course.name}</h2>
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
