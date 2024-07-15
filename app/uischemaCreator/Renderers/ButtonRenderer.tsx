import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import Button from "../Components/Buttons/Button";


const ButtonRenderer = ({ uischema, schema, visible, path }) => {
  const label = schema.title || path;  
  const buttonVariant = schema.default || "";
 

  return (
    <div style={{ display: visible === false ? 'none' : 'block' }}>
      <Button label = {label} buttonVariant = {buttonVariant} />
    </div>
  );
};

export default withJsonFormsControlProps(ButtonRenderer);