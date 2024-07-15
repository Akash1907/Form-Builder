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

interface Field {
  label: string;
  type: string;
  dataType?: string;
  options: string[];
  layout?: any;
}

function App() {
  const [newField, setNewField] = useState<Field>({
    label: "",
    type: "",
    dataType: "",
    options: [],
    layout: "VerticalLayout",
  });
  const [fields, setFields] = useState<Field[]>([]);
  const [generatedSchema, setGeneratedSchema] = useState<any>(null);
  const [generatedUiSchema, setGeneratedUiSchema] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [option, setOption] = useState<string>("");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [schemaToShow, setSchemaToShow] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [columnFields, setColumnFields] = useState<Field>({
    label: "",
    type: "",
    dataType: "",
    options: [],
    layout: "",
  });

  const [optionTab, setOptionTab] = useState<any>("");
  const [optionArray, setOptionArray] = useState<any>([]);
  const [schema, setSchema] = useState({
    definitions: {},
    type: "object",
    properties: {
      tablElement: {
        oneOf: [],
      },
    },
  });


  const [checkedTab, setCheckedTab] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const handleSwitchTab = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const newChecked = event.target.checked;
    setCheckedTab((prevCheckedTab) => {
      if (prevCheckedTab === true) {
        setChecked(false);
      } else {
        setChecked(newChecked);
      }
      return newChecked;
    });

    setSelectedValue("");
    setOptionArray([]);
    setOptionTab("");

    setSchema({
      definitions: {},
      type: "object",
      properties: {
        tablElement: {
          oneOf: [],
        },
      },
    });
    setFields([]);
    setNewField({
      label: "",
      type: "",
      dataType: "",
      options: [],
      layout: "VerticalLayout",
    });
  };

  const [checkedOverViewTab, setCheckedOverViewTab] = useState(false);
  const handleSwitchOverViewTab = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChecked = event.target.checked;
    setCheckedOverViewTab(newChecked);
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedValue(event.target.value);
  };

  const handleAddTab = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (optionTab) {
      setOptionArray((prevOptions: any) => [...prevOptions, optionTab]);
      setOptionTab("");

      setSchema((prevSchema) => {
        const newSchema: any = { ...prevSchema };

        if (!newSchema.definitions[optionTab]) {
          newSchema.properties.tablElement?.oneOf?.push({
            $ref: `#/definitions/${optionTab}`,
          });

          newSchema.definitions[optionTab] = {
            type: "object",
            title: optionTab,
            properties: {},
          };
        }

        return newSchema;
      });
    }
  };

  const uischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        label: "Basic Information",
        scope: "#/properties/tablElement",
      },
    ],
  };

  const handleAddOption = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (option) {
      setNewField((prev) => ({
        ...prev,
        options: [...prev.options, option],
      }));
      setOption("");
    }
  };

  const selectColumn = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setColumnFields((prevFields) => ({
      ...prevFields,
      layout: e.target.value,
    }));
  };

  const handleAddField = (event: any) => {
    debugger
    console.log(event)
    // event.preventDefault();
    // event.stopPropagation();
    if (newField.label && newField.type) {
      const updatedFields = [...fields, newField];
      setFields(updatedFields);

      if (checkedTab === true) {
        var updatedSchema: any = {
          definitions: {
            ...schema.definitions,
          },
          type: "object",
          properties: {
            ...generatedSchema?.properties,
            ...schema?.properties,
          },
        };
      } else {
        var updatedSchema: any = {
          type: "object",
          properties: {
            ...generatedSchema?.properties,
            ...event.newSchema?.properties
          },
        };
      }

      const newElements = uischema.elements.filter(
        (el) =>
          !generatedUiSchema?.elements?.some(
            (existingEl: any) =>
              JSON.stringify(existingEl) === JSON.stringify(el)
          )
      );

      if (checkedTab === true) {
        var updatedUiSchema = {
          type: "VerticalLayout",
          elements: [...(generatedUiSchema?.elements || []), ...newElements],
        };
      } else {
        var updatedUiSchema = {
          type: "VerticalLayout",
          elements: [...(generatedUiSchema?.elements || []), ...event.newUiSchema?.elements],
        };
      }

      const controlElement: any = {
        type: "Control",
        scope: `#/properties/${newField.label}`,
      };

      if (newField.type === "textfield") {
        debugger;
        if (selectedValue) {
          updatedSchema.definitions[selectedValue].properties[newField.label] =
            { type: newField.dataType || "string" };
        } else {
          updatedSchema.properties[newField.label] = {
            type: newField.dataType || "string",
          };
        }
      } else if (newField.type === "checkbox") {
        if (selectedValue) {
          updatedSchema.definitions[selectedValue].properties[newField.label] =
            { type: "boolean" };
        } else {
          updatedSchema.properties[newField.label] = { type: "boolean" };
        }
      } else if (
        newField.type === "dropdown" ||
        newField.type === "radiobutton"
      ) {
        updatedSchema.properties[newField.label] = {
          type: newField.dataType || "string",
          enum: newField.options,
        };
        if (newField.type === "radiobutton") {
          controlElement.options = { format: "radio" };
        }
      }

      const columnLayout = parseInt(columnFields.layout, 10);
      const column = localStorage.getItem("column");
      const pricolumnLayout = column ? JSON.parse(column) : columnLayout;
      const prevcolumn = parseInt(pricolumnLayout);
      let count = 0;

      if (newField.layout === "HorizontalLayout") {
        const lastElement =
          updatedUiSchema.elements[updatedUiSchema.elements.length - 1];
        if (
          lastElement &&
          lastElement.type === "HorizontalLayout" &&
          prevcolumn === columnLayout
        ) {
          count = lastElement.elements.length;
          if (count < columnLayout) {
            lastElement.elements.push(controlElement);
            count++;
          } else {
            updatedUiSchema.elements.push({
              type: "HorizontalLayout",
              elements: [controlElement],
            });
            count = 1;
          }
        } else {
          updatedUiSchema.elements.push({
            type: "HorizontalLayout",
            elements: [controlElement],
          });
          count = 1;
        }
      } else {
        if (!checkedTab) {
          updatedUiSchema.elements.push({
            type: "VerticalLayout",
            elements: [controlElement],
          });
        }
      }

      localStorage.setItem("column", JSON.stringify(columnFields.layout));

      setGeneratedSchema(updatedSchema);
      setGeneratedUiSchema(updatedUiSchema);
    
      setNewField({
        label: "",
        type: "",
        dataType: "",
        options: [],
        layout: "VerticalLayout",
      });

      
    }

    
  };

  
  useEffect(() => {
    
  }, [fields]);

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
  const receivedData = (data:any) =>{
    handleAddField(data)
    // setGeneratedSchema(data.newSchema);
    // setGeneratedUiSchema(data.newUiSchema);
  
    
  }

  const HTMLElement = `<JsonForms schema={generatedSchema} uischema={generatedUiSchema} data={formData} renderers={materialRenderers} cells={materialCells} onChange={({ data }) => setFormData(data)}/>`;

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
                      checked={checkedTab}
                      onChange={handleSwitchTab}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Tab"/>

                <FormControlLabel
                  control={
                    <Switch
                      checked={checkedOverViewTab}
                      onChange={handleSwitchOverViewTab}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Over View Tab"
                />
                {checkedOverViewTab && <ArrayTab getData={receivedData} />}
              </FormGroup>

              {checkedTab === true && (
                <Box>
                  <TextField
                    label="Option"
                    value={optionTab}
                    onChange={(e: any) => setOptionTab(e.target.value)}
                    sx={{ marginBottom: "10px" }}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddTab}
                  >
                    Add Tab
                  </Button>

                  {optionArray.length > 0 && (
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                      <InputLabel>Select</InputLabel>
                      <Select value={selectedValue} onChange={handleChange}>
                        {optionArray.map((opt: any, index: any) => (
                          <MenuItem key={index} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                        <MenuItem>None</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Box>
              )}

              <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                <InputLabel>Layout</InputLabel>
                <Select
                  value={newField.layout}
                  onChange={(e) =>
                    setNewField((prev) => ({ ...prev, layout: e.target.value }))
                  }
                >
                  <MenuItem value="VerticalLayout">Vertical</MenuItem>
                  <MenuItem value="HorizontalLayout">Horizontal</MenuItem>
                </Select>
              </FormControl>
              {newField.layout === "HorizontalLayout" && (
                <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                  <InputLabel>Column</InputLabel>
                  <Select value={columnFields.layout} onChange={selectColumn}>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                  </Select>
                </FormControl>
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
                  <MenuItem value="textfield">TextField</MenuItem>
                  <MenuItem value="checkbox">Checkbox</MenuItem>
                  <MenuItem value="dropdown">Dropdown</MenuItem>
                  <MenuItem value="radiobutton">RadioButton</MenuItem>
                </Select>
              </FormControl>

              {(newField.type === "textfield" ||
                newField.type === "dropdown" ||
                newField.type === "radiobutton") && (
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
                  >
                    <MenuItem value="string">String</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="integer">Integer</MenuItem>
                  </Select>
                </FormControl>
              )}
              {(newField.type === "dropdown" ||
                newField.type === "radiobutton") &&
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
                      renderers={materialRenderers}
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
