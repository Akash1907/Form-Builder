"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Add,
  ExpandMore as ExpandMoreIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";
import { JsonForms, withJsonFormsControlProps } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { ControlProps } from "@jsonforms/core";
import { useAppContext } from "@/app/Contexts/sharedata";

const datasource = {
  tables: [
    {
      table_name: "Dummy_data",
      columns: [
        { column_name: "SNo", type: "INT" },
        { column_name: "CallNumber", type: "INT" },
        { column_name: "AgentID", type: "TEXT" },
        { column_name: "Extension", type: "INT" },
        { column_name: "Phone_Number", type: "BIGINT" },
      ],
    },
    {
      table_name: "ICICI",
      columns: [
        { column_name: "Loan_ID", type: "INT" },
        { column_name: "AGREEMENTNO", type: "TEXT" },
        { column_name: "Del_Type", type: "TEXT" },
        { column_name: "CUSTOMER_NAME", type: "TEXT" },
        { column_name: "EMI", type: "TEXT" },
      ],
    },
  ],
};

const initialSchema = {
  type: "object",
  properties: {
    table: {
      type: "string",
      enum: datasource.tables.map((table) => table.table_name),
    },
    columns: {
      type: "string",
      enum: ["default"],
    },
    addcondition: {
      type: "array",
      title: "Add Condition",
      items: {
        type: "object",
        properties: {
          column: {
            type: "string",
            title: "column",
            enum: ["RR", "DDD"],
          },
          operater: {
            type: "string",
            title: "operater",
            enum: [
              "is greater than",
              "is less than",
              "is equal to",
              "is greater than or equal to",
              "is less than or equal to",
              "contains",
              "IS NULL",
              "IS NOT NULL",
              "is not equal to",
            ],
          },
          Value: {
            type: "string",
          },
        },
      },
    },
  },
};

const initialUiSchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/table",
        },
        {
          type: "Control",
          scope: "#/properties/columns",
        },
      ],
    },
    {
      type: "Control",
      scope: "#/properties/addcondition",
    },
  ],
};

const AddTable: React.FC<ControlProps> = ({ data, handleChange, path }) => {
  const [formDataArray, setFormDataArray] = useState<any[]>([]);
  const [schemaArray, setSchemaArray] = useState([initialSchema]);
  const { state, sharesetState } = useAppContext();

  const addNewForm = () => {
    setFormDataArray([...formDataArray, {}]);
    setSchemaArray([...schemaArray, initialSchema]);
  };

  const deleteForm = (index: number) => {
    const updatedFormDataArray = [...formDataArray];
    updatedFormDataArray.splice(index, 1);
    setFormDataArray(updatedFormDataArray);

    const updatedSchemaArray = [...schemaArray];
    updatedSchemaArray.splice(index, 1);
    setSchemaArray(updatedSchemaArray);
  };

  const handleFormChange =
    (index: any) =>
    ({ data }: { data: any }) => {
      const updatedFormDataArray = [...formDataArray];
      updatedFormDataArray[index] = data;
      setFormDataArray(updatedFormDataArray);

      setSchemaArray((prevSchema) => {
        const newSchema = JSON.parse(JSON.stringify(prevSchema));
        const table = data?.table;
        if (table) {
          const matchingTables = datasource.tables.filter(
            (item) => item.table_name === table
          );

          if (matchingTables.length > 0) {
            const columns = matchingTables.flatMap((item) =>
              item.columns.map((column) => column.column_name)
            );

            if (columns.length > 0) {
              newSchema[index].properties.columns.enum = columns;
              newSchema[
                index
              ].properties.addcondition.items.properties.column.enum = columns;
            } else {
              console.error(`No columns found for the table: ${table}`);
            }
          } else {
            console.error(`No matching table found for the name: ${table}`);
          }
        } else {
          console.error("No table name provided in the data");
        }

        return newSchema;
      });

      handleChange(path, data);
    };

  useEffect(() => {
    // Update sharesetState based on formDataArray changes
    formDataArray.forEach((formData) => {
      const table = formData?.table;
      if (table) {
        const matchingTables = datasource.tables.filter(
          (item) => item.table_name === table
        );
        if (matchingTables.length > 0) {
          const columns = matchingTables.flatMap((item) =>
            item.columns.map((column) => column.column_name)
          );
          sharesetState((prevState: any) => [
            ...prevState,
            {
              table: table,
              columns: columns,
            },
          ]);
        }
      }
    });
  }, [formDataArray, sharesetState]);

  return (
    <div>
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        color="primary"
        onClick={addNewForm}
      >
        <Add sx={{ mr: 1 }} />
        <Typography>Add Table</Typography>
      </Button>

      {formDataArray.map((formData: any, index: any) => (
        <Accordion key={index} sx={{ marginBottom: "10px" }}>
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
              <Typography>{formData.type || `Table ${index + 1}`}</Typography>
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
                uischema={initialUiSchema}
                data={formData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={handleFormChange(index)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default withJsonFormsControlProps(AddTable);
