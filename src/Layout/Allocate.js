import React, { useState, useEffect } from "react";
import "../Assets/Allocate.css";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Box, TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import config from "../config";
const Allocate = ({ allocateDone, id, sbe, sbeName }) => {
  const { register, handleSubmit } = useForm();
  const [assetData, setAssetData] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [giveChance, setGiveChance] = useState(false);
  const [employeeProfiles, setEmployeeProfiles] = useState([]);

  useEffect(() => {
    getAssetData();
    getEmployeeData();
  }, []);
  const getAssetData = async () => {
    try {
      const response = await axios.get(config.API_ENDPOINT + `v1/Assets/${id}`);
      console.log(response.data);
      setAssetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeeData = async () => {
    try {
      const response = await axios.get(
        config.API_ENDPOINT2 + "v1/EmployeeProfiles/NR"
      );
      const data = response.data;
      console.log(data);
      setEmployeeProfiles(data);
    } catch (error) {
      console.log(error);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const replaceUnderscoreWithSpace = (str) => {
    return str.replace(/_/g, " ");
  };

  const stringifyNestedObjects = (value) => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        ?.map(([key, val]) => {
          if (typeof val === "string") {
            return `${replaceUnderscoreWithSpace(key)}: ${val}`;
          } else {
            return `${replaceUnderscoreWithSpace(key)}: ${val}`;
          }
        })
        .filter((item) => item !== null)
        .join(", ");
    }
    return value;
  };

  
  const desiredKeyOrder = [
    "asset_name",
    "brand",
    "model",
    "os",
    "os_version",
    "price",
    "owned_by_proxima",
    "ram",
    "memory",
    "processor",
    "serial_number",
    "purchase_date",
    "carepaq_expiry_status",
    "warranty_status",
    "display_dimensions",
    "modified_date"
  ];
  const labelStyles = {
    fontSize: "0.875rem",
  };
  const postAllocation = async (formData) => {
    console.log(formData.employee_id);
    console.log(formData.reason);
    if (!sbeName) {
      try {
        const response = await axios.post(
          config.API_ENDPOINT +
            `v1/AssetAllocation/${id}/${formData.employee_id}${
              formData.reason ? `/${formData.reason}` : ""
            }`
        );
        console.log(response);
        setDialogOpen(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log(id);
        const response = await axios.post(
          config.API_ENDPOINT +
            `v1/AssetAllocation/${id}/${sbe}${
              formData.reason ? `/${formData.reason}` : ""
            }`
        );
        console.log(response);
        setDialogOpen(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (dialogOpen && !giveChance) {
      setGiveChance(true);
    }
  }, [dialogOpen]);
  useEffect(() => {
    if (!dialogOpen && giveChance) {
      allocateDone();
    }
  }, [giveChance, dialogOpen]);
  const handleFormSubmit = (formData) => {
    postAllocation(formData);
  };
  return (
    <div className="allocatebody">
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        aria-labelledby="dialog-title"
        aria-aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Asset allocated
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <div className="title">Asset Details</div>

      {/* {Object.entries(assetData)?.map(
        ([key, value]) =>
          ![
            "employee_id",
            "employee_name",
            "allocation_status",
            "is_active",
            "reason_for_allocation",
            "allocation_date",
            "asset_id",
            "asset_category_id",
            "category_name",
          ].includes(key) &&
          value !== null &&
          value !== "" && (
            <div key={key} className="display">
              <div className="keyfield" style={{ width: "200px" }}>
                {capitalizeFirstLetter(replaceUnderscoreWithSpace(key))}
              </div>
              {!(typeof value === "boolean") ? (
                <div className="valuefield">
                  : {key === "ram" || key === "memory"
                    ? `${stringifyNestedObjects(value)} gb`
                    : key === "price"
                    ? `₹ ${stringifyNestedObjects(value)}`
                    : stringifyNestedObjects(value)}
                </div>
              ) : (
                <div className="valuefield">: {`${value ? "Yes" : "No"}`}</div>
              )}
            </div>
          )
      )} */}

{
    desiredKeyOrder.map(key =>
      assetData[key] !== null && assetData[key] !== "" && (
        <div key={key} className="display">
          <div className="keyfield" style={{ width: "200px" }}>
            {capitalizeFirstLetter(replaceUnderscoreWithSpace(key))}
          </div>
          <div className="valuefield">
          : {key === "ram" || key === "memory"
            ? `${stringifyNestedObjects(assetData[key])} gb`
            : key === "price"
            ? `₹ ${stringifyNestedObjects(assetData[key])}`
            : typeof assetData[key] === "boolean"
            ? `${assetData[key] ? "Yes" : "No"}`
            : stringifyNestedObjects(assetData[key])}
        </div>
        </div>
      )
    )
  }
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="input">
          <div style={{ marginRight: "23%" }}>
            {sbe === null ? (
              <TextField
                label="Employee"
                required
                InputLabelProps={{
                  style: labelStyles,
                }}
                select
                {...register("employee_id")}
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
                {employeeProfiles?.map((employee) => (
                  <MenuItem
                    key={employee.employee_id}
                    value={employee.employee_id}
                  >
                    {employee.employee_name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <div>
                <TextField
                  label="Employee"
                  value={sbeName}
                  disabled
                  InputLabelProps={{
                    style: labelStyles,
                  }}
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
                ></TextField>
              </div>
            )}
          </div>
          <div>
            <TextareaAutosize
              style={{ minHeight: "12%" }}
              {...register("reason")}
              placeholder="Reason for Allocation"
            />
          </div>
        </div>
        <Button variant="outlined" type="submit" size="small">
          Allocate Asset
        </Button>
      </Box>
    </div>
  );
};
export default Allocate;


