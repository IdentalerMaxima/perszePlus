import React from "react";
import { useParams } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import { Card, useMediaQuery } from "@mui/material";

const CourseDetails = ({ course }) => {
    const { id } = useParams();
    const isMobile = useMediaQuery('(max-width: 600px)');
    console.log('Course:', course);


    return (
        <PageComponent title={'Kurzus részletei'}>
            <Card>
                <h2>{course.name}</h2>
                <p>{course.description}</p>
            </Card>
        </PageComponent>
    );
}

export default CourseDetails;
