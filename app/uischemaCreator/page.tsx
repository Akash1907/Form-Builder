"use client";

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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ExpandMoreIcon,
  Switch,
} from "../Components/muiIcons/muiIcons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FormControlLabel, FormGroup } from "@mui/material";
import ArrayTab from "./arrayTab";
import SimpleForm from "./simpleForm";
import GroupTab from "./groupTab";
import VerticalTab from "./verticalTab";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";
import SwitchBtnRenderer from "./Renderers/SwitchBtnRenderer";
import MultiSelectDropdownRenderer from "./Renderers/MultiSelectDropdownRenderer";
import RatingsRenderer from "./Renderers/RatingsRenderer";
import InlineDatePickerRenderer from "./Renderers/InlineDatePickerRenderer";
import TimePickerRenderer from "./Renderers/TimePickerRenderer";
import TextAreaRenderer from "./Renderers/TextAreaRenderer";
import AccordionRenderer from "./Renderers/AccordionRenderer";
import CardRenderer from "./Renderers/CardRenderer";
import FileUploadRenderer from "./Renderers/FileUploadRenderer";
import ButtonRenderer from "./Renderers/ButtonRenderer";
import TypographyRenderer from "./Renderers/TypographyRenderer";
import ImageRenderer from "./Renderers/ImageRenderer";
import MicSwitchRenderer from "./Renderers/MicSwitchRenderer";
import VideoSwitchRenderer from "./Renderers/VideoSwitchRenderer";
import SpeakerSwitchRenderer from "./Renderers/SpeakerSwitchRenderer";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

interface Field {
  label: string;
  type: string;
  dataType: string;
  options: string[];
  content: string;
  layout: string;
}

interface ComponentField {
  label: string;
  type: string;
  dataType: string;
  options: string[];
  content: string;
  layout: string;
}

