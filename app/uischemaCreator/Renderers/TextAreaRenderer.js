import React, { useState, useEffect } from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import TextArea from "../Components/TextArea/TextArea";

const TextAreaRenderer = ({ uischema, schema, path, data, handleChange }) => {
  const label = schema.title || path;
  const [enteredContent, setEnteredContent] = useState(data || '');

  const onChange = (content) => {
    setEnteredContent(content);
    handleChange(path, content);
  };

  useEffect(() => {
    if (data !== enteredContent) {
      setEnteredContent(data);
    }
  }, [data]);


  return (
    <div>
      <TextArea
        label= {label}
        enteredContent= {enteredContent}
        onChange= {onChange}>
      </TextArea>
    </div>
  );
};

export default withJsonFormsControlProps(TextAreaRenderer);
