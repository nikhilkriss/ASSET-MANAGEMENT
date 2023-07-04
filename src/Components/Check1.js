import React, { useState, useEffect } from 'react';
import { Box, FormControlLabel, Checkbox } from '@mui/material';
import Typography from "@mui/material/Typography";

const Check1 = ({ onCheckboxChange }) => {
  const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   if (isClear) {
  //     setChecked(false);
  //   }
  // }, [isClear]);
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    
    onCheckboxChange(isChecked);
  };
 
  
  
  return (
    <div></div>
  );
};

export default Check1;
