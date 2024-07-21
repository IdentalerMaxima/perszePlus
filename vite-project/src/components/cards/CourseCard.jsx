import { useState, useEffect } from 'react';
import { Card, CardActions, CardMedia, CardContent, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import './CourseCard.css'; 
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';


const MAX_DESCRIPTION_LENGTH = 100;

const CourseCard = ({ course, onEdit, onDelete }) => {

    const { currentUser, isAdmin } = useStateContext();
    const [enrollClicked, setEnrollClicked] = useState(false);

    useEffect(() => {
        checkEnrollment();
    }, []);
    
    const truncateDescription = (description) => {
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
        }
        return description;
    };

    const checkEnrollment = async () => {
        try {
            const response = await axiosClient.get(`/checkEnrollment/${course.id}`, currentUser.id);
            console.log(response);
            if (response.data.isEnrolled === true) {
                setEnrollClicked(true);
            }
        }
        catch (error) {
            console.error('Error checking enrollment:', error);
        }
    };

    const handleEnroll = async () => {
        if (enrollClicked) {
            try {
                await axiosClient.post(`/unsubscribeFromCourse/${course.id}`, currentUser.id);
                setEnrollClicked(false);
            } catch (error) {
                console.error('Error unsubscribing from course:', error);
            }
        } else {
            try {
                await axiosClient.post(`/subscribeToCourse/${course.id}`, currentUser.id);
                setEnrollClicked(true);
            } catch (error) {
                console.error('Error subscribing to course:', error);
            }
        };
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
                        {isAdmin && (
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
                        )}
                    </div>
                    <p>{truncateDescription(course.description)}</p>
                </CardContent>
                <CardActions style={{ marginTop: 'auto' }}>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="secondary" 
                        onClick={ 
                            (e) => { e.preventDefault();
                            handleEnroll();
                        }}
                        style={
                            enrollClicked ? { backgroundColor: 'grey' } : { backgroundColor: 'green' }
                        }
                        >
                        {enrollClicked ? 'Leiratkozás' : 'Feliratkozás'}
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
};

export default CourseCard;
