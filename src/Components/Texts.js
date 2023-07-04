import { Box, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const Texts = ({ label, isError, getData, isRequired, isCleared}) => {
  const [text, setText] = useState("");
  const handleChange=(e)=>{
    let typedValue=e.target.value;
    setText(typedValue);
  }
  useEffect(()=>{getData(text)},[text]);
  useEffect(()=>{if(isCleared){setText("")} console.log(isCleared)},[isCleared])
  
  const labelStyles = {
    fontSize: "0.84rem", 
  };

  return (
    <Box width="180px">
      <TextField
        value={text}
        fullWidth
        label={label}
        InputLabelProps={{
          style: labelStyles,
        }}
        onChange={handleChange}
        variant="outlined"
        required={isRequired}
        error={isError}
        size="small"
        placeholder={`${label}...`}
        sx={{
          "& .MuiInputBase-root": {
            height: "32px", width:"180px",
          },
        }}
      />
    </Box>
  );
};
export default Texts;
