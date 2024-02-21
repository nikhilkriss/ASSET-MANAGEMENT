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
const EditAsset = ({ editingData, undoEdit }) => {
  const selectedSchema = editingData?.asset_name !== "Mouse" ? schema2 : schema;
  
  console.log(editingData);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    resetField,
    setValue,
  } = useForm({
    resolver: yupResolver(selectedSchema),
    defaultValues: {
      asset_name: editingData?.asset_name || "",
      brand: editingData?.brand || "",
      model: editingData?.model || "",
      os: editingData?.os || "",
      os_version: editingData?.os_version || "",
      ram: editingData?.ram || "",
      processor: editingData?.processor || "",
      memory: editingData?.memory || "",
      serial_number: editingData?.serial_number || "",
      purchase_date: editingData?.purchase_date || "",
      carepaq_expiry_status: editingData?.carepaq_expiry_status || "",
      display_dimensions: editingData?.display_dimensions || "",
      warranty_status: editingData?.warranty_status || "",
      owned_by_proxima: editingData?.owned_by_proxima || "",
      price: editingData?.price || "",
    },
  });

  const [editDialog, setEditDialog] = useState(false);
  const [giveChance, setGiveChance] = useState(false);

  console.log(editingData);
  const putData = async (formData) => {
    try {
      formData.purchase_date = formData.purchase_date ? formData.purchase_date : null;
      formData.carepaq_expiry_status = formData.carepaq_expiry_status
        ? formData.carepaq_expiry_status
        : null;
      formData.asset_id = editingData.asset_id;
      formData.owned_by_proxima = editingData.owned_by_proxima ? true : false;
      const jsonString = JSON.stringify(formData);
      console.log(jsonString);
      const response = await axios.put(
        config.API_ENDPOINT + "v1/Assets",
        jsonString,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setEditDialog(true);
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
  const labelStyles = {
    fontSize: "0.86rem",
  };
  const checkLabelStyles = {
    fontSize: "0.87rem",
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.6)",
  };
  const handleFormSubmit = (formData) => {
    console.log(formData);
    putData(formData);
  };
  const handleClear = () => {
    setValue("ram", "");
    setValue("memory", "");
    setValue("processor", "");
    setValue("serial_number", "");
    setValue("purchase_date", "");
    setValue("carepaq_expiry_status", "");
    setValue("warranty_status", "");
    setValue("display_dimensions", "");
  };

  return (
    <div className="addAsset ">
      <div className="addAssetTitle">Edit Asset</div>
      {/*                                    basic */}

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
            Asset edited
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
                marginBottom: "12px",
              }}
            >
              <Box>
                <TextField
                  fullWidth
                  disabled
                  label="Category"
                  {...register("asset_name")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  required
                  size="small"
                  placeholder="Category..."
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
                  disabled
                  label="Brand"
                  {...register("brand")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  required
                  size="small"
                  placeholder="Brand..."
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
                  disabled
                  label="Model"
                  {...register("model")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  required
                  size="small"
                  placeholder="Model..."
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
                marginBottom: "6px",
              }}
            >
              <Box>
                <TextField
                  fullWidth
                  disabled
                  label="OS"
                  {...register("os")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  required
                  size="small"
                  placeholder="Model..."
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
                  disabled
                  label="OS Version"
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  {...register("os_version")}
                  placeholder={"OS Version..."}
                  error={!!errors.os_version}
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
                  disabled
                  // label="Price &#8377"
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
            >
              <Box width="180px">
                <Controller
                  name="owned_by_proxima"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      fullWidth
                      label={
                        <Typography
                          variant="subtitle2"
                          style={checkLabelStyles}
                          
                        >
                          Owned by Proxima
                        </Typography>
                      }
                      control={
                        <Checkbox
                          size="small"
                          checked={field.value}
                          onChange={field.onChange}
                          disabled
                        />
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
                // marginBottom: "12px",
                marginTop: "",
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
                      disabled={editingData?.asset_name === "Mouse"}
                      label="RAM(gb)"
                      {...field}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      error={!!errors.ram}
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
                      disabled={editingData?.asset_name === "Mouse"}
                      label="Hard Disk Memory(gb)"
                      {...field}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      error={!!errors.memory}
                      variant="outlined"
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
                      disabled={editingData?.asset_name === "Mouse"}
                      label="Processor"
                      {...field}
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
              {/* <Box width="180px" style={{ marginTop: "1.5%" }}>
                <TextField
                  fullWidth
                  label="Serial Number"
                  {...register("serial_number")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  error={!!errors.serial_number} //same as processor
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
              </Box> */}
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
                  defaultValue="within warranty"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <InputLabel
                        id="category-label"
                        style={{ fontSize: "0.87em" }}
                      >
                        Warranty Status
                      </InputLabel>
                      <Select
                        {...field}
                        InputLabelProps={{
                          style: labelStyles,
                        }}
                        style={{ height: "30px", width: "180px" }}
                      >
                        <MenuItem value="within warranty">
                          Within Warranty
                        </MenuItem>
                        <MenuItem value="expired">Expired</MenuItem>
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
                      fullWidth
                      disabled={editingData?.asset_name === "Mouse"}
                      label="Display Dimensions"
                      {...field}
                      InputLabelProps={{
                        style: labelStyles,
                      }}
                      error={!!errors.display_dimensions}
                      variant="outlined"
                      size="small"
                      placeholder="Display Dimensions..."
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
              Edit Asset
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
};
export default EditAsset;
