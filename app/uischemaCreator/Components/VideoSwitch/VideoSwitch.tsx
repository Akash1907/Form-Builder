import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import VideocamOffRoundedIcon from '@mui/icons-material/VideocamOffRounded';

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
});

const VideoSwitchComponent = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        '& .icon': {
          display: 'none',
        },
        '& .icon-on': {
          display: 'block',
        },
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#001e3c' : '#fff',
    width: 32,
    height: 32,
    '& .icon-off': {
      display: 'block',
    },
    '& .icon-on': {
      display: 'none',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    boxSizing: 'border-box',
  },
}));

const VideoSwitch = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <VideoSwitchComponent
      checked={checked}
      onChange={handleChange}
      checkedIcon={
        <IconContainer>
          <VideocamRoundedIcon className="icon icon-on" />
        </IconContainer>
      }
      icon={
        <IconContainer>
          <VideocamOffRoundedIcon className="icon icon-off" />
        </IconContainer>
      }
      inputProps={{ 'aria-label': 'mic switch' }}
    />
  );
};

export default VideoSwitch;
