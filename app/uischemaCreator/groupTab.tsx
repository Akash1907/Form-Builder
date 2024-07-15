import React, { useState, lazy, Suspense } from "react";
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

interface Field {
  label: string;
  type: string;
  dataType?: string;
  options: string[];
  layout?: any;
}

const initialSchema = {
  definitions: {},
  type: "object",
  properties: {
    tablElement: {
      oneOf: [],
    },
  },
};

// const initialSchema = {
//   "definitions": {
//       "A": {
//           "type": "object",
//           "title": "A",
//           "properties": {}
//       },
//       "B": {
//           "type": "object",
//           "title": "B",
//           "properties": {}
//       }
//   },
//   "type": "object",
//   "properties": {
//       "tablElement": {
//           "oneOf": [
//               {
//                   "$ref": "#/definitions/A"
//               },
//               {
//                   "$ref": "#/definitions/B"
//               }
//           ]
//       }
//   }
// }


const initialUiSchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      label: "Basic Information",
      scope: "#/properties/tablElement",
    },
  ],
};

const GroupTab = (props: any) => {
  const [formData, setFormData] = useState<any>();
  const [optionTab, setOptionTab] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [optionArray, setOptionArray] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [newField, setNewField] = useState<Field>({
    label: "",
    type: "",
    dataType: "",
    options: [],
    layout: "VerticalLayout",
  });
  const [schema, setSchema] = useState<any>({});
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
       
    updateSchemaAndUiSchema(newField);
    setNewField({
      label: "",
      type: "",
      dataType: "",
      options: [],
      layout: "VerticalLayout",
    });
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedValue(event.target.value);
  };

  const handleAddTab = (event: any) => {
 

    event.preventDefault();
    event.stopPropagation();
    var count = 0;
    if(count == 0){
      setSchema(initialSchema);
      count++;
    }
    if (optionTab) {
      setOptionArray((prevOptions) => [...prevOptions, optionTab]);

      setSchema((prevSchema: any) => {
     
        const newSchema: any = { ...prevSchema };

        if (!newSchema.definitions[optionTab]) {
          newSchema.definitions[optionTab] = {
            type: "object",
            title: optionTab,
            properties: {},
          };
         
        }
        const tabRef = {
          $ref: `#/definitions/${optionTab}`,
        };
        if (!newSchema.properties.tablElement.oneOf.some((item: any) => item.$ref === tabRef.$ref)) {
          newSchema.properties.tablElement.oneOf.push(tabRef);
        }
      
        return newSchema;
      });

      setOptionTab("");
    }

    

   
  };



  const updateSchemaAndUiSchema = (field: Field) => {
    const newSchema: any = { ...schema };
    const newUISchema: any = { ...uischema };

    if (field.type === "textfield") {
      if (selectedValue) {
        newSchema.definitions[selectedValue].properties[field.label] = {
          type: field.dataType || "string",
        };
      } else {
        const lastTab = optionArray[optionArray.length - 1];
        newSchema.definitions[lastTab].properties[field.label] = {
          type: field.dataType || "string",
        };
      }
    } else if (field.type === "dropdown") {
      if (selectedValue) {
        newSchema.definitions[selectedValue].properties[field.label] = {
          type: field.dataType || "string",
          enum: field.options,
        };
      } else {
        const lastTab = optionArray[optionArray.length - 1];
        newSchema.definitions[lastTab].properties[field.label] = {
          type: field.dataType || "string",
          enum: field.options,
        };
      }
    } else if (field.type === "date") {
      if (selectedValue) {
        newSchema.definitions[selectedValue].properties[field.label] = {
          type: field.dataType || "string",
          format: "date",
        };
      } else {
        const lastTab = optionArray[optionArray.length - 1];
        newSchema.definitions[lastTab].properties[field.label] = {
          type: field.dataType || "string",
          format: "date",
        };
      }
    }

    setSchema(newSchema);
    setUiSchema(newUISchema);


  };

  const handleGenerateForm = () => {
    const data = {
      definitions: { ...schema.definitions },
      newSchema: { ...schema.properties },
      newUiSchema: { ...uischema },
      formid: "groupTab",
    };

    props.getData(data);
    setOptionTab("");
  };

  return (
    <div>
      <Box sx={{ marginTop: "10px" }}>
        <Grid container spacing={2} alignItems="start">
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
                  {optionArray.map((opt, index) => (
                    <MenuItem key={index} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                  <MenuItem value="">None</MenuItem>
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
          </Box>
        </Grid>
      </Box>
      <Card variant="outlined" sx={{ padding: "5px", marginTop: "10px" }}>
        <Typography>Preview</Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={formData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setFormData(data)}
          />
        </Suspense>
      </Card>
    </div>
  );
};

export default GroupTab;
