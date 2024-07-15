
import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import MultiSelectDropdown from '../Components/MultiSelectDropdown/MultiSelectDropdown';

const MultiSelectDropdownRenderer = ({ data, handleChange, path, uischema, schema, visible }) => {
  const label = schema.title || path;

  const onChange = (selectedItems) => {
    handleChange(path, selectedItems);
  };
  
  return (
    <div style={{ display: visible === false ? 'none' : 'block' }}>
      <MultiSelectDropdown
        label={label}
        selectedItems={data || []}
        onChange={onChange}
        options={schema.enum || []} // Assuming options are provided in the schema
        disabled={uischema.options?.readonly || schema.readOnly}
      />
    </div>
  );
};

export default withJsonFormsControlProps(MultiSelectDropdownRenderer);

