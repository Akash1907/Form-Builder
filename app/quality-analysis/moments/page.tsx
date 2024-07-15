"use client";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import React, { Fragment, useState } from "react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";

const label = { inputProps: { "aria-label": "Switch demo" } };
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const columns: GridColDef[] = [
  //   { field: "id", headerName: "ID", width: 100 },
  { field: "channel", headerName: "Channel", width: 230 },
  { field: "parameter", headerName: "Parameter", width: 230 },
  { field: "subparameter", headerName: "Sub-parameter", width: 250 },

  {
    field: "active",
    headerName: "Active",
    width: 130,
    renderCell: (params) => (
      <Switch
        defaultChecked={params.value} // You can customize this based on your data structure
        onChange={(event) => {
          // Handle switch state change
          console.log("Switch state changed:", event.target.checked);
          // You can add your logic to handle the switch state change here
        }}
      />
    ),
  },
];

const rows = [
  {
    id: 1,
    channel: "Call",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: true,
  },
  {
    id: 2,
    channel: "Message",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: false,
  },
  {
    id: 3,
    channel: "Mail",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: false,
  },
  {
    id: 4,
    channel: "chat",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: false,
  },
  {
    id: 5,
    channel: "Mail",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: true,
  },
  {
    id: 6,
    channel: "Call",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: true,
  },
  {
    id: 7,
    channel: "Chat",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: false,
  },
  {
    id: 8,
    channel: "Message",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: true,
  },
  {
    id: 9,
    channel: "Call",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: false,
  },
  {
    id: 10,
    channel: "chat",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: false,
  },
  {
    id: 11,
    channel: "Message",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: true,
  },
  {
    id: 12,
    channel: "Call",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: true,
  },
  {
    id: 13,
    channel: "Chat",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: false,
  },
  {
    id: 14,
    channel: "Call",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: false,
  },
  {
    id: 15,
    channel: "Message",
    parameter: "Customer concern",
    subparameter: "Pricing concern",
    active: true,
  },
];

const schema = {
  type: "object",
  properties: {
    formGroup: {
      title: "Parameter Type",
      type: "object",
      properties: {
        ParameterType: {
          type: "string",
          enum: ["General", "Dialogue manager", "Logical grouping"],
        },
        Parameter: {
          type: "string",
          enum: ["Parameter", "Other"],
        },
        subParameter: {
          type: "string",
          enum: ["Parameter", "Other"],
        },
        theme: {
          type: "string",
          enum: ["Parameter", "Other"],
        },
        Gategory: {
          type: "string",
          enum: ["Parameter", "Other"],
        },
        Parameterorder: {
          type: "string",
        },
        Description: {
          type: "string",
        },
        Keywords: {
          type: "string",
        },
      },
      required: [],
    },

    firstradioGroup: {
      title: "Spoken By",
      type: "object",
      properties: {
        SpokenBy: {
          type: "string",
          enum: ["Agent", "Customer", "Both"],
        },
      },
      required: [],
    },
    secondradioGroup: {
      title: "Teams",
      type: "object",
      properties: {
        Teams: {
          type: "string",
          enum: ["All", "Select Team"],
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
      type: "Group",
      label: "Parameter List",
      elements: [
        {
          type: "VerticalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/formGroup/properties/ParameterType",
              options: {
                format: "radio",
              },
            },
          ],
        },

        {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/formGroup/properties/Parameter",
            },
            {
              type: "Control",
              scope: "#/properties/formGroup/properties/subParameter",
            },
            {
              type: "Control",
              scope: "#/properties/formGroup/properties/theme",
            },
          ],
        },
        {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/formGroup/properties/Gategory",
            },
            {
              type: "Control",
              scope: "#/properties/formGroup/properties/Parameterorder",
            },
          ],
        },
        {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/firstradioGroup/properties/SpokenBy",
              options: {
                format: "radio",
              },
            },
            {
              type: "Control",
              scope: "#/properties/secondradioGroup/properties/Teams",
              options: {
                format: "radio",
              },
            },
          ],
        },
        {
          type: "VerticalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/formGroup/properties/Description",
            },
          ],
        },
        {
          type: "VerticalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/formGroup/properties/Keywords",
            },
          ],
        },
      ],
    },
  ],
};



const addschema = {
  type: 'object',
  properties: {
        "addParameter": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "category": {
                "type": "string",
                
              },
              "more_important_keywords": {
                "type": "string",
                
              },
              "less_important_keywords": {
                "type": "string",
                
              }
        }
      },
      required: [],
    }
  
  }
};

const adduischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      // label: 'sdsd',
      elements: [

        {
          "type": "HorizontalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/addParameter"
            }
          ]
        }




      ],
    }
  
  ],
};










export default function FullWidthGrid() {
  const [value, setValue] = React.useState("1");
  const [age, setAge] = React.useState("");

  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [data, setData] = useState({});

  const [adddata, setData1] = useState({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={6} md={6}>
                <Typography variant="h6" component="h1">
                  Parameter List
                </Typography>

                <div>
                  <TextField
                    label="Search.."
                    id="outlined-size-small"
                    size="small"
                  />
                </div>
              </Grid>
              <Grid item xs={6} md={6} textAlign="right">
                <Button variant="contained" onClick={handleClickOpen}>
                  + Parameter
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ width: "100%" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Customer experience" value="1" />
                    <Tab label="Process adherence" value="2" />
                    <Tab label="Sales adherence" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1" style={{ padding: "5px" }}>
                  <div style={{ height: 450, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[10, 10]}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="2" style={{ padding: "5px" }}>
                  <div style={{ height: 450, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[10, 10]}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="3" style={{ padding: "5px" }}>
                  <div style={{ height: 450, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[10, 10]}
                    />
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6} md={6}>
          <Item>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data }) => setData(data)}
            />
            <Button variant="contained">Submit</Button>
          </Item>
        </Grid>
      </Grid>

      <React.Fragment>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <JsonForms
        schema={addschema}
        uischema={adduischema}
        data={adddata}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            
          </React.Fragment>
    </Box>


  );
}
