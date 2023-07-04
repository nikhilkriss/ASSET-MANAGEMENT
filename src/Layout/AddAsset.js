import React, { useState, useEffect, useCallback } from "react";

import { Button, Stack } from "@mui/material";
import "../Assets/AddAsset.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import { FormControlLabel, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import MenuItem from "@mui/material/MenuItem";

const AddAsset = () => {
  const { register, handleSubmit, reset } = useForm();
  const [categoryError, setCategoryError]=useState(false);
  const [brandError, setBrandError]=useState(false);
  const [modelError, setModelError]=useState(false);
  const [osError, setOsError]=useState(false);
  const [osVersionError, setOsVersionError]=useState(false);
  const [ownedByProximaError, setOwnedByProximaError]=useState(false);
  const [ramError, setRamError]=useState(false);
  const [hdmError, setHdmError]=useState(false);
  const [processorError, setProcessorError]=useState(false);
  const [serialNumberError, setSerialNumberError]=useState(false);
  const [purchaseDateError, setPurchaseDateError]=useState(false);
  const [carePaqExpDateError, setCarePaqExpDateError]=useState(false);
  const [warrantyError, setWarrantyError]=useState(false);
  const [displayDimensionsError, setDisplayDimensionsError]=useState(false);
  
  const [brandValue, setBrandValue]=useState("");
  const [categoryValue, setCategoryValue]=useState("");
  const [brandOptions, setBrandOptions]=useState([]);
  // const [reset, setReset]=useState(false);

  const handleCategoryChange=(e)=>{
    console.log("handleCategoryChange called");
    setCategoryValue(e.target.value);
    console.log(e.target.value);
  }
  useEffect(()=>{

    if(categoryValue==="Laptop"){
      setBrandOptions(["Dell", "Lenovo","HP"]);
      console.log("options are set");
    }
    if(categoryValue==="Macbook"){
      setBrandOptions(["Apple"]);
    }
    if(categoryValue==="Mouse"){
      setBrandOptions(["Logitech", "Dell","Zebronics"]);
    }
  },[categoryValue]);
  let brandMenuOptions=brandOptions.map((item,index)=>(
    <MenuItem value={item} key={index}>
      {item}
    </MenuItem>
  ));
  const labelStyles = {
    fontSize: "0.875rem",
  };
  const checkLabelStyles = {
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.6)",
  };
  const handleFormSubmit=(formData)=>{
    console.log(formData);
    console.log("success");
    reset();
    // setReset(true);
  }
  return (
    <div className="addAsset ">
      <div className="addAssetTitle">AddAsset</div>
      {/*                                    basic */}

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="basic">
        <div className="basictitle">Basic</div>
        <div className="inputs">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "5px",
            }}
          >
            <Box>
              <TextField
                label="Category"
                onChange={handleCategoryChange}
                InputLabelProps={{
                  style: labelStyles,
                }}
                select
                fullWidth
                {...register('category')}
                required
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px",
                    width: "180px",
                  },
                }}
              >
                <MenuItem value="Laptop" key="Laptop">Laptop</MenuItem>
                <MenuItem value="Macbook" key="Macbook">Macbook</MenuItem>
                <MenuItem value="Mouse" key="Mouse">Mouse</MenuItem>
              </TextField>
            </Box>
            <Box>
              <TextField
                label="Brand"
                InputLabelProps={{
                  style: labelStyles,
                }}
                select
                {...register('brand')}
                fullWidth
                // error={error}
                required
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px",
                    width: "180px",
                  },
                }}
              >
                {/* {brandMenuOptions} */}
                <MenuItem value="Laptop">Laptop</MenuItem>
                <MenuItem value="Macbook">Macbook</MenuItem>
                <MenuItem value="Mouse">Mouse</MenuItem>
              </TextField>
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "5px",
            }}
          >
            <Box>
              <TextField
                label="Model"
                InputLabelProps={{
                  style: labelStyles,
                }}
                select
                {...register('model')}
                fullWidth
                // error={error}
                required
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px",
                    width: "180px",
                  },
                }}
              >
                {/* {menuItems} */}
                <MenuItem value="Laptop">Laptop</MenuItem>
                <MenuItem value="Macbook">Macbook</MenuItem>
                <MenuItem value="Mouse">Mouse</MenuItem>
              </TextField>
            </Box>
            <Box>
              <TextField
                label="OS"
                InputLabelProps={{
                  style: labelStyles,
                }}
                select
                {...register('os')}
                fullWidth
                // error={error}
                required
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px",
                    width: "180px",
                  },
                }}
              >
                {/* {menuItems} */}
                <MenuItem value="Laptop">Laptop</MenuItem>
                <MenuItem value="Macbook">Macbook</MenuItem>
                <MenuItem value="Mouse">Mouse</MenuItem>
              </TextField>
            </Box>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", }}>
            <Box>
            <TextField
              fullWidth
              label="OS Version"
              InputLabelProps={{
                style: labelStyles,
              }}
              // onChange={handleChange}
              variant="outlined"
              size="small"
              {...register('osVersion')}
              placeholder={"OS Version..."}
              sx={{
                "& .MuiInputBase-root": {
                  height: "30px",
                  width: "180px",
                },
              }}
            />
            </Box>
            <Box width="180px">
              <FormControlLabel
                fullWidth
                {...register('ownedByProxima')}
                label={
                  <Typography variant="subtitle2" style={checkLabelStyles}>
                    Owned by Proxima
                  </Typography>
                }
                control={
                  <Checkbox
                    size="small"
                  />
                }
              ></FormControlLabel>
            </Box>
          </div>
        </div>
      </div>
      {/*                                               details */}
      <div className="details">
        <div className="detailstitle">Details</div>
        <div className="inputs">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "5px",
              marginTop: "",
              justifyContent: "space-around",
            }}
          >
            <Box width="180px">
              <TextField
                
                fullWidth
                label="RAM"
                {...register('ram')}
                InputLabelProps={{
                  style: labelStyles,
                }}
                
                variant="outlined"
                required
                
                size="small"
                placeholder="RAM"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px",
                    width: "180px",
                  },
                }}
              />
            </Box>
            <Box width="180px">
              <TextField
                
                fullWidth
                label="Hard Disk Memory"
                {...register('hdm')}
                InputLabelProps={{
                  style: labelStyles,
                }}
                
                variant="outlined"
                required
                // error={isError}
                size="small"
                placeholder="Hard Disk Memory..."
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px",
                    width: "180px",
                  },
                }}
              />
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "5px",
              justifyContent: "space-around",
            }}
          >
            <Box width="180px">
              <TextField
                // value={text}
                fullWidth
                label="Processor"
                {...register('processor')}
                InputLabelProps={{
                  style: labelStyles,
                }}
                // onChange={handleChange}
                variant="outlined"
                required
                // error={isError}
                size="small"
                placeholder="Processor..."
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px",
                    width: "180px",
                  },
                }}
              />
            </Box>

            <Box width="180px">
              <TextField
                fullWidth
                label="Serial Number"
                {...register('serialNumber')}
                InputLabelProps={{
                  style: labelStyles,
                }}
                variant="outlined"
                required
                size="small"
                placeholder="Serial Number..."
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px",
                    width: "180px",
                  },
                }}
              />
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "5px",
              justifyContent: "space-around",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
              {...register('purchaseDate')}
                components={{
                  TextField: ({ inputRef, ...other }) => (
                    <TextField
                      {...other}
                      label="Purchase Date"
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      inputRef={inputRef}
                      size="small"
                      
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                          marginBottom: "0px",
                        },
                      }}
                    />
                  ),
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...register('carePaqExpDate')}
                components={{
                  TextField: ({ inputRef, ...other }) => (
                    <TextField
                      {...other}
                      label="CarePaqExpDate"
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      inputRef={inputRef}
                      size="small"
                      
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                          marginBottom: "0px",
                        },
                      }}
                    />
                  ),
                }}
              />
            </LocalizationProvider>
          </div>
          <div style={{ display: "flex", flexDirection: "row",justifyContent: "space-around", }}>
            <Box width="180px">
              <TextField
                label="Warranty Status"
                {...register('warrantyStatus')}
                InputLabelProps={{
                  style: labelStyles,
                }}
                select
                fullWidth
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px", 
                    width: "180px",
                  },
                }}
              >
                <MenuItem value="inWarranty">
                  In Warranty
                </MenuItem>
                <MenuItem value="expired">
                  Expired
                </MenuItem>
              </TextField>
            </Box>
            <Box width="180px">
              <TextField
                // value={text}
                fullWidth
                label="Display Dimensions"
                {...register('displayDimensions')}
                InputLabelProps={{
                  style: labelStyles,
                }}
                // onChange={handleChange}
                variant="outlined"
                // error={isError}
                size="small"
                placeholder="Display Dimensions"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "30px",
                    width: "180px",
                  },
                }}
              />
            </Box>
          </div>
        </div>
      </div>
      <div className="buttons">
        <Stack spacing={2} direction="row">
          <Button variant="contained" size="small">
            Clear
          </Button>
          <Button variant="contained"  type="submit" size="small">
            Add Asset
          </Button>
        </Stack>
      </div>
        </Box>
    </div>
  );
};
export default AddAsset;
