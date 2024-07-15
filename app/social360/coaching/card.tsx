import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



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
{/*third card*/}
    <Card sx={{ maxWidth: 250, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
        //  image="/bar_graph_02.png"
 />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
            100
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Escalations
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/table'>View Calls</Button>
          <Button size="small" className='ml-20' href='/trends'>View Trends</Button>
        </CardActions>
      </Card>
{/*fourth card*/}
      <Card sx={{ maxWidth: 250, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
        //  image="/bar_graph_02.png"
 />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
           10%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ZTP
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href='/table'>View Calls</Button>
          <Button size="small" className='ml-20' href='/trends'>View Trends</Button>
        </CardActions>
      </Card>

{/*fifth card*/}
      <Card sx={{ maxWidth: 450, maxHeight: 400 }} className='mt-10'>
        <CardMedia
          component="img"
          alt=""
          height="100"
        //  image="/bar_graph_02.png" 
/>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className='font-bold'>
            15%
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
           Sentiments 
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
