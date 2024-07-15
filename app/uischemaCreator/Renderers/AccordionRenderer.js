import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import AccordionComponent from "../Components/Accordion/AccordionComponent";

const AccordionRenderer = ({
  uischema,
  schema,
  path,
  componentSchema,
  componentUischema,
}) => {
  const label = schema.title || path;
  const accordionContent = schema.default || "";

  return (
    <div>
      <AccordionComponent
        label={label}
        accordionContent={accordionContent}
        componentSchema={componentSchema}
        componentUischema={componentUischema} />
    </div>
  );
};

export default withJsonFormsControlProps(AccordionRenderer);