function App() {
  const customRenderers = [
    ...materialRenderers,
    {
      tester: (uischema: any) =>
        uischema.options?.format === "switch" ? 5 : -1,
      renderer: SwitchBtnRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "multiselectdropdown" ? 5 : -1,
      renderer: MultiSelectDropdownRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "ratings" ? 5 : -1,
      renderer: RatingsRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "datePicker" ? 5 : -1,
      renderer: InlineDatePickerRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "timePicker" ? 5 : -1,
      renderer: TimePickerRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "textArea" ? 5 : -1,
      renderer: TextAreaRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "accordion" ? 5 : -1,
      renderer: (props: any) => (
        <AccordionRenderer
          {...props}
          componentSchema={generatedComponentSchema || {}}
          componentUischema={generatedComponentUiSchema || {}}
        />
      ),
    },
    {
      tester: (uischema: any) => (uischema.options?.format === "card" ? 5 : -1),
      renderer: (props: any) => (
        <CardRenderer
          {...props}
          componentSchema={generatedComponentSchema || {}}
          componentUischema={generatedComponentUiSchema || {}}
        />
      ),
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "fileUpload" ? 5 : -1,
      renderer: FileUploadRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "button" ? 5 : -1,
      renderer: ButtonRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "typography" ? 5 : -1,
      renderer: TypographyRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "image" ? 5 : -1,
      renderer: ImageRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "micSwitch" ? 5 : -1,
      renderer: MicSwitchRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "videoSwitch" ? 5 : -1,
      renderer: VideoSwitchRenderer,
    },
    {
      tester: (uischema: any) =>
        uischema.options?.format === "speakerSwitch" ? 5 : -1,
      renderer: SpeakerSwitchRenderer,
    },
  ];

  const [newField, setNewField] = useState<Field>({
    label: "",
    type: "",
    dataType: "",
    options: [],
    content: "",
    layout: "vertical",
  });
  const [generatedComponentSchema, setGeneratedComponentSchema] = useState({});
  const [generatedComponentUiSchema, setGeneratedComponentUiSchema] = useState({});
  const [option, setOption] = useState("");
  const [childrenSwitch, setChildrenSwitch] = useState(false);
  const [componentFields, setComponentFields] = useState<ComponentField[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [generatedSchema, setGeneratedSchema] = useState<any>();
  const [generatedUiSchema, setGeneratedUiSchema] = useState<any>();
  const [formData, setFormData] = useState<any>({});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [schemaToShow, setSchemaToShow] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [parentLabel, setParentLabel] = useState<any>("");
  const [tempSchema, setTempSchema] = useState<any>({});
  const [tempUiSchema, setTempUiSchema] = useState<any>({});
  const [activeTab, setActiveTab] = useState(null);
  const [checkType, setCheckType] = useState(null);
  const handleSwitch = (tab: any) => {
    setActiveTab((prevTab) => (prevTab === tab ? null : tab));
  };

  useEffect(() => {
    if (childrenSwitch) {
      handleGenerateForm(componentFields);
    } else {
      handleGenerateForm(fields);
    }
    if(fields.length > 0){
      setParentLabel(fields[fields.length - 1].label);
      setCheckType(fields[fields.length - 1].type);
    }
  }, [componentFields, fields]);


  // useEffect(() => {
  //   if (childrenSwitch) {
  //     setParentLabel(fields[fields.length - 1].label);
  //   }
  // }, [childrenSwitch]);

  console.log("Parent Label ---- ", parentLabel);
  console.log("Parent type ----", checkType);


  const handleAddOption = () => {
    if (option) {
      setNewField((prev: any) => ({
        ...prev,
        options: [...prev.options, option],
      }));
      setOption("");
    }
  };

  const handleAddField = (event: any) => {
    if (!childrenSwitch) {
      setFields((prevFields) => [...prevFields, newField]);
      setNewField({
        label: "",
        type: "",
        dataType: "",
        options: [],
        content: "",
        layout: "vertical",
      });
    } else if (childrenSwitch) {
      setComponentFields((prevFields) => [...prevFields, newField]);
      setNewField({
        label: "",
        type: "",
        dataType: "",
        options: [],
        content: "",
        layout: "vertical",
      });
    }

    let updatedSchema: any = {
      type: "object",
      properties: {
        ...(generatedSchema?.properties || {}),
      },
      definitions: {},
    };

    let updatedUiSchema: any = {
      type: "VerticalLayout",
      elements: [...(generatedUiSchema?.elements || [])],
    };

    if (event.formid === "arrayTab") {
      updatedSchema.properties = {
        ...updatedSchema.properties,
        ...event.newSchema,
      };
      updatedUiSchema.elements = [
        ...updatedUiSchema.elements,
        ...Object.values(event.newUiSchema),
      ];
    } else if (event.formid === "groupTab") {
      updatedSchema.properties = {
        ...updatedSchema.properties,
        ...event.newSchema,
      };
      updatedSchema.definitions = {
        ...updatedSchema.definitions,
        ...event.definitions,
      };
      (updatedUiSchema.elements = {
        ...updatedUiSchema.elements,
        ...Object.values(event.newUiSchema.elements),
      }),
        (updatedUiSchema = {
          ...updatedUiSchema,
          elements: Object.values(updatedUiSchema.elements),
        });
    } else if (event.formid === "verticalTab") {
      updatedSchema.properties = {
        ...updatedSchema.properties,
        users: event.newSchema.properties.users,
      };
      updatedUiSchema = {
        ...updatedUiSchema.elements,
        ...event.newUiSchema,
      };
    } else if (event.formid === "simpleFrom") {
      updatedSchema.properties = {
        ...updatedSchema.properties,
        ...event.newSchema,
      };
      updatedUiSchema.elements = [
        ...updatedUiSchema.elements,
        ...Object.values(event.newUiSchema),
      ];
    }

    setGeneratedSchema(updatedSchema);
    setGeneratedUiSchema(updatedUiSchema);
  };

  const handleGenerateForm = (fields) => {
    const schema = {
      type: "object",
      properties: {},
    };
    const uiSchema = {
      type: "VerticalLayout",
      elements: [],
    };

    fields.forEach((field) => {
      const controlElement = {
        type: "Control",
        scope: `#/properties/${field.label}`,
      };

      switch (field.type) {
        case "textfield":
          schema.properties[field.label] = { type: field.dataType || "string" };
          break;
        case "checkbox":
          schema.properties[field.label] = { type: "boolean" };
          break;
        case "dropdown":
          schema.properties[field.label] = {
            type: field.dataType || "string",
            enum: field.options,
          };
          break;
        case "radiobutton":
          schema.properties[field.label] = {
            type: field.dataType || "string",
            enum: field.options,
          };
          controlElement.options = { format: "radio" };
          break;
        case "switchbutton":
          schema.properties[field.label] = { type: "boolean" };
          controlElement.options = { format: "switch" };
          break;
        case "multiSelectDropdown":
          schema.properties[field.label] = {
            type: "array",
            enum: field.options,
          };
          controlElement.options = { format: "multiselectdropdown" };
          break;
        case "ratings":
          schema.properties[field.label] = { type: "string" };
          controlElement.options = { format: "ratings" };
          break;
        case "datePicker":
          schema.properties[field.label] = { type: "string" };
          controlElement.options = { format: "datePicker" };
          break;
        case "timePicker":
          schema.properties[field.label] = { type: "string" };
          controlElement.options = { format: "timePicker" };
          break;
        case "textArea":
          schema.properties[field.label] = { type: "string" };
          controlElement.options = { format: "textArea" };
          break;
        case "accordion":
          schema.properties[field.label] = {
            type: "string",
            default: field.content,
          };
          controlElement.options = { format: "accordion" };
          break;
        case "fileUpload":
          schema.properties[field.label] = { type: "string" };
          controlElement.options = { format: "fileUpload" };
          break;
        case "card":
          schema.properties[field.label] = {
            type: "string",
            default: field.content,
          };
          controlElement.options = { format: "card" };
          break;
        case "button":
          schema.properties[field.label] = {
            type: "string",
            default: field.content,
          };
          controlElement.options = { format: "button" };
          break;
        case "typography":
          schema.properties[field.label] = {
            type: "string",
            default: field.content,
          };
          controlElement.options = { format: "typography" };
          break;
        case "image":
          schema.properties[field.label] = {
            type: "string",
            default: field.content,
            size: field.size,
            shape: field.shape,
          };
          controlElement.options = { format: "image" };
          break;
        case "micSwitch":
          schema.properties[field.label] = { type: "string" };
          controlElement.options = { format: "micSwitch" };
          break;
        case "videoSwitch":
          schema.properties[field.label] = { type: "string" };
          controlElement.options = { format: "videoSwitch" };
          break;
        case "speakerSwitch":
          schema.properties[field.label] = { type: "string" };
          controlElement.options = { format: "speakerSwitch" };
          break;
        default:
          break;
      }

      uiSchema.elements.push(controlElement);

      if (!childrenSwitch) {
        setGeneratedSchema((prevState) => {
          const newState = { ...prevState, ...schema };
          return newState;
        });

        setGeneratedUiSchema((prevState) => {
          const newState = { ...prevState, ...uiSchema };
          return newState;
        });
      }

      if (childrenSwitch) {
        setGeneratedComponentSchema((prevState) => ({
          ...prevState,
          [parentLabel]: {
            type: "object",
            properties: {
              ...schema.properties,
            },
          },
        }));

        setGeneratedComponentUiSchema((prevState) => ({
          ...prevState,
          [parentLabel]: {
            type: "VerticalLayout",
            elements: uiSchema.elements,
          },
        }));
      }
    });

    console.log("Schema --- ", JSON.stringify(generatedSchema, null, 2));
    console.log("UISchema --- ", JSON.stringify(generatedUiSchema, null, 2));
    console.log(
      "ComponentSchema --- ",
      JSON.stringify(generatedComponentSchema, null, 2)
    );
    console.log(
      "ComponentUISchema --- ",
      JSON.stringify(generatedComponentUiSchema, null, 2)
    );
  };

  const toggleSwitch = (event: any) => {
    setChildrenSwitch(event.target.checked);
    if (!event.target.checked) {
      setComponentFields([]);
    }
  };

  const receivedData = (data: any) => {
    handleAddField(data);
  };

  const handleOpenDialog = (schemaType: string) => {
    setSchemaToShow(schemaType);
    setDialogOpen(true);
  };

  const handleCloseDialog = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDialogOpen(false);
    setSchemaToShow("");
  };

  const handleCopyToClipboard = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const content =
      schemaToShow === "schema"
        ? JSON.stringify(generatedSchema, null, 2)
        : schemaToShow === "uischema"
        ? JSON.stringify(generatedUiSchema, null, 2)
        : JSON.stringify(HTMLElement, null, 2);

    navigator.clipboard
      .writeText(content)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleSnackbarClose = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setSnackbarOpen(false);
  };

  const HTMLElement = `<JsonForms schema={generatedSchema} uischema={generatedUiSchema} data={formData} renderers={materialRenderers} cells={materialCells} onChange={({ data }) => setFormData(data)}/>`;
  console.log("Parent Schemaa -----", generatedSchema);
  console.log("Parent UISchemaa -----", generatedUiSchema);
  console.log("Child Schema ----", generatedComponentSchema);
  console.log("Child UISchema ----", generatedComponentUiSchema);
  console.log("TempSchema before return------ ", tempSchema);
  return (
    <Box sx={{ marginTop: "10px" }}>
      <Grid container spacing={2} xs={12} alignItems="start">
        <Grid item xs={5}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Input Form</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={activeTab === "simple"}
                      onChange={() => handleSwitch("simple")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Simple Form"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={activeTab === "overview"}
                      onChange={() => handleSwitch("overview")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Over View Tab"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={activeTab === "groupTab"}
                      onChange={() => handleSwitch("groupTab")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Group Tab"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={activeTab === "verticalTab"}
                      onChange={() => handleSwitch("verticalTab")}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Vertical Tab"
                />
              </FormGroup>
              {activeTab === "overview" && <ArrayTab getData={receivedData} />}
              {activeTab === "simple" && <SimpleForm getData={receivedData} />}
              {activeTab === "groupTab" && <GroupTab getData={receivedData} />}
              {activeTab === "verticalTab" && (
                <VerticalTab getData={receivedData} />
              )}

               <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={childrenSwitch} onChange={toggleSwitch} disabled = {checkType !== 'accordion' && checkType !== 'card'} />
                  }
                  label="Add Child"/> 
              </FormGroup>
              <TextField
                label="Label"
                value={newField.label}
                onChange={(e) =>
                  setNewField((prev) => ({
                    ...prev,
                    label: e.target.value,
                  }))
                }
                sx={{ marginBottom: "20px" }}
                fullWidth
              />
              <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newField.type}
                  onChange={(e) =>
                    setNewField((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="textfield">Text Field</MenuItem>
                  <MenuItem value="textArea">Text Area</MenuItem>
                  <MenuItem value="checkbox">Checkbox</MenuItem>
                  <MenuItem value="dropdown">Dropdown</MenuItem>
                  <MenuItem value="accordion">Accordion</MenuItem>
                  <MenuItem value="card">Card</MenuItem>
                  <MenuItem value="radiobutton">Radio Button</MenuItem>
                  <MenuItem value="switchbutton">Switch Button</MenuItem>
                  <MenuItem value="multiSelectDropdown">
                    Multi-select Dropdown
                  </MenuItem>
                  <MenuItem value="ratings">Ratings</MenuItem>
                  <MenuItem value="datePicker">Date Picker</MenuItem>
                  <MenuItem value="timePicker">Time Picker</MenuItem>
                  <MenuItem value="fileUpload">File Upload</MenuItem>
                  <MenuItem value="button">Button</MenuItem>
                  <MenuItem value="typography">Typography</MenuItem>
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="micSwitch">Mic Switch</MenuItem>
                  <MenuItem value="videoSwitch">Video Switch</MenuItem>
                  <MenuItem value="speakerSwitch">Speaker Switch</MenuItem>
                </Select>
              </FormControl>
              {(newField.type === "textfield" ||
                newField.type === "dropdown" ||
                newField.type === "radiobutton" ||
                newField.type === "multiSelectDropdown") && (
                <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                  <InputLabel>Data Type</InputLabel>
                  <Select
                    value={newField.dataType}
                    onChange={(e) =>
                      setNewField((prev) => ({
                        ...prev,
                        dataType: e.target.value,
                      }))
                    }
                    name="dataType"
                  >
                    <MenuItem value="string">String</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="integer">Integer</MenuItem>
                  </Select>
                </FormControl>
              )}
              {(newField.type === "dropdown" ||
                newField.type === "radiobutton" ||
                newField.type === "multiSelectDropdown") &&
                newField.dataType && (
                  <Box>
                    <TextField
                      label="Option"
                      value={option}
                      onChange={(e) => setOption(e.target.value)}
                      sx={{ marginBottom: "10px" }}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleAddOption}
                    >
                      Add Option
                    </Button>
                    <Box sx={{ marginTop: "10px" }}>
                      {newField.options.map((opt, index) => (
                        <Typography key={index}>{opt}</Typography>
                      ))}
                    </Box>
                  </Box>
                )}
              {(newField.type === "accordion" || newField.type === "card") && (
                <Textarea
                  aria-label="minimum height"
                  minRows={5}
                  placeholder="Enter content of your element"
                  value={newField.content}
                  onChange={(e) =>
                    setNewField((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />
              )}
              {newField.type === "button" && (
                <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                  <InputLabel>Variant</InputLabel>
                  <Select
                    value={newField.content}
                    onChange={(e) =>
                      setNewField((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="contained">Contained</MenuItem>
                    <MenuItem value="outlined">Outlined</MenuItem>
                  </Select>
                </FormControl>
              )}
              {newField.type === "typography" && (
                <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                  <InputLabel>Select Size</InputLabel>
                  <Select
                    value={newField.content}
                    onChange={(e) =>
                      setNewField((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="h1">h1</MenuItem>
                    <MenuItem value="h2">h2</MenuItem>
                    <MenuItem value="h3">h3</MenuItem>
                    <MenuItem value="h4">h4</MenuItem>
                    <MenuItem value="h5">h5</MenuItem>
                    <MenuItem value="h6">h6</MenuItem>
                    <MenuItem value="body">body</MenuItem>
                  </Select>
                </FormControl>
              )}
              {newField.type === "image" && (
                <div>
                  <TextField
                    label="Enter URL"
                    value={newField.content}
                    onChange={(e) =>
                      setNewField((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    sx={{ marginBottom: "20px" }}
                    fullWidth
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                      <InputLabel>Select Shape</InputLabel>
                      <Select
                        value={newField.shape}
                        onChange={(e) =>
                          setNewField((prev) => ({
                            ...prev,
                            shape: e.target.value,
                          }))
                        }
                      >
                        <MenuItem value="round">Round</MenuItem>
                        <MenuItem value="square">Square</MenuItem>
                        <MenuItem value="rectangle">Rectangle</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                      <InputLabel>Select Size</InputLabel>
                      <Select
                        value={newField.size}
                        onChange={(e) =>
                          setNewField((prev) => ({
                            ...prev,
                            size: e.target.value,
                          }))
                        }
                      >
                        <MenuItem value="large">Large</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="small">Small</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddField}
                sx={{ marginTop: "10px" }}
              >
                Generate Form
              </Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={7} sx={{ height: "80vh" }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography>Form Preview</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleOpenDialog("schema")}
                    >
                      Copy Schema
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleOpenDialog("uischema")}
                    >
                      Copy UISchema
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleOpenDialog("HTMLElement")}
                    >
                      Copy HTML Element
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ backgroundColor: "#f0f0f0", padding: 2 }}>
                {generatedSchema && generatedUiSchema ? (
                  <Box sx={{ marginTop: 2 }}>
                    <JsonForms
                      schema={generatedSchema}
                      uischema={generatedUiSchema}
                      data={formData}
                      renderers={customRenderers}
                      cells={materialCells}
                      onChange={({ data }) => setFormData(data)}
                    />
                  </Box>
                ) : (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 3,
                      }}
                    >
                      <Typography sx={{ color: "#71797E" }}>
                        Start making forms to see the preview.
                      </Typography>
                    </Box>
                    <Box></Box>
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {schemaToShow === "schema"
            ? "Schema"
            : schemaToShow === "uischema"
            ? "UISchema"
            : "HTMLElement"}

          <Tooltip title="Copy">
            <IconButton
              aria-label="close"
              onClick={handleCopyToClipboard}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent>
          <pre>
            {schemaToShow === "schema"
              ? JSON.stringify(generatedSchema, null, 2)
              : schemaToShow === "uischema"
              ? JSON.stringify(generatedUiSchema, null, 2)
              : JSON.stringify(HTMLElement, null, 2)}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Copied"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Dialog>
    </Box>
  );
}

export default App;
