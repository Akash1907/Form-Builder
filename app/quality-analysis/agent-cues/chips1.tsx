'use client'
import * as React from 'react';

import {
  Chip,
  Stack,
} from '../../Components/muiIcons/muiIcons';
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