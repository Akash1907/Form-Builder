"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { JsonForms, withJsonFormsControlProps } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { ControlProps } from "@jsonforms/core";
import { useAppContext } from "@/app/Contexts/sharedata";

const initialSchema = {
  type: "object",
  properties: {
    addMapping: {
      type: "array",
      title: "Add Mapping",
      items: {
        type: "object",
        properties: {
          MappedColumnsfrom: {
            type: "string",
            enum: ['default']
          },
          MappedColumnsto: {
            type: "string",
            enum: ['default']
          },
          JoinClause: {
            type: "string",
            enum: ["Inner", "Left", "Right", "Full Joins"]
          }
        }
      }
    },
  },
};

const initialUiSchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/addMapping",
    },
  ],
};

const AddMapping: React.FC<ControlProps> = ({
  data,
  handleChange,
  path,
}) => {
  const [formData, setFormData] = useState<any>({});
  const { state } = useAppContext();
  const [dynamicSchema, setDynamicSchema] = useState(initialSchema);

  useEffect(() => {
    setDynamicSchema((prevSchema) => {
      const uniqueColumns = new Set();

      state.forEach((item:any) => {
        item.columns.forEach((column:any) => {
          uniqueColumns.add(`${item.table}.${column}`);
        });
      });
      
      const result = Array.from(uniqueColumns);
      const newSchema = JSON.parse(JSON.stringify(prevSchema));
      const addMapping = newSchema.properties.addMapping.items;
      addMapping.properties.MappedColumnsfrom.enum = result.length > 0 ? result : ['default'];
      addMapping.properties.MappedColumnsto.enum = result.length > 0 ? result : ['default'];
      return newSchema;
    });
  }, [state]);

  const handleFormChange = ({ data }: { data: any }) => {
    setFormData(data);
    handleChange(path, data);
  };
 
  return (
    <Accordion sx={{ marginBottom: '10px' }}>
      <AccordionDetails>
        <Box mb={2}>
          <JsonForms
            schema={dynamicSchema}
            uischema={initialUiSchema}
            data={formData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={handleFormChange}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default withJsonFormsControlProps(AddMapping);
