import React, { useState, useEffect, useCallback } from "react";
import { Button, Stack } from "@mui/material";
import "../Assets/AddAsset.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Select, InputAdornment } from "@mui/material";
import { FormControlLabel, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import MenuItem from "@mui/material/MenuItem";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Config from "../config";
import { FormControl, InputLabel } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
const schema = yup.object().shape({
  ram: yup //only numbers and alphabets no spl char and atleast one number and one alphabet
    .string()
    .required("ram is required")
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9]).*$/),
  hdm: yup //only numbers and alphabets no spl char and atleast one number and one alphabet
    .string()
    .required("harddiskmemory is required")
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9]).*$/),
  osVersion: yup.string().matches(/^[a-zA-Z0-9.]+$/),
  processor: yup
    .string()
    .required("processor is required")
    .matches(/^[a-zA-Z0-9]+$/),
});

const AddAsset = ({ editingData, editingMode, undoEdit }) => {
  const endpoint = Config.API_ENDPOINT;
  let title = editingMode ? "Edit Asset" : "Add Asset";
  // let preloadedValues=editingData;
  // console.log(preloadedValues.name);
  // const [btn, setBtn]=useState("Add Asset");
  // if(editingMode){setBtn("Edit Asset")}
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
    resetField,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues:preloadedValues
  });

  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [giveChance, setGiveChance] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [osOptions, setOsOptions] = useState([]);
  const [categoryState, setCategoryState] = useState("");
  const [brandState, setBrandState] = useState("");

  const categoryValue = watch("category");
  const brandValue = watch("brand");

  useEffect(() => {
    if (categoryValue === "Laptop") {
      setCategoryState("laptop");
      setBrandOptions(["Dell", "Lenovo", "HP"]);
    } else if (categoryValue === "Macbook") {
      setCategoryState("macbook");
      setBrandOptions(["Apple"]);
    } else if (categoryValue === "Mouse") {
      setCategoryState("mouse");
      setBrandOptions(["Logitech", "Dell", "Zebronics"]);
    }
    if (categoryValue === "Laptop" || categoryValue === "Macbook") {
      setOsOptions(["windows", "macos", "linux", "chromeos"]);
    }
  }, [categoryValue]);

  useEffect(() => {
    if (categoryState === "laptop" && brandValue === "HP") {
      setModelOptions(["HP Model 1", "HP Model 2"]);
      setBrandState("HP");
    } else if (categoryState === "laptop" && brandValue === "Dell") {
      setModelOptions(["Dell Model 1", "Dell Model 2"]);
    } else if (categoryState === "laptop" && brandValue === "Lenovo") {
      setModelOptions(["Lenovo Model 1", "Lenovo Model 2"]);
    } else if (categoryState === "macbook" && brandValue === "Apple") {
      setModelOptions(["Macbook 1", "Macbook 2", "Macbook 3"]);
    } else if (categoryState === "mouse" && brandValue === "Dell") {
      setModelOptions(["Dell Mouse 1", "Dell Mouse 2"]);
    } else if (categoryState === "mouse" && brandValue === "Logitech") {
      setModelOptions(["Logitech Mouse 1", "Logitech Mouse 2"]);
    } else if (categoryState === "mouse" && brandValue === "Zebronics") {
      setModelOptions(["Zebronics Mouse 1", "Zebronics Mouse 2"]);
    }
  }, [categoryState, brandValue]);

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

  // Rest of your component code

  const labelStyles = {
    fontSize: "0.86rem",
  };
  const checkLabelStyles = {
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.6)",
  };
  const putData = async (formData) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${editingData.id}`,
        formData
      );
      console.log(response);
      setEditDialog(true);
      // undoEdit();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (editDialog) {
      setGiveChance(true);
    }
  }, [editDialog]);
  useEffect(() => {
    if (!editDialog && giveChance) {
      undoEdit();
    }
  }, [editDialog, giveChance]);
  const postData = async (formData) => {
    try {
      // console.log(endpoint)
      // const path= `${endpoint}/v1/Assets`;
      const jsonString = JSON.stringify(formData);
      const response = await axios.post(
        'http://localhost:8000',
        jsonString
      );
      console.log(response);
      setAddDialog(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryChange = (event) => {
    setValue("category", event.target.value);
  };
  const handleFormSubmit = (formData) => {
    console.log(formData);
    console.log("success");
    reset();
    resetField("category");
    if (editingMode) {
      putData(formData);
    }
    if (!editingMode) {
      postData(formData);
    }
  };
  const handleClear = () => {
    reset();
    setValue("category", "");
    setValue("brand", "");
  };
  const abcd = () => {
    // setValue("hdm", "");
  };
  return (
    <div className="addAsset ">
      <div className="addAssetTitle">{title} </div>
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
      <Dialog
        open={editDialog}
        onClose={() => {
          setEditDialog(false);
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
              setEditDialog(false);
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
                marginBottom: "5px",
              }}
            >
              <Box>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        {...field}
                        InputLabelProps={{
                          style: labelStyles,
                        }}
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
                {/* <TextField
                  label="Brand"
                  defaultValue=""
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  select
                  {...register("brand", { required: true })}
                  fullWidth
                  required
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      width: "180px",
                    },
                  }}
                >
                  {brandMenuOptions}
                </TextField> */}
                <Controller
                  name="brand"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel id="category-label">Brand</InputLabel>
                      <Select
                        {...field}
                        InputLabelProps={{
                          style: labelStyles,
                        }}
                        style={{ height: "30px", width: "180px" }}
                        label="Brand"
                        // ...other props for the Select component
                      >
                        {/* options for the Select */}
                        {brandMenuOptions}
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
                marginBottom: "5px",
              }}
            >
              <Box>
                {/* <TextField
                  label="Model"
                  defaultValue=""
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  select
                  required
                  {...register("model", { required: true })}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      width: "180px",
                    },
                  }}
                >
                  {modelMenuOptions}
                </TextField> */}
                <Controller
                  name="model"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel id="category-label">Model</InputLabel>
                      <Select
                        {...field}
                        InputLabelProps={{
                          style: labelStyles,
                        }}
                        style={{ height: "30px", width: "180px" }}

                        // ...other props for the Select component
                      >
                        {/* options for the Select */}
                        {modelMenuOptions}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
              <Box>
                {/* <TextField
                  label="OS"
                  defaultValue=""
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  select
                  {...register("os")}
                  fullWidth
                  required
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                      width: "180px",
                    },
                  }}
                >
                  {osMenuOptions}
                </TextField> */}
                <Controller
                  name="os"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel id="category-label">OS</InputLabel>
                      <Select
                        {...field}
                        // InputLabelProps={{
                        //   style: labelStyles,
                        // }}
                        style={{ height: "30px", width: "180px" }}

                        // ...other props for the Select component
                      >
                        {/* options for the Select */}
                        {osMenuOptions}
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
              }}
            >
              <Box>
                <TextField
                  fullWidth
                  label="OS Version"
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  {...register("osVersion")}
                  placeholder={"OS Version..."}
                  error={!!errors.osVersion}
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
                  {...register("ownedByProxima")}
                  label={
                    <Typography variant="subtitle2" style={checkLabelStyles}>
                      Owned by Proxima
                    </Typography>
                  }
                  control={<Checkbox size="small" />}
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
                  label="RAM(gb)"
                  {...register("ram", {
                    pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^a-zA-Z0-9]).*$/,
                  })}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  error={!!errors.ram}
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
                  label="Hard Disk Memory(gb)"
                  {...register("hdm")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  onChange={abcd}
                  variant="outlined"
                  required
                  error={!!errors.hdm}
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
                  {...register("processor")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  error={!!errors.processor}
                  variant="outlined"
                  required
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
                  {...register("serialNumber")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  error={!!errors.processor} //same as processor
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
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  {...register("purchaseDate")}
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
              </LocalizationProvider> */}
              {/* <Controller
                name="purchaseDate"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TextField
                      {...field}
                      label="Purchase Date"
                      type="date"
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      size="small"
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                          marginBottom: "0px",
                        },
                      }}
                      value={
                        field.value
                          ? format(new Date(field.value), "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}
                    />
                  </LocalizationProvider>
                )}
              /> */}

              <Controller
                name="purchaseDate"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      {...field}
                      label="Purchase Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            style: labelStyles,
                          }}
                        />
                      )}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                          marginBottom: "0px",
                          marginTop: "5px",
                        },
                      }}
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? format(date, "yyyy-MM-dd") : null
                        );
                      }}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
              <Controller
                name="carePaqExpDate"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      {...field}
                      label="Care Paq Exp Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            style: labelStyles,
                          }}
                        />
                      )}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                          marginBottom: "0px",
                          marginTop: "5px",
                          fontSize:"0.2rem"
                        },
                      }}
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? format(date, "yyyy-MM-dd") : null
                        );
                      }}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  {...register("carePaqExpDate")}
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
              </LocalizationProvider> */}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Box width="180px">
                <TextField
                  label="Warranty Status"
                  {...register("warrantyStatus")}
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
                  <MenuItem value="inWarranty">In Warranty</MenuItem>
                  <MenuItem value="expired">Expired</MenuItem>
                </TextField>
              </Box>
              <Box width="180px">
                <TextField
                  // value={text}
                  fullWidth
                  label="Display Dimensions"
                  {...register("displayDimensions")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  error={!!errors.processor} //same as processor
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
            <Button variant="contained" size="small" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="contained" type="submit" size="small">
              {editingMode ? "Edit Asset" : "Add Asset"}
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
};
export default AddAsset;
