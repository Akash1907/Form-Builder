import React, {useEffect, useState} from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicTimePicker({ label, selectedTime, onChange }) {
  const [time, setTime] = useState(selectedTime || null);

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    onChange(newTime);
  };

  useEffect(() => {
    setTime(selectedTime);
  }, [selectedTime]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker 
          label={label}
          value={time}
          onChange={handleTimeChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
