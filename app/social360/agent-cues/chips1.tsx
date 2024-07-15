'use client'
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickableChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={2}>
      <Chip label="Individual" onClick={handleClick} />
      <Chip label="Team"  onClick={handleClick} />
    </Stack>
  );
}