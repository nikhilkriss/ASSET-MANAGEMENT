import React, { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import "../Assets/AddAsset.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Select } from "@mui/material";
import { FormControlLabel, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import MenuItem from "@mui/material/MenuItem";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import config from "../config";
import { FormControl, InputLabel } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const schema = yup.object().shape({
  ram: yup //only numbers and accepts null
    .string()
    .matches(/^(\d+|null)?$/),
  memory: yup //only numbers and accepts null
    .string()
    .matches(/^(\d+|null)?$/),
  os_version: yup.string().matches(/^(null|[a-zA-Z0-9\s]*)$/), //only numbers, alphabets and space and accepts null
  processor: yup
    .string()
    .matches(/^(null|[a-zA-Z0-9\s]*)$/), //only numbers, alphabets and space and accepts null
  price: yup
    .number()
    .required("price is required"),
  display_dimensions: yup.string().matches(/^(null|[a-zA-Z0-9\s]*)$/),
  serial_number: yup //only numbers and accepts null
    .number()
    .required(),
});

const AddAsset = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [addDialog, setAddDialog] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [osOptions, setOsOptions] = useState([]);
  const [categoryState, setCategoryState] = useState("");
  const [brandState, setBrandState] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  let categoryValue = watch("asset_name");
  let brandValue = watch("brand");

  useEffect(() => {
    if (categoryState === "Mouse") {
      setValue("ram", "");
      setValue("display_dimensions", "");
      setValue("memory", "");
      setValue("processor", "");
      setValue("os", "");
      setValue("os_version", "");
    }
  }, [categoryState]);
  useEffect(() => {
    if (categoryValue === "Laptop") {
      setCategoryId(1);
      setCategoryState("Laptop");
      setBrandOptions(["Dell", "Lenovo", "HP"]);
    } else if (categoryValue === "Macbook") {
      setCategoryId(2);
      setCategoryState("Macbook");
      setBrandOptions(["Apple"]);
    } else if (categoryValue === "Mouse") {
      setCategoryId(3);
      setCategoryState("Mouse");
      setBrandOptions(["Logitech", "Dell", "Zebronics"]);
    }
    if (categoryValue === "Laptop" || categoryValue === "Macbook") {
      setOsOptions(["windows", "macos", "linux", "chromeos"]);
    }
  }, [categoryValue]);
  //
  useEffect(() => {
    if (categoryState === "Laptop" && brandValue === "HP") {
      setModelOptions(["HP Model 1", "HP Model 2"]);
      setBrandState("HP");
    } else if (categoryState === "Laptop" && brandValue === "Dell") {
      setModelOptions(["Dell Model 1", "Dell Model 2"]);
    } else if (categoryState === "Laptop" && brandValue === "Lenovo") {
      setModelOptions(["Lenovo Model 1", "Lenovo Model 2"]);
    } else if (categoryState === "Macbook" && brandValue === "Apple") {
      setModelOptions(["Macbook 1", "Macbook 2", "Macbook 3"]);
    } else if (categoryState === "Mouse" && brandValue === "Dell") {
      setModelOptions(["Dell Mouse 1", "Dell Mouse 2"]);
    } else if (categoryState === "Mouse" && brandValue === "Logitech") {
      setModelOptions(["Logitech Mouse 1", "Logitech Mouse 2"]);
    } else if (categoryState === "Mouse" && brandValue === "Zebronics") {
      setModelOptions(["Zebronics Mouse 1", "Zebronics Mouse 2"]);
    }
  }, [categoryState, brandValue]);
  //mouse
  let brandMenuOptions = brandOptions.map((item, index) => (
    <MenuItem value={item} key={index}>
      {item}
    </MenuItem>
  ));

  let modelMenuOptions = modelOptions.map((item, index) => (
    <MenuItem value={item} key={index}>
      {item}
    </MenuItem>
  ));
  let osMenuOptions = osOptions.map((item, index) => (
    <MenuItem value={item} key={index}>
      {item}
    </MenuItem>
  ));

  const labelStyles = {
    fontSize: "0.85em",
  };
  const selectLabelStyles = {
    fontSize: "0.85em",
  };
  const checkLabelStyles = {
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.6)",
  };

  const postData = async (formData) => {
    try {
      formData.asset_category_id = categoryId;
      formData.allocation_status = false;
      
      // console.log(formData);

      const jsonString = JSON.stringify(formData);

      console.log(jsonString);
      const response = await axios.post(
        config.API_ENDPOINT + "v1/Assets",
        jsonString,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setAddDialog(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (formData) => {
    console.log(formData);
    console.log("success");
    postData(formData);
  };
  const handleClear = () => {
    reset();
    categoryValue = null;
    brandValue = null;
    setCategoryState(null);
    setBrandState(null);
    console.log(categoryValue);
  };
  //
  return (
    <div className="addAsset ">
      <div className="addAssetTitle">Add Asset</div>
      {/*                                    basic */}
      <Dialog
        open={addDialog}
        onClose={() => {
          setAddDialog(false);
        }}
        aria-labelledby="dialog-title"
        aria-aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Asset added
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddDialog(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="basic">
          <div className="basictitle">Basic</div>
          <div className="inputs">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: "13px",
              }}
            >
              <Box>
                <Controller
                  name="asset_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel id="category-label" style={selectLabelStyles}>
                        Category
                      </InputLabel>
                      <Select
                        {...field}
                        style={{ height: "30px", width: "180px" }}
                        label="Category"
                      >
                        <MenuItem value="Laptop" key="Laptop">
                          Laptop
                        </MenuItem>
                        <MenuItem value="Macbook" key="Macbook">
                          Macbook
                        </MenuItem>
                        <MenuItem value="Mouse" key="Mouse">
                          Mouse
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="brand"
                  control={control}
                  required
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel id="category-label" style={selectLabelStyles}>
                        Brand
                      </InputLabel>
                      <Select
                        {...field}
                        style={{ height: "30px", width: "180px" }}
                        label="Brand"
                      >
                        {brandMenuOptions}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="model"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel id="category-label" style={selectLabelStyles}>
                        Model
                      </InputLabel>
                      <Select
                        {...field}
                        style={{ height: "30px", width: "180px" }}
                      >
                        {modelMenuOptions}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: "7px",
              }}
            >
              <Box>
                <Controller
                  name="os"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      size="small"
                      required={categoryState !== "Mouse"}
                    >
                      <InputLabel
                        id="category-label"
                        disabled={categoryState === "Mouse"}
                        style={selectLabelStyles}
                      >
                        OS
                      </InputLabel>
                      <Select
                        {...field}
                        style={{ height: "30px", width: "180px" }}
                        disabled={categoryState === "Mouse"}
                      >
                        {osMenuOptions}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="OS Version"
                  required={categoryState !== "Mouse"}
                  disabled={categoryState === "Mouse"}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  {...register("os_version")}
                  placeholder={"OS Version..."}
                  error={!!errors.display_dimensions}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      width: "180px",
                    },
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label={<span>Price &#8377;</span>}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  {...register("price")}
                  placeholder={"Price..."}
                  error={!!errors.price}
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
                justifyContent: "space-around",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Box width="180px">
                <Controller
                  name="owned_by_proxima"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          onChange={(e) => field.onChange(e.target.checked)}
                          checked={field.value}
                          size="small"
                        />
                      }
                      label={
                        <Typography
                          variant="subtitle2"
                          style={checkLabelStyles}
                        >
                          Owned by Proxima
                        </Typography>
                      }
                    />
                  )}
                />
              </Box>
              <Box width="180px"></Box>
              <Box width="180px"></Box>
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
                justifyContent: "space-around",
              }}
            >
              <Box width="180px">
                <TextField
                  fullWidth
                  required={categoryState !== "Mouse"}
                  disabled={categoryState === "Mouse"}
                  label="RAM(gb)"
                  {...register("ram")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  error={!!errors.ram}
                  variant="outlined"
                  // required
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
                  label="Hard Disk Memory(gb)"
                  required={categoryState !== "Mouse"}
                  disabled={categoryState === "Mouse"}
                  {...register("memory")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  // required
                  error={!!errors.memory}
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
              <Box width="180px">
                <TextField
                  // value={text}
                  fullWidth
                  disabled={categoryState === "Mouse"}
                  label="Processor"
                  required={categoryState !== "Mouse"}
                  {...register("processor")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  error={!!errors.processor}
                  variant="outlined"
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
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "12px",
                justifyContent: "space-around",
              }}
            >
              <Box width="180px" style={{marginTop:"1.5%"}}>
                <TextField
                  fullWidth
                  required
                  label="Serial Number"
                  {...register("serial_number")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  error={!!errors.serial_number}
                  variant="outlined"
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
              <Box width="180px">
                <Controller
                  name="purchase_date"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        {...field}
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "30px",
                            width: "180px",
                            marginTop: "8%",
                          },
                        }}
                        label={
                          <div style={{fontSize:"14px",fontWeight:"400", position:"relative", top:"5px"}}>
                            Purchase Date
                          </div>
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{
                              style: {
                                fontSize: "0.85em",
                              },
                            }}
                          />
                        )}
                        value={field.value ? new Date(field.value) : null}
                        onChange={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd") : null
                          );
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Box>
              <Box width="180px">
                <Controller
                  name="carepaq_expiry_status"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        {...field}
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "30px",
                            width: "180px",
                            marginTop: "8%",
                          },
                        }}
                        label={
                          <div style={{fontSize:"14px",fontWeight:"400", position:"relative", top:"5px"}}>
                            CarePaqExp Date
                          </div>
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                          />
                        )}
                        value={field.value ? new Date(field.value) : null}
                        onChange={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd") : null
                          );
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Box>
            </div>
            
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Box width="180px">
                <Controller
                  name="warranty_status"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="category-label" style={selectLabelStyles}>
                        Warranty Status
                      </InputLabel>
                      <Select
                        {...field}
                        InputLabelProps={{
                          style: labelStyles,
                        }}
                        style={{ height: "30px", width: "180px" }}
                      >
                        <MenuItem value="within warranty" key="Within Warranty">
                          Within Warranty
                        </MenuItem>
                        <MenuItem value="expired" key="expired">
                          Expired
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
              <Box width="180px">
                <TextField
                  disabled={categoryState === "Mouse"}
                  fullWidth
                  label="Display Dimensions"
                  {...register("display_dimensions")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  error={!!errors.display_dimensions}
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
              <Box width="180px"></Box>
            </div>
          </div>
        </div>
        <div className="buttons">
          <Stack spacing={2} direction="row">
            <Button variant="contained" size="small" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="contained" type="submit" size="small">
              Add Asset
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
};
export default AddAsset;

