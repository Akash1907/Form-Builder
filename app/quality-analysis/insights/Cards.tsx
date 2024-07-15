import * as React from 'react';

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Typography
  } from '../../Components/muiIcons/muiIcons';


export default function ImgMediaCard(props:any) {

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
            {props.data}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Total Calls
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/quality-analysis/table'>View Calls</Button>
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
            250
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Hours analysed
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
            100
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Escalations
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
           10%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ZTP
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
            15%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
           Sentiments 
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
