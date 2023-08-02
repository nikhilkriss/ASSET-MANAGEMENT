import React, { useState, useEffect } from "react";
import "../Assets/Sbe.css";
import {
  FormControl,
  MenuItem,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
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
      fontSize: "15px",
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
      let path =
        config.API_ENDPOINT2 +
        `v1/EmployeeProfiles${
          employeeName ? `/EmployeeName/${employeeName}` : ""
        }${employeeId ? `/${employeeId}` : ""}`;
      console.log(path);
      axios
        .get(path)
        .then((res) => {
          console.log(res);
          console.log(res.data.employees.length);
          if (res.data.employees.length === 0) {
            setNoEmp(true);
            setAllocateDabba(false);
            setTableState(false);
          } else if (res.data.employees.length > 0) {
            setNoEmp(false);
            setAllocateDabba(false);
            setPassingId(res.data.employees[0].employee_id);
            setPassingName(res.data.employees[0].employee_name);
            console.log(noEmp);
            // console.log(config.API_ENDPOINT +`v1/AssetAllocation/${employeeName}/${employeeName}`)
            axios
              .get(
                config.API_ENDPOINT +
                  `v1/AssetAllocation/${
                    employeeName ? employeeName + "/" : ""
                  }${employeeId ? employeeId : ""}`
              )
              .then((res) => {
                console.log(res);
                setTableState(true); 
                setFilteredData(res.data);
                setAllocateDabba(false);
              })
              .catch((err) => {
                console.log(err);
                if (err.response.status === 404) {
                  // employee with no assets
                  console.log("asdfghjklpoiuytrewq")
                  setNoEmp(false);
                  setTableState(false);
                  setAllocateDabba(true);
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
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
      name: "Employee Id",
      selector: (row) => row.employee_id,
    },
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
      name: "Asset Id",
      selector: (row) => row.asset_id,
    },
    {
      name: "Asset",
      selector: (row) => row.category_name,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
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
          `v1/AssetAllocation/${assetData.asset_id}${formData.reason?`/${formData.reason}`:''}`
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
  // const stringifyNestedObjects = (value) => {
  //   if (typeof value === "object" && value !== null) {
  //     return Object.entries(value)
  //       .map(([key, val]) => {
  //         if (typeof val === "boolean") {
  //           return `${key}: ${val ? "Yes" : "No"}`;
  //         } else if (val !== null && val !== "" && val !== undefined) {
  //           return `${key}: ${val}`;
  //         }
  //         return null;
  //       })
  //       .filter((item) => item !== null)
  //       .join(", ");
  //   }
  //   return value;
  // };
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
                    sx={{ width: "210px" }}
                    value={searchName}
                    style={{ borderColor: nameErr ? "#F44336" : "" }}
                    placeholder="Enter employee name"
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
              <div>
                <TextField
                  value={searchId}
                  label="Employee Id"
                  size="small"
                  sx={{ width: "210px" }}
                  onChange={(e) => setSearchId(e.target.value)}
                  error={idErr}
                />
                {idErr ? (
                  <p className="label-text">Please Enter Employee Id</p>
                ) : (
                  ""
                )}
              </div>
            </Stack>
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
          {!allocateDabba && !noEmp && tableState && (
            <div>
              <DataTable
                columns={columns}
                data={filteredData}
                fixedHeader
                fixedHeaderScrollHeight="60vh"
                customStyles={tableCustomStyles}
                // selected={selectedRow}
                // selectableRows
                //pagination
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
                      // setAllocation(true);

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
              <div className="allocateoption">There is no such employee</div>
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
          {/* {Object.entries(assetData).map(
            ([key, value]) =>
              !["employeeId", "employeeName"].includes(key) &&
              value !== "" && (
                <div key={key} className="display">
                  <div className="keyfield" style={{ width: "200px" }}>
                    {key}:
                  </div>{" "}
                  <div className="valuefield">
                    {stringifyNestedObjects(value)}
                  </div>
                </div>
              )
          )} */}
          {Object.entries(assetData).map(
            ([key, value]) =>
              !["employee_id", "employee_name"].includes(key) &&
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
