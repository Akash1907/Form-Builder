"use client";
import * as React from "react";

import {
  TextField,
  Autocomplete,
  } from '../Components/muiIcons/muiIcons';

export default function Filter() {

  return (
    <main className="">
      <div className="flex">
          <Autocomplete
            disablePortal
            id="projects"
            options={projects}
            sx={{marginInlineEnd:"1rem", width: 250 }}
            renderInput={(params) => <TextField {...params} label="Project" />}
          />
          <Autocomplete
            disablePortal
            id="reports"
            options={reports}
            sx={{marginInlineEnd:"1rem", width: 250 }}
            renderInput={(params) => <TextField {...params} label="Reports" />}
          />
      </div>
    </main>
  );
}
const projects = [
  { label: "Dialer_Smart" },
  { label: "ICCS_HRMS" },
  { label: "CRM" },
];
const reports = [
  { label: "report1" },
  { label: "report2" },
  { label: "report3" },
];
