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

const ArrayTab = (props:any) => {
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
    const newSchema:any = { ...schema };
    const newUiSchema:any = { ...uischema };
debugger
    if (field.type === "textfield") {
      newSchema.properties[optionTab].items.properties[field.label] = {
        type: field.dataType,
      };
    } else if (field.type === "dropdown") {
      newSchema.properties[optionTab].items.properties[field.label] = {
        type: field.dataType,
        enum: field.options,
      };
    } else if (field.type === "date") {
      newSchema.properties[optionTab].items.properties[field.label] = {
        type: field.dataType,
        format: "date",
      };
    }

if(newUiSchema.elements.length <= 0 ){
  newUiSchema.elements.push({
    type: "Control",
    scope: `#/properties/${optionTab}`,
  });
}
  
    setSchema(newSchema);
    setUiSchema(newUiSchema);
   
  };
  const handleGenerateForm = ()=>{




let updateschema = schema.properties;
let updateuischema = uischema.elements;

  const data = {
      newSchema: {...updateschema},
      newUiSchema:{...updateuischema},
      formid:'arrayTab'
    }
   
    props.getData(data)
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
  }

  return (
    <div>
      <Box sx={{ marginTop: "10px" }}>
        <Grid container spacing={2} alignItems="start">
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={optionTab}
              onChange={(e: any) => setOptionTab(e.target.value)}
              sx={{ marginBottom: "10px" }}
              fullWidth
            />
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
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="dropdown">Dropdown</MenuItem>
              </Select>
            </FormControl>

            {(newField.type === "textfield" ||
              newField.type === "dropdown" ||
              newField.type === "date") && (
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
            {newField.type === "dropdown" && newField.dataType && (
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
            </Button>&nbsp;
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
      <Card variant="outlined" sx={{ padding: "5px", marginTop:"10px" }}>
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

export default ArrayTab;
