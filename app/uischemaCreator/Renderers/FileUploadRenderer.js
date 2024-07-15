import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import FileUpload from "../Components/FileUpload/FileUpload";

const FileUploadRenderer = ({ uischema, schema, path  }) => {
  const label = schema.title || path;
  
  return (
    <div>
      <FileUpload label = {label} />
        
    </div>
  );
};

export default withJsonFormsControlProps(FileUploadRenderer);