import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
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
  Card,
} from "../Components/muiIcons/muiIcons";

const initialData = {
  name: "Max Power",
};

const initialUiSchema = {
  type: "VerticalLayout",
  elements: [],
};

interface Field {
  label: string;
  type: string;
  dataType?: string;
  options: string[];
  layout?: any;
}

const SimpleForm = (props: any) => {
  const [columnFields, setColumnFields] = useState<Field>({
    label: "",
    type: "",
    dataType: "",
    options: [],
    layout: "",
  });

  const [formData, setFormData] = useState<any>(initialData);
  const [optionTab, setOptionTab] = useState<any>("");
  const [option, setOption] = useState<string>("");
  const [newField, setNewField] = useState<Field>({
    label: "",
    type: "",
    dataType: "",
    options: [],
    layout: "VerticalLayout",
  });
  const [schema, setSchema] = useState<any>({
    type: "object",
    properties: {},
  });
  const [uischema, setUiSchema] = useState<any>(initialUiSchema);

  const handleAddOption = (event: any) => {
    event.preventDefault();
    if (option) {
      setNewField((prev) => ({
        ...prev,
        options: [...prev.options, option],
      }));
      setOption("");
    }
  };

  const handleAddField = () => {
    const newSchema = { ...schema };
    if (optionTab && !newSchema.properties[optionTab]) {
      newSchema.properties[optionTab] = {
        type: "array",
        items: {
          type: "object",
          properties: {},
        },
      };
      setSchema(newSchema);
    }

    updateSchemaAndUiSchema(newField);
    setNewField({
      label: "",
      type: "",
      dataType: "",
      options: [],
      layout: "VerticalLayout",
    });
  };

  const updateSchemaAndUiSchema = (field: Field) => {
    const newSchema: any = { ...schema };
    const newUiSchema: any = { ...uischema };

    const controlElement: any = {
      type: "Control",
      scope: `#/properties/${newField.label}`,
    };
    
    if (newField.type === "textfield") {
      newSchema.properties[newField.label] = {
        type: newField.dataType || "string",
      };
    } else if (newField.type === "checkbox") {
      newSchema.properties[newField.label] = { type: "boolean" };
    } else if (
      newField.type === "dropdown" ||
      newField.type === "radiobutton"
    ) {
      newSchema.properties[newField.label] = {
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
      const lastElement = newUiSchema.elements[newUiSchema.elements.length - 1];
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
          newUiSchema.elements.push({
            type: "HorizontalLayout",
            elements: [controlElement],
          });
          count = 1;
        }
      } else {
        newUiSchema.elements.push({
          type: "HorizontalLayout",
          elements: [controlElement],
        });
        count = 1;
      }
    } else {
      newUiSchema.elements.push({
        type: "VerticalLayout",
        elements: [controlElement],
      });
    }

    localStorage.setItem("column", JSON.stringify(columnFields.layout));
    setSchema(newSchema);
    setUiSchema(newUiSchema);

    setNewField({
      label: "",
      type: "",
      dataType: "",
      options: [],
      layout: "VerticalLayout",
    });
  };

  const selectColumn = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setColumnFields((prevFields) => ({
      ...prevFields,
      layout: e.target.value,
    }));
  };

  const handleGenerateForm = () => {
    let updateschema = schema.properties;
    let updateuischema = uischema.elements;
    
      const data = {
          newSchema: {...updateschema},
          newUiSchema:{...updateuischema},
          formid:'simpleFrom'
        }

   

    props.getData(data);
    setOptionTab("");
    setSchema({ type: "object", properties: {} });
    setUiSchema({ type: "VerticalLayout", elements: [] });
    setNewField({
      label: "",
      type: "",
      dataType: "",
      options: [],
      layout: "VerticalLayout",
    });
  };

  return (
    <div>
      <Box sx={{ marginTop: "10px" }}>
        <Grid container spacing={2} alignItems="start">
          <Grid item xs={12}>
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
              Add Form
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateForm}
              sx={{ marginTop: "10px" }}
            >
              Generate Form
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Card variant="outlined" sx={{ padding: "5px", marginTop: "10px" }}>
        <Typography>Preview</Typography>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={formData}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setFormData(data)}
        />
      </Card>
    </div>
  );
};

export default SimpleForm;
