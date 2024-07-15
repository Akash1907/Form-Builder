"use client";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { materialCells } from "@jsonforms/material-renderers";
import { materialRenderers } from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { toast } from "react-toastify";
import { login } from "../service/authService/authService";

// Define schema and UISchema outside the component
const schema = {
  type: "object",
  properties: {
    formGroup: {
      title: "Parameter Type",
      type: "object",
      properties: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
      required: [],
    },
  },
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/formGroup/properties/email",
    },
    {
      type: "Control",
      scope: "#/properties/formGroup/properties/password",
      options: {
        format: "password",
      },
    },
  ],
};







const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function LoginPage() {
  const [data, setData] = useState<{
    formGroup: { email: string; password: string };
  }>({
    formGroup: { email: "", password: "" },
  });

  const handleSubmit = async () => {
    const { email, password } = data.formGroup;
    // const response = await login({ email, password });
    // console.log("Login successful:", response);
    if (email === "demo@gmail.com" && password === "demo@1234") {
      toast.success("User Login successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      });
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 400,
          maxHeight: 500,
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <ButtonBase sx={{ height: 50 }}>
              <Img
                alt="Login In"
                src="https://assistoai.tech/assets/h%20logo.jpg"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
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
              LogIn
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
