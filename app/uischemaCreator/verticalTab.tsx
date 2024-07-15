import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '../Components/muiIcons/muiIcons';
const initialSchema = {
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "title": "Users",
        "properties": {
          "firstname": {
            "type": "string"
          },
          "lastname": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "age": {
            "type": "number",
            "minimum": 0
          }
        },
        "required": [
          "firstname"
        ]
      }
    }
  }
}

const initialUiSchema = {
  "type": "ListWithDetail",
  "scope": "#/properties/users",
  "options": {
    "detail": {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/firstname",
              "label": "First Name"
            },
            {
              "type": "Control",
              "scope": "#/properties/lastname",
              "label": "Last Name"
            }
          ]
        },
        {
          "type": "Control",
          "scope": "#/properties/age",
          "label": "Age"
        },
        {
          "type": "Control",
          "scope": "#/properties/email",
          "label": "Email"
        }
      ]
    }
  }
}

const initialform = {
  "users": [
    {
      "firstname": "Max",
      "lastname": "Mustermann",
      "age": 25,
      "email": "max@mustermann.com"
    },
    {
      "firstname": "John",
      "lastname": "Doe",
      "age": 35,
      "email": "john@doe.com"
    },
    {}
  ]
}
const VerticalTab = (props:any) => {
  const [formData, setFormData] = useState(initialform);
  const [schema, setSchema] = useState(initialSchema);
  const [uischema, setUischema] = useState(initialUiSchema);

  const handleAddField = () => {
    // Example of adding a new field dynamically
    const newSchema = { ...schema };
    // newSchema.properties.users.items.properties = { type: "string", format: "phone" };

    const newUischema = { ...uischema };
    newUischema.options.detail.elements.push({
      type: "Control",
      scope: "#/properties/phone",
      label: "Phone"
    });

    setSchema(newSchema);
    setUischema(newUischema);
  };
  const handleGenerateForm = ()=>{
    // let updateschema = schema.properties;
    // let updateuischema = uischema.elements;
    
    //   const data = {
    //       newSchema: {...updateschema},
    //       newUiSchema:{...updateuischema},
    //       formid:'simpleFrom'
    //     }

    const data = {
        newSchema: {...schema},
        newUiSchema:{...uischema},
        formid:'verticalTab'
      }
     
      props.getData(data)
      setFormData(initialform);
    setSchema(initialSchema);
    setUischema(initialUiSchema);
   
    }
  return (
    <div>
      <Box sx={{ marginTop: "10px" }}>
        <Grid container spacing={2} alignItems="start">
          <Grid item xs={12}>
            {/* <TextField
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
            </Button>&nbsp; */}
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

export default VerticalTab;
