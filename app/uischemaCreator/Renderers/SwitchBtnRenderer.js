import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import SwitchBtn from '../Components/SwitchBtn/SwitchBtn';

const SwitchBtnRenderer = ({ data, handleChange, path, uischema, schema, visible }) => {
  const label = schema.title || path;

  const onChange = (checked) => {
    handleChange(path, checked);
  };

  return (
    <div style={{ display: visible === false ? 'none' : 'block' }}>
      <SwitchBtn
        label={label}
        checked={data || false}
        onChange={onChange}
        disabled={uischema.options?.readonly || schema.readOnly}
      />
    </div>
  );
};

export default withJsonFormsControlProps(SwitchBtnRenderer);
