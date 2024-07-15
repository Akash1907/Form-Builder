import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import Image from "../Components/Image/Image";



const ImageRenderer = ({ uischema, schema, visible, path }) => {
  const label = schema.title || path;  
  const src = schema.default || "";
  const shape = schema.shape || '';
  const size = schema.size || '';
 console.log("Shape is -- ",shape);
 console.log("Size is -- ",size);


  return (
    <div>
      <Image src = {src} size = {size} shape = {shape} />
    </div>
  );
};

export default withJsonFormsControlProps(ImageRenderer);


// style={{ display: visible === false ? 'none' : 'block' }}