import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
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
import Divider from "@mui/material/Divider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwitchBtnRenderer from "./Renderers/SwitchBtnRenderer";
import MultiSelectDropdownRenderer from "./Renderers/MultiSelectDropdownRenderer";
import RatingsRenderer from "./Renderers/RatingsRenderer";
import InlineDatePickerRenderer from "./Renderers/InlineDatePickerRenderer";
import TimePickerRenderer from "./Renderers/TimePickerRenderer";
import TextAreaRenderer from "./Renderers/TextAreaRenderer";
import AccordionRenderer from "./Renderers/AccordionRenderer";
import CardRenderer from "./Renderers/CardRenderer";
import FileUploadRenderer from "./Renderers/FileUploadRenderer";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import AccordionWithJSON from './Components/AccordionWithJSON';
import AccordionComponent from './Components/Accordion/AccordionComponent';

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

const customRenderers = [
  ...materialRenderers,
  {
    tester: (uischema) => (uischema.options?.format === "switch" ? 5 : -1),
    renderer: SwitchBtnRenderer,
  },
  {
    tester: (uischema) =>
      uischema.options?.format === "multiselectdropdown" ? 5 : -1,
    renderer: MultiSelectDropdownRenderer,
  },
  {
    tester: (uischema) => (uischema.options?.format === "ratings" ? 5 : -1),
    renderer: RatingsRenderer,
  },
  {
    tester: (uischema) => (uischema.options?.format === "datePicker" ? 5 : -1),
    renderer: InlineDatePickerRenderer,
  },
  {
    tester: (uischema) => (uischema.options?.format === "timePicker" ? 5 : -1),
    renderer: TimePickerRenderer,
  },
  {
    tester: (uischema) => (uischema.options?.format === "textArea" ? 5 : -1),
    renderer: TextAreaRenderer,
  },
  {
    tester: (uischema) => (uischema.options?.format === "accordion" ? 5 : -1),
    renderer: AccordionRenderer,
  },
  {
    tester: (uischema) => (uischema.options?.format === "card" ? 5 : -1),
    renderer: CardRenderer,
  },
  {
    tester: (uischema) => (uischema.options?.format === "fileUpload" ? 5 : -1),
    renderer: FileUploadRenderer,
  },
];


const componentSchema = {
  type: "object",
  properties: {
    Name: {
      type: "string",
    },
  }
};

const componentUischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/Name",
    },
  ],
};

