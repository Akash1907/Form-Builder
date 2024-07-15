import * as React from "react";
import {
Divider,
Drawer,
Box,
Button,
Grid,
CloseIcon
} from '../Components/muiIcons/muiIcons';

import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { toast } from 'react-toastify';

// Define schema and UISchema outside the component
const schema = {
  type: "object",
  properties: {
    formGroup: {
      title: "Add Report",
      type: "object",
      properties: {
        ProjectName: {
          type: "string",
        },
        reportName: {
          type: "string",
        },
        tags: {
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
      scope: "#/properties/formGroup/properties/ProjectName",
    },
    {
      type: "Control",
      scope: "#/properties/formGroup/properties/reportName",
    },
    {
      type: "Control",
      scope: "#/properties/formGroup/properties/tags"
    },
  ],
};

export default function TemporaryDrawer(value: any) {
  const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(value.open);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    value.setOpen(newOpen);
  };

  
  const notify = () =>  toast.success("Success");


  const DrawerList = (
    <Box sx={{ width: 400,padding: "10px" }} role="presentation">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={3} sx={{ textAlign: "left" }}>
          Add Report
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "right" }}>
            <CloseIcon onClick={toggleDrawer(false)}/>
        </Grid>
        <Grid item xs={12}>
        <Divider/>
        </Grid>
        
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
        
        <Grid item xs={12} sx={{textAlign:'right'}}>
        <Divider sx={{marginBottom:'20px'}}/>
      <Button variant="contained" onClick={toggleDrawer(false)} sx={{marginRight:'20px'}}>
        Cancel
      </Button>
      <Button variant="contained" onClick={notify}>
        Save
      </Button>
        </Grid>
      </Grid>

      
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={open}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
