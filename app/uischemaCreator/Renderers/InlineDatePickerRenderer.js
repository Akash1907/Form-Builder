import React, {useState, useEffect} from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import InlineDatePicker from '../Components/InlineDatePicker/InlineDatePicker';

const InlineDatePickerRenderer = ({ uischema, schema, path, data, handleChange }) => {

  const label = schema.title || path;   
  const [selectedDate, setSelectedDate] = useState(data || null);

  const onChange = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
    handleChange(path, newSelectedDate);
  };

  useEffect(() => {
    if (data !== selectedDate) {
      setSelectedDate(data);
    }
  }, [data]);

  return (
    <div>
      <InlineDatePicker
        label={label}
        selectedDate={selectedDate}
        onChange={onChange}
      />
    </div>
  );
};

export default withJsonFormsControlProps(InlineDatePickerRenderer);


