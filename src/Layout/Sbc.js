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
      fontSize: "13px",
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
  // const [employeeList, setEmployeeList] = useState([]);
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
    "modified_date",
  ];
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

  const postAllocation = async (formData) => {
    console.log(formData.employee_id);
    try {
      await axios.post(
        config.API_ENDPOINT +
          `v1/AssetAllocation/${assetData.asset_id}/${formData.employee_id}${
            formData.reason ? `/${formData.reason}` : ""
          }`
      );
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
          } else {
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
    setChance(false);
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
      name: "Asset Name",
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
      name: "Configuration",
      cell: (row) => (
        <div>
          <span>{row.os}{row.os ? ', ' : ''}</span>
          <span><span>{row.ram ? 'Ram:' : ''}</span> {row.ram}<span>{row.ram ? 'gb, ' : ''}</span></span>
          <span><span>{row.memory ? 'Memory:' : ''}</span> {row.memory}<span>{row.memory ? 'gb, ' : ''}</span></span>
          <span>{row.processor}{row.processor ? ', ' : ''}</span>
          <span>{row.serial_number}</span>
        </div>
      ),
      // width: "13%"
    },
  ];
  const handleClear = () => {
    reset();
  };

  return (
    <div className="sbcbody">
      {!allocate ? (
        <div>
          <div className="searchByConfigHeading">Search By Configuration</div>
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
                      backgroundColor:"white"
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
                      backgroundColor:"white"
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
                      backgroundColor:"white"
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
                      backgroundColor:"white"
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
                      backgroundColor:"white"
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
                      backgroundColor:"white"
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
                <div style={{}}>
                <Button
                  variant="contained"
                  onClick={handleClear}
                  size="small"
                  className="searchbtn"
                  style={{marginRight:"15px"}}
                >
                  Clear All
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  size="small"
                  className="searchbtn"
                >
                  Search
                </Button>
                </div>
              </div>
            </Box>
            <div>
              {tableState && chance && (
                <DataTable
                  columns={columns}
                  data={assetTable}
                  fixedHeader
                  fixedHeaderScrollHeight="45vh"
                  customStyles={tableCustomStyles}
                ></DataTable>
              )}
              {!tableState && chance && (
                <div className="warning">
                  No Unallocated Assets with the given Configurations
                </div>
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

            {desiredKeyOrder.map(
              (key) =>
                assetData[key] !== null &&
                assetData[key] !== "" && (
                  <div key={key} className="display">
                    <div className="keyfield" style={{ width: "200px" }}>
                      {capitalizeFirstLetter(replaceUnderscoreWithSpace(key))}
                    </div>
                    <div className="valuefield">
                      :{" "}
                      {key === "ram" || key === "memory"
                        ? `${stringifyNestedObjects(assetData[key])} gb`
                        : key === "price"
                        ? `₹ ${stringifyNestedObjects(assetData[key])}`
                        : typeof assetData[key] === "boolean"
                        ? `${assetData[key] ? "Yes" : "No"}`
                        : stringifyNestedObjects(assetData[key])}
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
                    {employeeProfiles?.map((employee) => (
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
