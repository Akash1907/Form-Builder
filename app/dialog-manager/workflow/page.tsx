"use client";
import { workflow } from "@/app/service/dialogmanager/service";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import {
  Box,
  ExpandMoreIcon,
  AccordionSummary,
  Typography,
  Container,
  Button,
  AccordionDetails,
  Accordion,
  DeleteOutlineIcon,
  Add,
  Card,
  TextField,
} from "../../Components/muiIcons/muiIcons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DynamicForms: React.FC = () => {
  const initialSchema = {
    type: "object",
    properties: {
      type: { type: "string" },
      parent: { type: "string" },
      input: { type: "array", items: { type: "string", enum: ["NONE"] } },
      output: { type: "array", items: { type: "string" } },
      next: { type: "string", enum: ["NONE"] },
    },
    required: ["next", "input", "output", "parent"],
  };

  const uischema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/type" },
      { type: "Control", scope: "#/properties/parent" },
      {
        type: "HorizontalLayout",
        elements: [
          { type: "Control", scope: "#/properties/input" },
          { type: "Control", scope: "#/properties/output" },
        ],
      },
      {
        type: "Control",
        scope: "#/properties/next",
      },
    ],
  };

  const startschema = {
    type: "object",
    properties: {
      type: { type: "string", default: "Start" },
      next: { type: "string", enum: ["None"] },
      output: { type: "array", items: { type: "string" } },
      parent: { type: "string", default: "null" },
    },
  };

  const startuischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/type",
        options: { readOnly: true },
      },
      { type: "Control", scope: "#/properties/next" },
      { type: "Control", scope: "#/properties/output" },
      { type: "Control", scope: "#/properties/parent" },
    ],
  };


  const endschema = {
    type: "object",
    properties: {
      type: { type: "string", default: "End" },
      parent: { type: "string" },
    },
  };

  const enduischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/type",
        options: { readOnly: true },
      },
      {
        type: "Control",
        scope: "#/properties/parent",
        options: { readOnly: true },
      },
    ],
  };

  const startinitialData = {
    id: "Start",
    type: "Start",
    next: [],
    packet: "pack",
    input: "None",
    output: [],
    parent: "None",
    url: "",
  };

  const initialData = {
    id: "Outlook_Odb",
    type: "",
    parent: "Start",
    packet: "pack",
    input: [],
    output: [],
    next: "",
  };
  const endinitialData = {
    id: "End",
    type: "End",
    parent: "",
    packet: "pack",
  };


  const updateschema = {
    type: "object",
    properties: {
      existingworkflow: {
         type: "string",
        enum: ["None"] 
      },
    
    },
  };
  

  const updateuischema = {
    type: "VerticalLayout",
    elements: [
      { 
        type: "Control",
        scope: "#/properties/existingworkflow",
        label: "Update Workflow"
       },
        
  
    ],
  };

  const updateFormData = {
    type: "",
    next: "",
  }

  const [formDataArray, setFormDataArray] = useState([initialData]);
  const [schemaArray, setSchemaArray] = useState([initialSchema]);

  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [workflowData, setWorkflowData] = useState<{ [key: string]: any }>({});

  const [startformData, setStartFormData] = useState<any>(startinitialData);
  const [startschemaArray, setStartSchema] = useState<any>(startschema);

  const [endchemaArray, setendSchema] = useState<any>(endschema);
  const [endformData, setEndFormData] = useState<any>(endinitialData);
  const [workflowName, setWorkflowName] = useState("");

  const [UpdateSchema, setUpdateSchema] = useState(updateschema);
  const [UpdateUiSchema, setUpdateUiSchema] = useState(updateuischema);
  const [UpdateFormData, setUpdateFormData] = useState(updateFormData);

  const handleChange = (event: any) => {
    setWorkflowName(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://dev.assisto.tech/diaflow/get_workflow_info")
      .then((response) => {
        const data = response.data;
        const keys = Object.keys(data);
        setDropdownOptions(keys);
        setWorkflowData(data);

        // Update the startschema's next property enum
        const updatedStartSchema = {
          ...startschema,
          properties: {
            ...startschema.properties,
            next: {
              ...startschema.properties.next,
              enum: keys,
            },
          },
        };
        setStartSchema(updatedStartSchema);

        const updatedinitialSchema = {
          ...initialSchema,
          properties: {
            ...initialSchema.properties,
            next: {
              ...initialSchema.properties.next,
              enum: keys,
            },
          },
        };
        setSchemaArray([updatedinitialSchema]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
 const UpdateFormhandlechange =(event:any)=>{

  }
  const starthandlechange = (event: any) => {
    setStartFormData(event);

    const updatedFormDataArray = formDataArray.map((formData, index) => {
      if (index === 0) {
        return {
          ...formData,
          type: event.next,
        };
      }
      return formData;
    });

    const updatedSchemaArray = schemaArray.map((schema, index) => {
      if (index === 0) {
        const updatedSchema = {
          ...schema,
          properties: {
            ...schema.properties,
            input: {
              ...schema.properties.input,
              items: {
                ...schema.properties.input.items,
                enum: event.output.length > 0 ? event.output : ["NONE"],
              },
            },
          },
        };
        return updatedSchema;
      }
      return schema;
    });

    setFormDataArray(updatedFormDataArray);
    setSchemaArray(updatedSchemaArray);
  };

  const addNewForm = () => {
    const allPreviousOutputs = formDataArray.reduce((acc, formData) => {
      return acc.concat(formData.output, startformData.output);
    }, []);

    const newFormData = { ...initialData, input: allPreviousOutputs };
    const newSchema = { ...initialSchema };

    newSchema.properties.input.items.enum =
      allPreviousOutputs.length > 0 ? allPreviousOutputs : ["NONE"];

    setFormDataArray([...formDataArray, initialData]);
    setSchemaArray([...schemaArray, newSchema]);
  };

  const handleFormChange =
    (index: number) =>
    ({ data }: { data: any }) => {
      const updatedFormDataArray = [...formDataArray];
      updatedFormDataArray[index] = data;

      if (index < updatedFormDataArray.length - 1) {
        updatedFormDataArray[index + 1] = {
          ...updatedFormDataArray[index + 1],
          type: data.next,
          parent: data.type,
        };
      }

      const updatedSchemaArray = schemaArray.map((schema, idx) => {
        if (idx === index) {
          return {
            ...schema,
            properties: {
              ...schema.properties,
              next: {
                ...schema.properties.next,
                enum:
                  dropdownOptions && dropdownOptions.length > 0
                    ? dropdownOptions
                    : ["NONE"],
              },
            },
          };
        }
        return schema;
      });

      const updatedEndFormData = {
        ...endformData,
        parent: data.next,
      };

      setEndFormData(updatedEndFormData);

      setSchemaArray(updatedSchemaArray);
      setFormDataArray(updatedFormDataArray);
    };

  const deleteForm = (index: number) => {
    const updatedFormDataArray = formDataArray.filter((_, i) => i !== index);
    const updatedSchemaArray = schemaArray.filter((_, i) => i !== index);

    setSchemaArray(updatedSchemaArray);
    setFormDataArray(updatedFormDataArray);
  };

  const onSubmit = async () => {
    const combinedDataArray = [
      { workflowName },
      { ...startformData },
      ...formDataArray,
      { ...endformData },
    ];

    try {
      const response = await workflow({ combinedDataArray });
      if (response) {
        toast.success(response.message);
        setFormDataArray([initialData]); // Reset the form data to its initial state
        setSchemaArray([initialSchema]); // Reset the schema array to its initial state
      } else {
        toast.error("An unknown error occurred.");
      }
    } catch (error) {
      toast.error("Failed to submit the form.");
    }
  };

  return (
    <Container >
      <Box mb={2} mt={2}>
        <Card variant="outlined" >
        <Typography sx={{ fontSize: 16,fontWeight:'600', padding: "10px", backgroundColor:'#d2d0d0', textAlign:'center' }} color="text.secondary">
         Update Work Flow
        </Typography>
        <Box sx={{ padding: "10px" }}>
        <JsonForms
            schema={UpdateSchema}
            uischema={UpdateUiSchema}
            data={UpdateFormData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => UpdateFormhandlechange(data)}
          />
        </Box>
        
        </Card>
      </Box>
      <Card variant="outlined" >
      <Typography sx={{ fontSize: 16,fontWeight:'600', padding: "10px", backgroundColor:'#d2d0d0', textAlign:'center' }} color="text.secondary">
         Add New Work Flow
        </Typography>
        <Box sx={{padding:'10px' }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ width: "40%" }}
          id="outlined-basic"
          label="Workflow Name"
          variant="outlined"
          value={workflowName}
          onChange={handleChange}
        />
      </Box>
      <Box mb={2} mt={2}>
        <Card variant="outlined" sx={{ padding: "10px" }}>
          <JsonForms
            schema={startschemaArray}
            uischema={startuischema}
            data={startformData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => starthandlechange(data)}
          />
        </Card>
      </Box>

      <Button
        sx={{ mb: 2 }}
        variant="contained"
        color="primary"
        onClick={addNewForm}
      >
        <Add sx={{ mr: 1 }} />
        <Typography>Add New Slot</Typography>
      </Button>

      {formDataArray.map((formData, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography>{`Slot ${index + 1}`}</Typography>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteForm(index);
                }}
              >
                <DeleteOutlineIcon />
              </Button>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Box mb={2}>
              <JsonForms
                schema={schemaArray[index]}
                uischema={uischema}
                data={formData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={handleFormChange(index)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box mb={2} mt={2}>
        <Card variant="outlined" sx={{ padding: "10px" }}>
          <JsonForms
            schema={endschema}
            uischema={enduischema}
            data={endformData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setEndFormData(data)}
          />
        </Card>
      </Box>

      <Button variant="contained" onClick={onSubmit} sx={{ mt: 2, mb: 2 }}>
        Submit
      </Button>
      </Box>
      </Card>
      <Card variant="outlined" sx={{padding:'15px',marginTop:'20px'}}>
      <pre>workflowName:{ workflowName}</pre>
      <pre>{JSON.stringify(startformData, null, 2)}</pre>
      <pre>{JSON.stringify(formDataArray, null, 2)}</pre>
      <pre>{JSON.stringify(endformData, null, 2)}</pre>
      </Card>
      
    </Container>
  );
};

export default DynamicForms;
