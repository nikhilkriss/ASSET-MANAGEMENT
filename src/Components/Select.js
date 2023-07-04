import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Select = ({ options, label, getData, error, isRequired, isCleared }) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    getData(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (isCleared) {
      setSelectedValue("");
    }
  }, [isCleared]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  const menuItems = options.map((item, index) => (
    <MenuItem value={item} key={index}>
      {item}
    </MenuItem>
  ));

  const labelStyles = {
    fontSize: "0.875rem", 
  };

  return (
    // <Box width="200px" height="5px">
    <TextField
      label={label}
      InputLabelProps={{
        style: labelStyles,
      }}
      select
      // value={selectedValue}
      // onChange={handleChange}
      fullWidth
      error={error}
      required={isRequired}
      size="small"
      sx={{
        "& .MuiInputBase-root": {
          height: "32px", width: "180px",
        },
      }}
    >
      {menuItems}
    </TextField>
    // </Box>
  );
};

export default Select;
