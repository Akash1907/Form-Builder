'use client'
import { useState } from 'react'
import { useRouter } from 'next/router'
import CardLayout from "./Cards";
import Filter from "./Filter";
import * as React from "react";
import { styled } from "@mui/material/styles";
import {Paper,Grid,Button} from '../Components/muiIcons/muiIcons';

import TemporaryDrawer from './addReport';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Page() {
 const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    console.log(newOpen)
    setOpen(newOpen);
  };

  return (
    <main className="">
      <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid item xs={5}>
          <Filter />
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'right' }}>
        <Button variant="contained" onClick={toggleDrawer(true)}>Add Report</Button>
        {open && <TemporaryDrawer open={open} setOpen={setOpen}/>}
        </Grid>
        <Grid item xs={12}>
          <CardLayout />
        </Grid>
      </Grid>
    </main>
  );
}


