import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import SwitchBtnRenderer from "../../Renderers/SwitchBtnRenderer";
import MultiSelectDropdownRenderer from "../../Renderers/MultiSelectDropdownRenderer";
import RatingsRenderer from "../../Renderers/RatingsRenderer";
import InlineDatePickerRenderer from "../../Renderers/InlineDatePickerRenderer";
import TimePickerRenderer from "../../Renderers/TimePickerRenderer";
import TextAreaRenderer from "../../Renderers/TextAreaRenderer";
import CardRenderer from "../../Renderers/CardRenderer";
import FileUploadRenderer from "../../Renderers/FileUploadRenderer";
import ButtonRenderer from "../../Renderers/ButtonRenderer";
import TypographyRenderer from "../../Renderers/TypographyRenderer";
import ImageRenderer from "../../Renderers/ImageRenderer";
import AccordionRenderer from "../../Renderers/AccordionRenderer.js";


const customRenderers = [
  ...materialRenderers,
  {
    tester: (uischema) =>
      uischema.options?.format === "switch" ? 5 : -1,
    renderer: SwitchBtnRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "multiselectdropdown" ? 5 : -1,
    renderer: MultiSelectDropdownRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "ratings" ? 5 : -1,
    renderer: RatingsRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "datePicker" ? 5 : -1,
    renderer: InlineDatePickerRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "timePicker" ? 5 : -1,
    renderer: TimePickerRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "textArea" ? 5 : -1,
    renderer: TextAreaRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "accordion" ? 5 : -1,
    renderer: AccordionRenderer,
  },
  {
    tester: (uischema) => (uischema.options?.format === "card" ? 5 : -1),
    renderer: CardRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "fileUpload" ? 5 : -1,
    renderer: FileUploadRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "button" ? 5 : -1,
    renderer: ButtonRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "typography" ? 5 : -1,
    renderer: TypographyRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "image" ? 5 : -1,
    renderer: ImageRenderer,
  },
];



export default function CardComponent({label, cardContent, componentSchema, componentUischema}) {

  const getSchemaByLabel = (label, componentSchema, componentUischema) => {
    return {
      schema: componentSchema?.[label] || { type: "object", properties: {} },
      uischema: componentUischema?.[label] || { type: "VerticalLayout", elements: [] },
    };
  };
  
  const { schema, uischema } = getSchemaByLabel(label, componentSchema, componentUischema);
  
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 1 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardContent}
        </Typography>
        {componentSchema && componentUischema && (
            <JsonForms
              schema={schema}
              uischema={uischema}
              renderers={customRenderers}
              cells={materialCells}
            />
          )}
      </CardContent>
    </Card>
  );
}