'use client';

import * as React from 'react';
import {useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


 
const card = (
    <React.Fragment>
      <CardContent >
        <Typography sx={{ fontSize: 16}} color="text.secondary" gutterBottom>
          <b>Call ID </b> 1234567890 | <b>Name</b>  Shiv Khera |<b>Date</b>  12 May 22 | <b>Time</b>  3:22 PM | <b>Duration</b>  6:03 min | <b>Occurrences</b> 10
        </Typography>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
               <b>Agent</b>  1 00:20 min
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              (10 more Occurrences found) <a>View call</a> 
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2"  style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '5px' }}>
          Thik hai sir mai Apki Kaise madad skta hun
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  
export default function OutlinedCard() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
  return (
    <Box sx={{ minWidth: 275, paddingTop:'30px' }}>
      <Card variant="outlined" style={{marginBottom:'10px' }}>{card}</Card>
      <Card variant="outlined" style={{marginBottom:'10px' }}>{card}</Card>
      <Card variant="outlined" style={{marginBottom:'10px' }}>{card}</Card>
    </Box>
    
  );
  
}