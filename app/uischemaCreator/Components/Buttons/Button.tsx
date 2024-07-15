import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({label, buttonVariant}) {
  return (
    <div style = {{marginTop: 2, marginBottom: 2}}>
        <Button variant={buttonVariant}>{label}</Button>
    </div>
  );
}