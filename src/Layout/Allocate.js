import React, { useState, useEffect } from "react";
import "../Assets/Allocate.css";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import {Dialog, DialogContent,DialogTitle,DialogContentText, DialogActions} from "@mui/material";
import AssetInfo from "./AssetInfo.json";

const Allocate = ({ allocateDone ,id }) => {
  const { register, handleSubmit } = useForm();
  const [assetData, setAssetData] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [dialogOpen, setDialogOpen]=useState(false);
  const [giveChance, setGiveChance]=useState(false);

  const getAssetData = async () => {
    // try {
    //   const response = await axios.get(
    //     `https://jsonplaceholder.typicode.com/users/${id}`
    //   );
    //   setAssetData(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
    setAssetData(AssetInfo[id]);
  };
  const getEmployeeData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = response.data;
      const employeeNames = data.map((user) => user.username);
      setEmployeeList(employeeNames);
    } catch (error) {
      console.log(error);
    }
  };
  let employeeOptions = employeeList.map((item, index) => (
    <MenuItem value={item} key={index}>
      {item}
    </MenuItem>
  ));
  const stringifyNestedObjects = (value) => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join(", ");
    }
    return value;
  };
  useEffect(() => {
    getAssetData();
    getEmployeeData();
  }, []);
  const labelStyles = {
    fontSize: "0.875rem",
  };
  const postAllocation= async(formData)=>{
    try {
      // console.log(endpoint)
      // const path= `${endpoint}/v1/Assets`;
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/users`,formData
      );
      console.log(response);
      setDialogOpen(true);
      
    } catch (error) {
      console.log(error);
    }
  }
  //the below code is written to because: when asset is allocated a dialog box is displayed and when 
  //dialog box is closed we will land into table page 
  useEffect(()=>{
    if((dialogOpen&&!giveChance)){setGiveChance(true)}
  },[dialogOpen]);
  useEffect(()=>{if(!dialogOpen&&giveChance){allocateDone();}},[giveChance, dialogOpen]);
  const handleFormSubmit = (formData) => {
    postAllocation(formData);
  };
  return (
    <div className="allocatebody">
      <Dialog open={dialogOpen} onClose={()=>{setDialogOpen(false)}} aria-labelledby="dialog-title" aria-aria-describedby="dialog-description">
        <DialogTitle id="dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">Asset allocated</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setDialogOpen(false)}}>OK</Button>
        </DialogActions>
      </Dialog>
      <div className="title">Asset Details</div>
      {Object.entries(assetData).map(([key, value]) => (
        <div key={key} className="display">
          <div className="keyfield" style={{ width: "110px" }}>
            {key}:
          </div>{" "}
          <div className="valuefield">{stringifyNestedObjects(value)}</div>
        </div>
      ))}
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="input">
          <TextField
            label="Employee"
            required
            InputLabelProps={{
              style: labelStyles,
            }}
            select
            {...register("employee")}
            fullWidth
            size="small"
            sx={{
              "& .MuiInputBase-root": {
                height: "40px",
                width: "200px",
                marginBottom: "10px",
                marginTop: "25px",
              },
            }}
          >
            {employeeOptions}
          </TextField>
          <TextField
            label="Reason for Allocation"
            InputLabelProps={{
              style: labelStyles,
            }}
            {...register("reason")}
            fullWidth
            size="small"
            sx={{
              "& .MuiInputBase-root": {
                height: "100px",
                width: "200px",
                marginBottom: "0px",
                marginTop: "10px",
              },
            }}
          >
            {/* {employeeOptions} */}
          </TextField>
        </div>
        <Button variant="outlined" type="submit" size="small">
          Allocate Asset
        </Button>
      </Box>
    </div>
  );
};
export default Allocate;
