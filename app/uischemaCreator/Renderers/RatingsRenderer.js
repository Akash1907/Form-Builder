import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import Ratings from '../Components/Ratings/Ratings';

const RatingsRenderer = ({ uischema, schema, visible, path }) => {
  const label = schema.title || path;   

  return (
    <div style={{ display: visible === false ? 'none' : 'block' }}>
      <Ratings
        label={label}
      />
    </div>
  );
};

export default withJsonFormsControlProps(RatingsRenderer);