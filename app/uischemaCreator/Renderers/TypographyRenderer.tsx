import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import TypographyComponent from "../Components/Typography/Typography";



const TypographyRenderer = ({ uischema, schema, visible, path }) => {
  const label = schema.title || path;  
  const size = schema.default || "";
 

  return (
    <div style={{ display: visible === false ? 'none' : 'block' }}>
      <TypographyComponent label = {label} size = {size} />
    </div>
  );
};

export default withJsonFormsControlProps(TypographyRenderer);