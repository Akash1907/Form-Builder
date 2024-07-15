"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Link from 'next/link';
import Button from "@mui/material/Button";

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
      <Link
        href={{
          pathname: "/handlePost/postDashboard"
        }}
        passHref
      >
        <Button variant="contained">Create a Post</Button>
      </Link>
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
