import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import CardComponent from "../Components/Card/CardComponent";

const CardRenderer = ({ uischema, schema, path, componentSchema, componentUischema  }) => {
  const label = schema.title || path;
  const cardContent = schema.default || "";

  return (
    <div>
      <CardComponent
        label= {label}
        cardContent = {cardContent}
        componentSchema = {componentSchema}
        componentUischema = {componentUischema}
        >
      </CardComponent>
    </div>
  );
};

export default withJsonFormsControlProps(CardRenderer);