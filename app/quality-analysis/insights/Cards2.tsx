import React from 'react';

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Typography
  } from '../../Components/muiIcons/muiIcons';


const Cards2 = () => {
  return (
    <div className="flex space-x-4">
{/*First card*/}
      <Card sx={{ maxWidth: 250, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
          image="/bar_graph_02.png" />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
            15%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">          
            Casual tone
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"  href='/quality-analysis/table'>View Calls</Button>
          <Button size="small" className='ml-20' href='/quality-analysis/trends'>View Trends</Button>
        </CardActions>
      </Card>
{/*second card*/}
      <Card sx={{ maxWidth: 250, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
          image="/bar_graph_02.png" />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
            10%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Closing message
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/quality-analysis/table'>View Calls</Button>
          <Button size="small" className='ml-20' href='/quality-analysis/trends'>View Trends</Button>
        </CardActions>
      </Card>
{/*third card*/}
    <Card sx={{ maxWidth: 250, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
          image="/bar_graph_02.png" />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
            15%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Agent empathy
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/quality-analysis/table'>View Calls</Button>
          <Button size="small" className='ml-20' href='/quality-analysis/trends'>View Trends</Button>
        </CardActions>
      </Card>
{/*fourth card*/}
      <Card sx={{ maxWidth: 250, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
          image="/bar_graph_02.png" />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
           15%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
           Apologies
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/quality-analysis/table'>View Calls</Button>
          <Button size="small" className='ml-20' href='/quality-analysis/trends'>View Trends</Button>
        </CardActions>
      </Card>

{/*fifth card*/}
      <Card sx={{ maxWidth: 250, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
          image="/bar_graph_02.png" />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
            14%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
           Call Backs 
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/quality-analysis/table'>View Calls</Button>
          <Button size="small" className='ml-20'  href='/quality-analysis/trends'>View Trends</Button>
        </CardActions>
      </Card>

    </div>
  );
}

export default Cards2
