import React from 'react';
import { Card, CardActions, CardMedia, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MAX_DESCRIPTION_LENGTH = 100; // Maximum characters for description

const CourseCard = ({ course }) => {
  // Function to truncate description if it exceeds maximum length
  const truncateDescription = (description) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
    }
    return description;
  };

  console.log('Course:', course);

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="140"
        image={course.image_path}
        alt={course.name}
      />
      <CardContent style={{ flexGrow: 1 }}>
        <h2>{course.name}</h2>
        <p>{truncateDescription(course.description)}</p>
      </CardContent>
      <CardActions style={{ marginTop: 'auto' }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          component={Link}
          to={`/courses/${course.id}`}
          course={course}
        >
          Details
        </Button>
        <Button fullWidth variant="contained" color="secondary">
          Enroll
        </Button>
        <Button fullWidth variant="contained" color="secondary">
          Unenroll
        </Button>
        <Button fullWidth variant="contained" color="secondary">
          Results
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
