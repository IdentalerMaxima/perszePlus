import React from "react";
import { Grid, Card, CardContent, Typography, ButtonBase, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import PageComponent from "../components/PageComponent";

const Attendance = () => {
  return (
    <PageComponent title="Attendance">

      <Grid container spacing={3} className="flex justify-center ">

        <Grid item xs={12} sm={4} md={3} className="flex justify-center ">
          <Button
            component={Card}
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
              borderRadius: '8px',
            }}
            onClick={() => console.log("Esemenyre valo becsekkolas button clicked")}
          >

            <CardContent className="rounded-md flex flex-col items-center ">
              <Typography className="" variant="h6">
                Kozossegi
              </Typography>
              <HomeIcon
                style={{
                  marginTop: '16px',
                  width: '100px',
                  height: '100px',
                  color: '#1976d2',
                }}
              />
            </CardContent>
          </Button>
        </Grid>

        <Grid item xs={12} sm={4} md={3} className="flex justify-center">
          <Button
            component={Card}
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
              borderRadius: '8px',
            }}
            onClick={() => console.log("Esemenyre valo becsekkolas button clicked")}
          >

            <CardContent className="rounded-md flex flex-col items-center">
              <Typography className="" variant="h6">
                Esemeny
              </Typography>
              <EventIcon
                style={{
                  marginTop: '16px',
                  width: '100px',
                  height: '100px',
                  color: '#1976d2',
                }}
              />
            </CardContent>
          </Button>
        </Grid>
      </Grid>
    </PageComponent>
  );
};

export default Attendance;
