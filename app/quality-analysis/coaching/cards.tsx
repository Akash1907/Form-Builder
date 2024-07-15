import * as React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardMedia,
  Typography
  } from '../../Components/muiIcons/muiIcons';


export default function ImgMediaCard() {

  return (
    <div className="flex space-x-4">
{/*First card*/}
      <Card sx={{ maxWidth: 250, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
        //  image="/bar_graph_02.png"
 />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
            13,000
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Total Calls
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/table'>View Calls</Button>
          <Button size="small" className='ml-20' href='/trends'>View Trends</Button>
        </CardActions>
      </Card>
{/*second card*/}
      <Card sx={{ maxWidth: 250, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
        //  image="/bar_graph_02.png" 
/>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
            250
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Hours analysed
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/table'>View Calls</Button>
          <Button size="small" className='ml-20' href='/trends'>View Trends</Button>
        </CardActions>
      </Card>
    </div>
  );
}