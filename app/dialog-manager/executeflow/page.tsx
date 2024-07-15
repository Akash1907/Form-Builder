"use client";

import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { materialCells } from "@jsonforms/material-renderers";
import { materialRenderers } from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { toast } from "react-toastify";
import { Button, Grid } from "../../Components/muiIcons/muiIcons";
import { executeflow } from "@/app/service/dialogmanager/service";

// Define schema and UISchema outside the component
const schema = {
  type: "object",
  properties: {
    public_id: { type: "string", title: "Public ID" },
    client_id: { type: "string", title: "Client ID" },
    text: { type: "string", title: "Text" },
    lang : { type: "string", title: "Language" },
  },
  required: ["public_id", "client_id", "text", "lang"],
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    { type: "Control", scope: "#/properties/public_id" },
    { type: "Control", scope: "#/properties/client_id" },
    { type: "Control", scope: "#/properties/text" },
    { type: "Control", scope: "#/properties/lang" },
  ],
};

export default function Executeflow() {
  const [data, setData] = useState({
    public_id: "",
    client_id: "",
    text: "",
    lang: "",
  });

  const handleSubmit = async () => {
    const payload = {
      mode: "dialog_manager",
      data: { ...data },
    };

    try {
      const response = await executeflow(payload);

      if (response) {
        toast.success(response.message);
        setData({
          public_id: "",
          client_id: "",
          text: "",
          lang: "",
        }); 
      } else {
        toast.error("An unknown error occurred.");
      }
    } catch (error) {
      toast.error("Failed to submit the form.");
    }
  };

  return (
    <div>
      <Paper sx={{ padding: "10px", marginTop: "10px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data }) => setData(data)}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
