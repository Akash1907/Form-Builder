"use client"
import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import {
    Button,
    TextField,
    Typography,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Snackbar,
    Tooltip,
  } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwitchBtnRenderer from "../uischemaCreator/Renderers/SwitchBtnRenderer";
import MultiSelectDropdownRenderer from "../uischemaCreator/Renderers/MultiSelectDropdownRenderer";
import RatingsRenderer from "../uischemaCreator/Renderers/RatingsRenderer";
import InlineDatePickerRenderer from "../uischemaCreator/Renderers/InlineDatePickerRenderer";
import TimePickerRenderer from "../uischemaCreator/Renderers/TimePickerRenderer";
import TextAreaRenderer from "../uischemaCreator/Renderers/TextAreaRenderer";
import AccordionRenderer from "../uischemaCreator/Renderers/AccordionRenderer";
import CardRenderer from "../uischemaCreator/Renderers/CardRenderer";
import FileUploadRenderer from "../uischemaCreator/Renderers/FileUploadRenderer";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";


export default function FormPage() {

    const [formData, setFormData] = useState({});

    const customRenderers = [
        ...materialRenderers,
        {
          tester: (uischema:any) => (uischema.options?.format === "switch" ? 5 : -1),
          renderer: SwitchBtnRenderer,
        },
        {
          tester: (uischema:any) =>
            uischema.options?.format === "multiselectdropdown" ? 5 : -1,
          renderer: MultiSelectDropdownRenderer,
        },
        {
          tester: (uischema:any) => (uischema.options?.format === "ratings" ? 5 : -1),
          renderer: RatingsRenderer,
        },
        {
          tester: (uischema:any) => (uischema.options?.format === "datePicker" ? 5 : -1),
          renderer: InlineDatePickerRenderer,
        },
        {
          tester: (uischema:any) => (uischema.options?.format === "timePicker" ? 5 : -1),
          renderer: TimePickerRenderer,
        },
        {
          tester: (uischema:any) => (uischema.options?.format === "textArea" ? 5 : -1),
          renderer: TextAreaRenderer,
        },
        {
          tester: (uischema:any) => (uischema.options?.format === "accordion" ? 5 : -1),
          renderer: AccordionRenderer,
        },
        {
          tester: (uischema:any) => (uischema.options?.format === "card" ? 5 : -1),
          renderer: CardRenderer,
        },
        {
          tester: (uischema:any) => (uischema.options?.format === "fileUpload" ? 5 : -1),
          renderer: FileUploadRenderer,
        },
      ];

    const generatedSchema = {
        "type": "object",
        "properties": {
          "textfield": {
            "type": "string"
          },
          "checkbox": {
            "type": "boolean"
          },
          "card": {
            "type": "string",
            "default": "This is Card"
          },
          "Accordion": {
            "type": "string",
            "default": "This is accordion",
            "componentSchema": null,
            "componentUischema": null
          }
        }
      }
      
      const generatedUiSchema = {
        "type": "VerticalLayout",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/textfield"
          },
          {
            "type": "Control",
            "scope": "#/properties/checkbox"
          },
          {
            "type": "Control",
            "scope": "#/properties/card",
            "options": {
              "format": "card"
            }
          },
          {
            "type": "Control",
            "scope": "#/properties/Accordion",
            "options": {
              "format": "accordion"
            }
          }
        ]
      }

  return (
   <div>
    <Box sx={{ marginTop: 2 }}>
                <JsonForms
                  schema={generatedSchema}
                  uischema={generatedUiSchema}
                //   data={formData}
                  renderers={customRenderers}
                  cells={materialCells}
                //   onChange={({ data }) => setFormData(data)}
                />
              </Box>
   </div>
  );
}
