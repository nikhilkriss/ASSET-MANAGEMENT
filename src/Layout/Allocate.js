import React, { useState, useEffect } from "react";
import "../Assets/Allocate.css";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Box, TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
// import AssetInfo from "./AssetInfo.json";
import config from "../config";
const Allocate = ({ allocateDone, id, sbe, sbeName }) => {
  const { register, handleSubmit } = useForm();
  const [assetData, setAssetData] = useState("");
  // const [employeeList, setEmployeeList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [giveChance, setGiveChance] = useState(false);
  const [employeeProfiles, setEmployeeProfiles] = useState([]);
  // const [sbeName, setSbeName] = useState(null);

  useEffect(() => {
    getAssetData();
    console.log("hii andi");
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
    console.log("qwert")
    try {
      console.log("hii");
      const response = await axios.get(
        config.API_ENDPOINT +"/v1/EmployeeProfiles"
      );
      const data = response.data;
      console.log(data);
      setEmployeeProfiles(data);
    } catch (error) {
      console.log(error);
    }
  };

  //hello
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const replaceUnderscoreWithSpace = (str) => {
    return str.replace(/_/g, " ");
  };
  // const formatDateTime = (dateTimeStr) => {
  //   // Assuming the input dateTimeStr is in the format: "Sat, 29 Jul 2023 00:00:00 GMT"
  //   const datePart = dateTimeStr.split(", ")[1];
  //   return datePart.substring(0, datePart.lastIndexOf(":")); // Removing the time part
  // };
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const stringifyNestedObjects = (value) => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => {
          if (val === null || val === "") {
            return null;
          } else if (typeof val === "boolean") {
            return `${replaceUnderscoreWithSpace(key)}: ${val ? "Yes" : "No"}`;
          } else if (
            key === "carepaq_expiry_status" &&
            typeof val === "string"
          ) {
            return `${replaceUnderscoreWithSpace(key)}: ${formatDateTime(val)}`;
          } else {
            return `${replaceUnderscoreWithSpace(key)}: ${val}`;
          }
        })
        .filter((item) => item !== null)
        .join(", ");
    }
    return value;
  };

  const labelStyles = {
    fontSize: "0.875rem",
  };
  const postAllocation = async (formData) => {
    console.log(formData.employee_id);
    console.log(formData.reason);
    // allocateDone();
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

      {Object.entries(assetData).map(
        ([key, value]) =>
          ![
            "employee_id",
            "employee_name",
            "allocation_status",
            "is_active",
            "reason_for_allocation"
          ].includes(key) &&
          value !== null &&
          value !== "" && (
            <div key={key} className="display">
              <div className="keyfield" style={{ width: "200px" }}>
                {capitalizeFirstLetter(replaceUnderscoreWithSpace(key))}:
              </div>{" "}
              <div className="valuefield">{stringifyNestedObjects(value)}</div>
            </div>
          )
      )}
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
                {employeeProfiles.map((employee) => (
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
                  // {...register("employee_id")}
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
