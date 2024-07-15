"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Accordion,
  AccordionDetails,
} from "@mui/material";

import { JsonForms, withJsonFormsControlProps } from "@jsonforms/react";
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";
import { ControlProps } from "@jsonforms/core";
import { useAppContext } from "@/app/Contexts/sharedata";

const initialSchema = {
  type: "object",
  properties: {
    addRule: {
      type: "array",
      title: "Add Rule",
      items: {
        type: "object",
        properties: {
          Name: {
            type: "string"
          },
          fromValue: {
            type: "string",
            enum: ["default"]
          },
          Operator: {
            type: "string",
            enum: [
              "Date (YYYY-MM-DD)",
              "Combine bucket",
              "Self multiply",
              "Replace true with",
              "Replace false with",
              "Self divide",
              "Self add",
              "Up to Date",
              "Self subtract",
              "Contains",
              "Num power",
              "Sum",
              "Count",
              "Average",
              "Min",
              "Max",
              "Numeric greater than",
              "Numeric smaller than",
              "Numeric less than",
              "Numeric Equals",
              "Numeric equals to",
              "Numeric divide",
              "Numeric multiply",
              "Numeric add",
              "Numeric subtract",
              "Numeric subtract (ABS)",
              "Equals To",
              "Between",
              "Attendance Min Max",
              "Date after",
              "Date before",
              "Date ABS Subtract",
              "equal by boolean",
              "Date ABS Add",
              "Date Time Greater Than",
              "Combine Columns",
              "convert to time",
              "Extract Date",
              "Extract Month Number",
              "Extract Year",
              "Extract Month Name",
              "Union all",
              "union",
              "Extract Day",
              "Group By Sum",
              "Round to N Digits",
              "Group by aggregate",
              "Aggregate Values"
            ]
          },
          toValue: {
            type: "string",
            maxLength: 20
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
      scope: "#/properties/addRule",
    },
  ],
};

const AddRule: React.FC<ControlProps> = ({
  data,
  handleChange,
  path,
}) => {
  const [formData, setFormData] = useState<any>({});
  const { state } = useAppContext();
  const [dynamicSchema, setDynamicSchema] = useState(initialSchema);

  useEffect(() => {
    const uniqueColumns = new Set();

      state.forEach((item:any) => {
        item.columns.forEach((column:any) => {
          uniqueColumns.add(column);
        });
      });
      
      const result = Array.from(uniqueColumns);
    const newSchema = JSON.parse(JSON.stringify(initialSchema));
   newSchema.properties.addRule.items.properties.fromValue.enum = result.length > 0 ? result : ["default"];
    setDynamicSchema(newSchema);
  }, [state]);

  const handleFormChange = ({ data }: { data: any }) => {
    setFormData(data);
    handleChange(path, data);
  };

  return (
    <Accordion>
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

export default withJsonFormsControlProps(AddRule);
