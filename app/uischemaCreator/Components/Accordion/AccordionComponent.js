import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import AccordionRenderer from "../../Renderers/AccordionRenderer.js";
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

export default function AccordionComponent({
  label,
  accordionContent,
  componentSchema,
  componentUischema,
}) {
  const getSchemaByLabel = (label, componentSchema, componentUischema) => {
    return {
      schema: componentSchema?.[label] || { type: "object", properties: {} },
      uischema: componentUischema?.[label] || { type: "VerticalLayout", elements: [] },
    };
  };

  const { schema, uischema } = getSchemaByLabel(label, componentSchema, componentUischema);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>{label}</Typography>
          {/* <Typography>Accordion</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          {accordionContent}
          {componentSchema && componentUischema && (
            <JsonForms
              schema={schema}
              uischema={uischema}
              renderers={customRenderers}
              cells={materialCells}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
