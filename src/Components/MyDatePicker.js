import React from "react";
import TextField from "@mui/material/TextField";


function MyDatePicker({ selectedDate, handleDateChange, label }) {
  const labelStyles = {
    fontSize: "0.84rem", 
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        components={{
          TextField: ({ inputRef, ...other }) => (
            <TextField
              {...other}
              label={label}
              InputLabelProps={{
                style: labelStyles,
              }}
              inputRef={inputRef}
              size="small"
              sx={{
                "& .MuiInputBase-root": {
                  height: "32px", 
                  width:"180px",
                  marginBottom:"0px"
                },
              }}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
}

export default MyDatePicker;
