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
  //not laptop
  asset_name: yup.string().required(),
  brand: yup.string().required(),
  model: yup.string(),
  os: yup.string(),
  os_version: yup.string().matches(/^(null|[a-zA-Z0-9\s]*)$/), //only numbers, alphabets and space and accepts null
  price: yup.number().required(),
  ram: yup //only numbers and accepts null
    .string()
    .matches(/^(\d+|null)?$/),
  memory: yup //only numbers and accepts null
    .string()
    .matches(/^(\d+|null)?$/),
  processor: yup.string().matches(/^(null|[a-zA-Z0-9\s]*)$/), //only numbers, alphabets and space and accepts null
  display_dimensions: yup.string().matches(/^(null|[a-zA-Z0-9\s]*)$/),
  serial_number: yup //only numbers and accepts null
    .number()
    .required(),
});

const schema2 = yup.object().shape({
  //when laptop
  asset_name: yup.string().required(),
  brand: yup.string().required(),
  model: yup.string(),
  os: yup.string().required(),
  os_version: yup
    .string()
    .matches(/^(null|[a-zA-Z0-9\s]*)$/)
    .required(), //only numbers, alphabets and space and accepts null
  price: yup.number().required(),
  ram: yup //only numbers and accepts null
    .string()
    .matches(/^(\d+|null)?$/)
    .required(),
  memory: yup //only numbers and accepts null
    .string()
    .matches(/^(\d+|null)?$/)
    .required(),
  processor: yup
    .string()
    .matches(/^(null|[a-zA-Z0-9\s]*)$/)
    .required(), //only numbers, alphabets and space and accepts null
  display_dimensions: yup.string().matches(/^(null|[a-zA-Z0-9\s]*)$/),
  serial_number: yup //only numbers and accepts null
    .number()
    .required(),
});

const AddAsset = () => {
  const [addDialog, setAddDialog] = useState(false);
  const [brandOptions, setBrandOptions] = useState([]);
  const [osOptions, setOsOptions] = useState(["Windows", "Linux", "Mac"]);
  const [categoryState, setCategoryState] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [isRequired, setIsRequired] = useState(false);

  const selectedSchema = categoryState !== "Mouse" ? schema2 : schema;
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(selectedSchema),
  });
  let categoryValue = watch("asset_name");

  useEffect(() => {
    setValue("brand", "");
    setValue("model", "");
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
      setBrandOptions(["Dell", "Lenovo", "HP", "Macbook"]);
    } else if (categoryValue === "Mouse") {
      setCategoryId(2);
      setCategoryState("Mouse");
      setBrandOptions(["Logitech", "Dell", "Zebronics"]);
    }
  }, [categoryValue]);

  let brandMenuOptions = brandOptions.map((item, index) => (
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
      setTimeout(setIsRequired(true), 10000);
      formData.asset_category_id = categoryId;
      formData.allocation_status = false;
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
    setCategoryState(null);
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
                  {...register("asset_name")}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required={isRequired}>
                      <InputLabel
                        id="category-label"
                        style={selectLabelStyles}
                        error={!!errors.asset_name}
                      >
                        Category
                      </InputLabel>
                      <Select
                        {...field}
                        style={{ height: "30px", width: "180px" }}
                        label="Category"
                        error={!!errors.asset_name}
                      >
                        <MenuItem value="Laptop" key="Laptop">
                          Laptop
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
                  {...register("brand")}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <InputLabel
                        id="category-label"
                        style={selectLabelStyles}
                        error={!!errors.brand}
                      >
                        Brand
                      </InputLabel>
                      <Select
                        {...field}
                        style={{ height: "30px", width: "180px" }}
                        label="Brand"
                        error={!!errors.brand}
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
                    <TextField
                      fullWidth
                      label="Model"
                      {...field}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      variant="outlined"
                      size="small"
                      placeholder={"Model..."}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                        },
                      }}
                    />
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
                  {...register("os")}
                  // {...(categoryState === "Laptop" ? register("os") : {})}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      size="small"
                      // required={categoryState !== "Mouse"}
                    >
                      <InputLabel
                        id="category-label"
                        disabled={categoryState === "Mouse"}
                        style={selectLabelStyles}
                        // error={!!errors.os}
                        error={categoryState !== "Mouse" && !!errors.os}
                      >
                        OS
                      </InputLabel>
                      <Select
                        {...field}
                        style={{ height: "30px", width: "180px" }}
                        disabled={categoryState === "Mouse"}
                        // error={!!errors.os}
                        error={categoryState !== "Mouse" && !!errors.os}
                      >
                        {osMenuOptions}
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
              
              <Box>
                <Controller
                  name="os_version"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="OS Version"
                      {...field}
                      disabled={categoryState === "Mouse"}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      variant="outlined"
                      size="small"
                      placeholder="OS Version..."
                      error={categoryState !== "Mouse" && !!errors.os_version}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Box>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={<span>Price &#8377;</span>}
                      {...field}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      variant="outlined"
                      size="small"
                      placeholder="Price..."
                      error={!!errors.price}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                        },
                      }}
                    />
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
        {/*                                                                   details */}
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
                <Controller
                  name="ram"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      disabled={categoryState === "Mouse"}
                      label="RAM(gb)"
                      {...field}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      error={categoryState !== "Mouse" && !!errors.ram}
                      variant="outlined"
                      size="small"
                      placeholder="RAM"
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Box width="180px">
                <Controller
                  name="memory"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Hard Disk Memory(gb)"
                      disabled={categoryState === "Mouse"}
                      {...field}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      variant="outlined"
                      error={categoryState !== "Mouse" && !!errors.memory}
                      size="small"
                      placeholder="Hard Disk Memory..."
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Box width="180px">
                <Controller
                  name="processor"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      disabled={categoryState === "Mouse"}
                      label="Processor"
                      {...field}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      error={categoryState !== "Mouse" && !!errors.processor}
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
                  )}
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
              <Box width="180px" style={{ marginTop: "1.5%" }}>
                <Controller
                  name="serial_number"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Serial Number"
                      {...field}
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
                  )}
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
                          <div
                            style={{
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: "400",
                              position: "relative",
                              top: "5px",
                            }}
                          >
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
                          <div
                            style={{
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: "400",
                              position: "relative",
                              top: "5px",
                            }}
                          >
                            CarePaqExp Date
                          </div>
                        }
                        renderInput={(params) => <TextField {...params} />}
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
                <Controller
                  name="display_dimensions"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      disabled={categoryState === "Mouse"}
                      fullWidth
                      label="Display Dimensions"
                      {...field}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      variant="outlined"
                      error={
                        categoryState === "Laptop" &&
                        !!errors.display_dimensions
                      }
                      size="small"
                      placeholder="Display Dimensions"
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "30px",
                          width: "180px",
                        },
                      }}
                    />
                  )}
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
