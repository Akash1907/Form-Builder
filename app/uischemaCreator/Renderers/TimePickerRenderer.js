import React, { useState, useEffect } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import BasicTimePicker from '../Components/TimePicker/BasicTimePicker';

const TimePickerRenderer = ({ uischema, schema, path, data, handleChange }) => {

  const label = schema.title || path;
  const [selectedTime, setSelectedTime] = useState(data || null);

  const onChange = (newSelectedTime) => {
    setSelectedTime(newSelectedTime);
    handleChange(path, newSelectedTime);
  };

  useEffect(() => {
    if (data !== selectedTime) {
      setSelectedTime(data);
    }
  }, [data]);

  return (
    <div>
      <BasicTimePicker
        label={label}
        selectedTime={selectedTime}
        onChange={onChange}
      />
    </div>
  );
};

export default withJsonFormsControlProps(TimePickerRenderer);
