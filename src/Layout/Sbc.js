import React, { useState, useEffect } from "react";
import "../Assets/Sbc.css";
import axios from "axios";
import config from "../config";
import {
  Box,
  TextField,
  Select,
  Button,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
// import employeeDetails from "./employeeDetails.json";
// import AssetDetails from "./AssetDetails.json";
//id
const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      backgroundColor: "lightGreen",
      justifyContent: "center",
      color: "black",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      justifyContent: "center",
      backgroundColor: "white",
      fontFamily: "Sans-serif",
      color: "black",
    },
  },
};

const Sbc = () => {
  const { register, handleSubmit, reset } = useForm();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [giveChance, setGiveChance] = useState(false);
  const [error, setError] = useState(false);
  const [employeeProfiles, setEmployeeProfiles] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [allocate, setAllocate] = useState(false);
  const [assetData, setAssetData] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [assetTable, setAssetTable] = useState([]);
  const [tableState, setTableState] = useState(false);
  const [chance, setChance] = useState(false);
  const labelStyles = {
    fontSize: "0.875rem",
  };
  useEffect(() => {
    if (selectedRow) {
      setAllocate(true);
      setAssetData(selectedRow);
      setTableState(false);
      setChance(false);
      console.log(selectedRow);
    }
  }, [selectedRow]);
  
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };
  const replaceUnderscoreWithSpace = (str) => {
    return str.replace(/_/g, " ");
  };
  const stringifyNestedObjects = (value) => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => {
          if (val === null || val === "") {
            return null;
          } else if (typeof val === "boolean") {
            return `${replaceUnderscoreWithSpace(key)}: ${val ? "Yes" : "No"}`;
          } else {
            return `${replaceUnderscoreWithSpace(key)}: ${val}`;
          }
        })
        .filter((item) => item !== null)
        .join(", ");
    }
    return value;
  };
  //   useEffect(()=>{setTableData({info}); console.log(info)},[])
  const postAllocation = async (formData) => {
    console.log(formData.employee_id);
    try {
       await axios.post(
        config.API_ENDPOINT +
          `v1/AssetAllocation/${assetData.asset_id}/${formData.employee_id}${formData.reason?`/${formData.reason}`:''}`
      );
      // console.log(response);
      setDialogOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async (formData) => {
    const queryParams = {
      os: formData.os,
      os_version: formData.os_version,
      model: formData.model,
      ram: formData.ram,
      memory: formData.memory,
      processor: formData.processor,
    };
    
    try {
      console.log(formData);
      await axios
        .get(config.API_ENDPOINT + "v1/Assets/specification", {
          params: queryParams,
        })
        .then((response) => {
          console.log(response);
          if (response.data.assets.length === 0) {
            setTableState(false);
            
          }else{
            setTableState(true);
          setAssetTable(response.data.assets);
          }
          setChance(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = (formData) => {
    console.log(formData);
    setAssetTable([]);
    if (
      formData.os ||
      formData.os_version ||
      formData.model ||
      formData.ram ||
      formData.memory ||
      formData.processor
    ) {
      console.log(formData);
      setError(false);
      getData(formData);
    } else {
      setError(true);
    }
  };
  const handleAllocateSubmit = (formData) => {
    postAllocation(formData);
  };
  const getEmployeeData = async () => {
    try {
      console.log("ayyaa");
      const response = await axios.get(
        config.API_ENDPOINT2+"/v1/EmployeeProfiles"
      );
      const data = response.data;
      console.log(data);
      setEmployeeProfiles(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dialogOpen && !giveChance) {
      setGiveChance(true);
    }
  }, [dialogOpen]);
  useEffect(() => {
    if (!dialogOpen && giveChance) {
      setAllocate(false);
      setAssetTable([]);
    }
  }, [giveChance, dialogOpen]);

  useEffect(() => {
    getEmployeeData();
  }, []);

  const columns = [
    {
      name: "Asset Id",
      selector: (row) => row.asset_id,
    },
    {
      name: "Asset",
      cell: (row) => (
        <a
          href="#"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedRow(row)}
        >
          {row.asset_name}
        </a>
      ),
    },
    
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "OS Version",
      selector: (row) => row.os_version,
    },
  ];

  return (
    <div className="sbcbody">
      {!allocate ? (
        <div>
          <div className="searchByEmployeeHeading">Search By Configuration</div>
          <div className="sbc">
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="row">
                <TextField
                  fullWidth
                  label="OS"
                  {...register("os")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  // placeholder="Hard Disk Memory..."
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                      width: "180px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Os Version"
                  {...register("os_version")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  // placeholder="Hard Disk Memory..."
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                      width: "180px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Model"
                  {...register("model")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  // placeholder="Hard Disk Memory..."
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                      width: "180px",
                    },
                  }}
                />
              </div>
              <div className="row">
                <TextField
                  fullWidth
                  label="RAM"
                  {...register("ram")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  // placeholder="Hard Disk Memory..."
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                      width: "180px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Memory"
                  {...register("memory")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  // placeholder="Hard Disk Memory..."
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                      width: "180px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Processor"
                  {...register("processor")}
                  InputLabelProps={{
                    style: labelStyles,
                  }}
                  variant="outlined"
                  size="small"
                  // placeholder="Hard Disk Memory..."
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                      width: "180px",
                    },
                  }}
                />
              </div>
              <div className="lastrow">
                {error ? (
                  <div className="warning">
                    Please enter at least one Configuration
                  </div>
                ) : (
                  <div></div>
                )}
                <Button
                  variant="outlined"
                  type="submit"
                  size="small"
                  className="searchbtn"
                >
                  Search
                </Button>
              </div>
            </Box>
            <div>
              {tableState && chance && (
                <DataTable
                  //title="Employee Details"
                  columns={columns}
                  data={assetTable}
                  fixedHeader
                  fixedHeaderScrollHeight="45vh"
                  customStyles={tableCustomStyles}
                  // selected={selectedRow}
                  // selectableRows
                  // pagination
                ></DataTable>
              )}
              {!tableState && chance && (
                <div>No Assets with the given Specifications</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
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
              !["employee_id", "employee_name", "allocation_status", "is_active", "reason_for_allocation"].includes(key) &&
              value !== null &&
              value !== "" && (
                <div key={key} className="display">
                  <div className="keyfield" style={{ width: "200px" }}>
                    {capitalizeFirstLetter(replaceUnderscoreWithSpace(key))}:
                  </div>{" "}
                  <div className="valuefield">
                    {stringifyNestedObjects(value)}
                  </div>
                </div>
              )
          )}
            <Box component="form" onSubmit={handleSubmit(handleAllocateSubmit)}>
              <div className="input">
                <div style={{ marginRight: "23%" }}>
                  <TextField
                    label="Employee"
                    required
                    shrink
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
        </div>
      )}
    </div>
  );
};
export default Sbc;
