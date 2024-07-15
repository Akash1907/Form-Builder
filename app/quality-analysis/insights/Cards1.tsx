import React from 'react'


import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Typography
  } from '../../Components/muiIcons/muiIcons';

function Cards1() {
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
            Probing
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
            86%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Opening
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"  href='/quality-analysis/table' >View Calls</Button>
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
            14%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Closing
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"   href='/quality-analysis/table'>View Calls</Button>
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
            Purpose of call
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"  href='/quality-analysis/table'>View Calls</Button>
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
            12%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
           Ownership Issues 
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/quality-analysis/table'>View Calls</Button>
          <Button size="small" className='ml-20' href='/quality-analysis/trends'>View Trends</Button>
        </CardActions>
      </Card>

    </div>
  );
}

export default Cards1
