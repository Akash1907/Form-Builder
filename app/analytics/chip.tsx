// CustomChipRenderer.tsx
import React, { useState } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';

import {
  TextField, Chip, Box
  } from '../Components/muiIcons/muiIcons';
const CustomChipRenderer = ({ data = [], handleChange, path, schema }: any) => {
  const [inputValue, setInputValue] = useState('');

  const handleDelete = (chipToDelete: string) => () => {
    const newChips = (data || []).filter((chip: string) => chip !== chipToDelete);
    handleChange(path, newChips);
  };

  const handleAddChip = () => {
    if (inputValue && !data.includes(inputValue)) {
      handleChange(path, [...(data || []), inputValue]);
      setInputValue('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Box>
      <TextField
        label={schema.title}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleAddChip();
          }
        }}
        fullWidth
      />
      <Box mt={2}>
        {(data || []).map((chip: string, index: number) => (
          <Chip
            key={index}
            label={chip}
            onDelete={handleDelete(chip)}
            style={{ margin: '4px' }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default withJsonFormsControlProps(CustomChipRenderer);
