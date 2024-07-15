import React, {useState, useEffect} from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Typography from "@mui/material";
export default function InlineDatePicker({label, selectedDate, onChange}) {

  const [date, setDate] = useState(selectedDate || null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onChange(newDate);
  };

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  return (
    <div style = {{marginBottom: "8px", marginTop: '8px'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker label= {label} value={date}
          onChange={handleDateChange} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