function App() {
  const [newField, setNewField] = useState({
    label: "",
    type: "",
    dataType: "",
    options: [],
  });
  const [fields, setFields] = useState([]);
  const [generatedSchema, setGeneratedSchema] = useState(null);
  const [generatedUiSchema, setGeneratedUiSchema] = useState(null);
  const [formData, setFormData] = useState({});
  const [option, setOption] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [schemaToShow, setSchemaToShow] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [childrenSwitch, setChildrenSwitch] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  useEffect(() => {
    if (fields.length > 0) {
      handleGenerateForm(fields);
    }
  }, [fields]);

  const handleAddOption = () => {
    if (option) {
      setNewField((prev) => ({
        ...prev,
        options: [...prev.options, option],
      }));
      setOption("");
    }
  };

  const handleAddField = () => {
    if (newField.label && newField.type) {
      if (childrenSwitch) {
        const lastField = fields[fields.length - 1];
        if (
          lastField &&
          (lastField.type === "card" || lastField.type === "accordion")
        ) {
          lastField.children = lastField.children || [];
          lastField.children.push(newField);
          setFields([...fields]);
          setIsSwitchEnabled(true);
        }
      } else {
        if (newField.type === "card" || newField.type === "accordion") {
          newField.children = [];
          setIsSwitchEnabled(true);
        }
        setFields((prevFields) => [...prevFields, newField]);
      }
      setNewField({
        label: "",
        type: "",
        dataType: "",
        options: [],
        content: "",
        layout: "vertical",
      });
    }
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
    const processField = (field, parentPath) => {
      const controlElement = {
        type: "Control",
        scope: `#/properties/${parentPath ? `${parentPath}/` : ""}${field.label}`,
      };
    
      if (field.type === "textfield") {
        schema.properties[field.label] = { type: field.dataType || "string" };
      } else if (field.type === "checkbox") {
        schema.properties[field.label] = { type: "boolean" };
      } else if (field.type === "dropdown") {
        schema.properties[field.label] = {
          type: field.dataType || "string",
          enum: field.options,
        };
      } else if (field.type === "radiobutton") {
        schema.properties[field.label] = {
          type: field.dataType || "string",
          enum: field.options,
        };
        controlElement.options = { format: "radio" };
      } else if (field.type === "switchbutton") {
        schema.properties[field.label] = { type: "boolean" };
        controlElement.options = { format: "switch" };
      } else if (field.type === "multiSelectDropdown") {
        schema.properties[field.label] = {
          type: "array",
          enum: field.options,
        };
        controlElement.options = { format: "multiselectdropdown" };
      } else if (field.type === "ratings") {
        schema.properties[field.label] = { type: "string" };
        controlElement.options = { format: "ratings" };
      } else if (field.type === "datePicker") {
        schema.properties[field.label] = { type: "string" };
        controlElement.options = { format: "datePicker" };
      } else if (field.type === "timePicker") {
        schema.properties[field.label] = { type: "string" };
        controlElement.options = { format: "timePicker" };
      } else if (field.type === "textArea") {
        schema.properties[field.label] = { type: "string" };
        controlElement.options = { format: "textArea" };
      } else if (field.type === "fileUpload") {
        schema.properties[field.label] = { type: "string" };
        controlElement.options = { format: "fileUpload" };
      } else if (field.type === "card" || field.type === "accordion") {
        schema.properties[field.label] = {
          type: "object",
          default: field.content,
          properties: {},
        };
        controlElement.options = { format: field.type };
        controlElement.label = field.label;
        controlElement.elements = [];
        field.children.forEach((child) => {
          controlElement.elements.push(processField(child, field.label));
        });
      }
    
      if (parentPath) {
        const parentProperty = parentPath.split('/')[0];
        if (!schema.properties[parentProperty].properties) {
          schema.properties[parentProperty].properties = {};
        }
        schema.properties[parentProperty].properties[field.label] = schema.properties[field.label];
        delete schema.properties[field.label];
        if (field.type === "card" || field.type === "accordion") {
          uiSchema.elements.forEach((element) => {
            if (element.scope === `#/properties/${parentProperty}`) {
              element.elements.push(controlElement);
            }
          });
        }
      } else {
        uiSchema.elements.push(controlElement);
      }
    
      return controlElement;
    };
    
    fields.forEach((field) => {
      processField(field);
    });

    setGeneratedSchema(schema);
    setGeneratedUiSchema(uiSchema);
    console.log("Schema --- ", JSON.stringify(schema, null, 2));
    console.log("UISchema --- ", JSON.stringify(uiSchema, null, 2));
  };

  const handleOpenDialog = (schemaType) => {
    setSchemaToShow(schemaType);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSchemaToShow("");
  };

  const handleCopyToClipboard = () => {
    const content =
      schemaToShow === "schema"
        ? JSON.stringify(generatedSchema, null, 2)
        : JSON.stringify(generatedUiSchema, null, 2);
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log("Content copied to clipboard");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleSwitch = (event) => {
    setChildrenSwitch(event.target.checked);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Form Builder</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleOpenDialog("schema")}
          >
            Schema
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleOpenDialog("uischema")}
          >
            UISchema
          </Button>
        </Box>
      </Box>
      <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
      <Grid
        container
        spacing={2}
        alignItems="start"
        sx={{ marginTop: 2, height: "100vh" }}
      >
        <Grid item xs={6}>
          {isSwitchEnabled && (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={childrenSwitch} onChange={toggleSwitch} />
                }
                label="Add Child"
              />
            </FormGroup>
          )}
          <TextField
            label="Label"
            value={newField.label}
            onChange={(e) =>
              setNewField((prev) => ({ ...prev, label: e.target.value }))
            }
            sx={{ marginBottom: "20px" }}
            fullWidth
          />
          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={newField.type}
              onChange={(e) =>
                setNewField((prev) => ({ ...prev, type: e.target.value }))
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
              placeholder="Enter content for your accordion"
              value={newField.content}
              onChange={(e) =>
                setNewField((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddField}
            sx={{ marginTop: "10px" }}
          >
            Generate Form
          </Button>
          {/* <AccordionWithJSON schema = {generatedSchema} uiSchema = {generatedUiSchema} /> */}
          <AccordionComponent />

        </Grid>
        <Grid item xs={6} sx={{ height: "100vh" }}>
          <Box sx={{ backgroundColor: "#D3D3D3", height: "100%", padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Generated Form Preview</Typography>
            </Box>

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
              <Box sx={{ backgroundColor: "#D3D3D3", height: "100%" }}>
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
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {schemaToShow === "schema" ? "Schema" : "UISchema"}
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
              : JSON.stringify(generatedUiSchema, null, 2)}
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