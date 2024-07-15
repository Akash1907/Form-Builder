"use client";
import React, { useState, useEffect } from "react";
import { JsonForms, withJsonFormsControlProps } from "@jsonforms/react";
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";
import { ControlProps } from "@jsonforms/core";
import { useAppContext } from "@/app/Contexts/sharedata";

const initialSchema = {
  type: "object",
  properties: {
    columnsToshow: {
      type: "string",
      enum: ["default"],
    },
    groupedColumns: {
      type: "string",
      enum: ["default"],
    },
  },
};

const initialUiSchema = {
  type: "Group",
  label: "Columns To show",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              label: "Columns To show",
              scope: "#/properties/columnsToshow",
            },
            {
              type: "Control",
              label: "Grouped Columns",
              scope: "#/properties/groupedColumns",
            },
          ],
        },
      ],
    },
  ],
};

const ColumnsToShow: React.FC<ControlProps> = ({ data, handleChange, path }) => {
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
  let result = Array.from(uniqueColumns);

    const newSchema = JSON.parse(JSON.stringify(initialSchema));
    newSchema.properties.columnsToshow.enum = result.length > 0 ? result : ["default"];
    newSchema.properties.groupedColumns.enum = result.length > 0 ? result : ["default"];
    
    
    setDynamicSchema(newSchema);
  }, [state]);

  const handleFormChange = ({ data }: { data: any }) => {
    setFormData(data);
    handleChange(path, data);
  };

  return (
    <JsonForms
      schema={dynamicSchema}
      uischema={initialUiSchema}
      data={formData}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={handleFormChange}
    />
  );
};
export default withJsonFormsControlProps(ColumnsToShow);
