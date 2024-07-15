import React from 'react';
import { Card, CardMedia, CardContent } from '@mui/material';

const Image = ({src, size, shape}) => {
  const rectangleLarge = {
    height: '200px',
    width: '300px'
  }
  const rectangleMedium = {
    height: '150px',
    width: '250px'
  }
  const rectangleSmall = {
    height: '100px',
    width: '200px'
  }
  const squareLarge = {
    height: '300px',
    width: '300px'
  }
  const squareMedium = {
    height: '200px',
    width: '200px'
  }
  const squareSmall = {
    height: '100px',
    width: '100px'
  }
  const roundSmall = {
      height: '100px',
      width: '100px',
      borderRadius: '50%'
  }
  const roundMedium = {
    height: '200px',
    width: '200px',
    borderRadius: '50%'
}
const roundLarge = {
  height: '300px',
  width: '300px',
  borderRadius: '50%'
}


const getCardMediaStyles = (shape, size) => {
  if (shape === 'round') {
    if (size === 'small') return roundSmall;
    if (size === 'medium') return roundMedium;
    if (size === 'large') return roundLarge;
  } else if (shape === 'rectangle') {
    if (size === 'small') return rectangleSmall;
    if (size === 'medium') return rectangleMedium;
    if (size === 'large') return rectangleLarge;
  } else if (shape === 'square') {
    if (size === 'small') return squareSmall;
    if (size === 'medium') return squareMedium;
    if (size === 'large') return squareLarge;
  }
  return {};
};

    return (
      <Card sx={{ maxWidth: 345 }}  style={{ all: 'unset' }}>
        <CardMedia  sx={getCardMediaStyles(shape, size)}
       
          component="img"
          image= {src}
          alt="Your image description"
        />
        </Card>
    )
}
export default Image;