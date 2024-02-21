import React, { useState, useEffect } from "react";
import "../Assets/Sbe.css";
import { FormControl, Stack, TextField, TextareaAutosize } from "@mui/material";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Box } from "@mui/material";
import config from "../config";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
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
      fontSize: "14px",
      justifyContent: "center",
      backgroundColor: "white",
      fontFamily: "Sans-serif",
      color: "black",
    },
  },
};

const Sbe = ({ sbeAllocation }) => {
  const { register, handleSubmit } = useForm();
  const [searchName, setSearchName] = useState(null);
  const [searchId, setSearchId] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [nameErr, setNameErr] = useState(false);
  const [idErr, setIdErr] = useState(false); 
  const [deallocatePage, setDeallocatePage] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [giveChance, setGiveChance] = useState(false);
  const [assetData, setAssetData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);

  const [tableState, setTableState] = useState(false);

  const [allocateDabba, setAllocateDabba] = useState(false);
  const [noEmp, setNoEmp] = useState(false);
  const [passingId, setPassingId] = useState(null);
  const [passingName, setPassingName] = useState(null);
  const [searchChance, setSearchChance] = useState(false);
  useEffect(() => {
    setEmployeeId(null);
    setEmployeeName(null);
  }, []);
  const searchHandler = () => {
    //validation
    setAllocateDabba(false);
    setNoEmp(false);
    setTableState(false);
    setEmployeeId(null);
    setEmployeeName(null);
    setSearchChance(!searchChance);
    if (!searchName && !searchId) {
      setNameErr(true);
      setIdErr(true);
    } else {
      setNameErr(false);
      setIdErr(false);
      setEmployeeId(searchId);
      setEmployeeName(searchName);
    }
  };
  useEffect(() => {
    if (employeeId || employeeName) {
      console.log(employeeName);
      console.log(employeeId);
      let path = "";
      if (employeeId && employeeName) {
        path =
          config.API_ENDPOINT2 +
          `v1/EmployeeProfiles/${employeeId}/${employeeName}`;
      } else if (employeeName && !employeeId) {
        path =
          config.API_ENDPOINT2 +
          `v1/EmployeeProfiles/EmployeeName/${employeeName}`;
      } else if (employeeId && !employeeName) {
        path = config.API_ENDPOINT2 + `v1/EmployeeProfiles/${employeeId}`;
      }
      console.log(path);
      axios
        .get(path)
        .then((res) => {
          console.log(res);
          console.log(res.data.employees.length);
          if (res.data.employees.length === 0) {
            //no emp
            setNoEmp(true);
            setAllocateDabba(false);
            setTableState(false);
          } else if (res.data.employees.length > 0) {
            setNoEmp(false);
            setAllocateDabba(false);
            setPassingId(res.data.employees[0].employee_id);
            setPassingName(res.data.employees[0].employee_name);
            console.log(noEmp);
            axios
              .get(
                config.API_ENDPOINT +
                  `v1/AssetAllocation${employeeName ? "/" + employeeName : ""}${
                    employeeId ? "/" + employeeId : ""
                  }`
              )
              .then((res) => {
                console.log(res);
                setTableState(true);
                setFilteredData(res.data);
                setAllocateDabba(false);
              })
              .catch((err) => {
                console.log(err);
                if (err?.response?.status === 404) {
                  //emp with no assets
                  setNoEmp(false);
                  setTableState(false);
                  setAllocateDabba(true);
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 404) {
            //no emp
            setNoEmp(true);
            setAllocateDabba(false);
            setTableState(false);
          }
        });
    }
  }, [employeeId, employeeName, searchChance]);

  useEffect(() => {
    if (selectedRow) {
      setDeallocatePage(true);
      setAssetData(selectedRow);
      console.log(selectedRow);
    }
  }, [selectedRow]);

  const columns = [
    {
      name: "Employee Name",
      cell: (row) => (
        <a
          href="#"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedRow(row)}
        >
          {row.employee_name}
        </a>
      ),
    },
    {
      name: "Asset Name",
      selector: (row) => row.category_name,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Configuration",
      cell: (row) => (
        <div>
          <span>
            {row.os}
            {row.os ? ", " : ""}
          </span>
          <span>
            <span>{row.ram ? "Ram:" : ""}</span> {row.ram}
            <span>{row.ram ? "gb, " : ""}</span>
          </span>
          <span>
            <span>{row.memory ? "Memory:" : ""}</span> {row.memory}
            <span>{row.memory ? "gb, " : ""}</span>
          </span>
          <span>
            {row.processor}
            {row.processor ? ", " : ""}
          </span>
          <span>{row.serial_number}</span>
        </div>
      ),
      // width: "13%"
    },
  ];
  const labelStyles = {
    fontSize: "0.875rem",
  };

  const allocation = () => {
    sbeAllocation(passingId, passingName);
  };

  const postDeallocation = async (formData) => {
    try {
      console.log(assetData.asset_id);
      const response = await axios.delete(
        config.API_ENDPOINT +
          `v1/AssetAllocation/${assetData.asset_id}${
            formData.reason ? `/${formData.reason}` : ""
          }`
      );
      console.log(response);
      setDialogOpen(true);
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
      setDeallocatePage(false);
      setTableState(false);
      setFilteredData([]);
      setAllocateDabba(false);
      setNoEmp(false);
    }
  }, [giveChance, dialogOpen]);
  const handleFormSubmit = (formData) => {
    postDeallocation(formData);
  };

  const desiredKeyOrder = [
    "category_name",
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
    "allocation_date",
    "reason_for_allocation",
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
  const handleClear = () => {
    setSearchId("");
    setSearchName("");
  };
  return (
    <div className="bg-cont-search-skill">
      {!deallocatePage ? (
        <div>
          <div className="searchByEmployeeHeading">Search By Employee</div>
          <div className="top">
            <Stack
              direction="row"
              spacing={20}
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormControl error>
                  <TextField
                    label="Employee Name"
                    sx={{ width: "210px", backgroundColor:"white"}}
                    value={searchName}
                    style={{ borderColor: nameErr ? "#F44336" : "" }}
                    placeholder="Enter Employee Name"
                    // className={nameErr?"placeholder":"textAreaAutoSize"}
                    size="small"
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </FormControl>
                {nameErr ? (
                  <p className="label-text">Please enter Employee name</p>
                ) : (
                  ""
                )}
              </div>
              <div >
                <TextField
                  value={searchId}
                  label="Employee Id"
                  size="small"
                  sx={{ width: "210px", backgroundColor:"white" }}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Employee Id"
                  // error={idErr}
                />
                {idErr ? (
                  <p className="label-text">Please enter Employee Id</p>
                ) : (
                  ""
                )}
              </div>
            </Stack>
            <div>
            <Button
              variant="contained"
              onClick={handleClear}
              size="small"
              className="searchbtn"
              style={{ marginRight: "15px" }}
            >
              Clear 
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="small"
              onClick={searchHandler}
              className="searchbtn"
            >
              Search
            </Button>
            </div>
          </div>
          {!allocateDabba && !noEmp && tableState && (
            <div>
              <DataTable
                columns={columns}
                data={filteredData}
                fixedHeader
                fixedHeaderScrollHeight="60vh"
                customStyles={tableCustomStyles}
              ></DataTable>
            </div>
          )}
          {allocateDabba && !noEmp && !tableState && (
            <div className="allocateoptionbody">
              <div className="allocateoption">
                There are no allocated assets for this employee. Do you want to{" "}
                <span>
                  <a
                    href="#"
                    onClick={() => {
                      setTableState(false);
                      allocation();
                    }}
                  >
                    allocate
                  </a>
                </span>{" "}
                an asset
              </div>
            </div>
          )}
          {!allocateDabba && noEmp && !tableState && (
            <div className="allocateoptionbody">
              <div className="allocateoption">
                There is no Employee with given details.
              </div>
            </div>
          )}
          <div className="buttons">
            <Stack spacing={2} direction="row"></Stack>
          </div>
        </div>
      ) : (
        <div className="deallocatebody">
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
                Asset Deallocated
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
          <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="input">
              <div style={{ marginRight: "23%" }}>
                <TextField
                  label="Employee"
                  disabled
                  shrink
                  value={selectedRow.employee_name} // Set the default value here
                  InputLabelProps={{
                    style: labelStyles,
                  }}
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
                ></TextField>
              </div>
              <div>
                <TextareaAutosize
                  style={{ minHeight: "12%" }}
                  {...register("reason")}
                  placeholder="Reason for Deallocation"
                />
              </div>
            </div>
            <Button variant="outlined" type="submit" size="small">
              Deallocate Asset
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};
export default Sbe;

//
