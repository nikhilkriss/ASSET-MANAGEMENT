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
import employeeDetails from "./employeeDetails.json";
import axios from "axios";
import { Button, Box } from "@mui/material";
import apiConfig from "../config";
import { useForm } from "react-hook-form";
import AssetInfo from "./AssetInfo.json";
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
const Sbe = () => {
  const { register, handleSubmit } = useForm();
  const [searchName, setSearchName] = useState(null);
  const [searchId, setSearchId] = useState(null);
  const [filteredData, setFilteredData] = useState(employeeDetails);
  const [nameErr, setNameErr] = useState(false);
  const [idErr, setIdErr] = useState(false);
  const [deallocate, setDeallocate] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [giveChance, setGiveChance] = useState(false);
  const [assetData, setAssetData] = useState(AssetInfo[2]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deallocateEmpName, setDeallocateEmpName] = useState("");

  const searchHandler = () => {
    //validation
    if (!searchName && !searchId) {
      setNameErr(true);
      setIdErr(true);
    } else {
      setNameErr(false);
      setIdErr(false);
    }
    //api-search
    // if (!searchName === false || !searchId === false) {
    var path = apiConfig.apiBaseUrl + `/${searchId}`;
    // console.log(path);
    // console.log();
    axios
      .get(`http://localhost:8000/blogs`)
      .then((res) => {
        console.log(res.data);
        setFilteredData(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };
  useEffect(() => {
    console.log(selectedRow);
  }, [selectedRow]);
  useEffect(() => {
    if (selectedRow) {
      setDeallocate(true);
      setAssetData(selectedRow);
      console.log(selectedRow);
    }
  }, [selectedRow]);
  const columns = [
    {
      name: "Employee Id",
      selector: (row) => row.employeeId,
    },
    {
      name: "Employee Name",
      selector: (row) => row.employeeName,
      // onCellClicked: (row) => setSelectedRow(row),
      cell: (row) => (
        <a
          href="#"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedRow(row)}
        >
          {row.employeeName}
        </a>
      ),
    },
    {
      name: "Asset",
      selector: (row) => row.Asset,
    },
    {
      name: "Brand",
      selector: (row) => row.Brand,
    },
    // {
    //       name:"Primary Skills",
    //       selector:(row)=>row.primarySkills
    // }
  ];
  const labelStyles = {
    fontSize: "0.875rem",
  };
  const postDeallocation = async (formData) => {
    try {
      // console.log(endpoint)
      // const path= `${endpoint}/v1/Assets`;
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/users`,
        formData
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
      setDeallocate(false);
      setFilteredData("");
    }
  }, [giveChance, dialogOpen]);
  const handleFormSubmit = (formData) => {
    postDeallocation(formData);
  };
  const stringifyNestedObjects = (value) => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => {
          if (typeof val === "boolean") {
            return `${key}: ${val ? "Yes" : "No"}`;
          } else if (val !== "") {
            return `${key}: ${val}`;
          }
          return null;
        })
        .filter((item) => item !== null)
        .join(", ");
    }
    return value;
  };
  const idChange = (e) => {
    console.log(e.target.value);
    setSearchId(e.target.value);
  };
  return (
    <div className="bg-cont-search-skill">
      {!deallocate ? ( //deallocate state will decide which page will render
        <div className="search">
          <div className="searchByEmployeeHeading" style={{ marginTop: "0px" }}>
            Search By Employee
          </div>
          <div className="top">
            <Stack
              direction="row"
              spacing={20}
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormControl error>
                  {/* <TextareaAutosize
            value={searchName}
            style={{borderColor:nameErr?"#F44336":""}}
            placeholder='Enter Your Skills'
            className={nameErr?"placeholder":"textAreaAutoSize"}
            //onFocus={handleInputFocus}
            onChange={(e)=>setSearchName(e.target.value)}
            /> */}
                  <TextField
                    label="Employee Name"
                    sx={{ width: "210px" }}
                    value={searchName}
                    style={{ borderColor: nameErr ? "#F44336" : "" }}
                    placeholder="Enter Your Skills"
                    // className={nameErr?"placeholder":"textAreaAutoSize"}
                    size="small"
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </FormControl>
                {nameErr ? (
                  <p className="label-text" style={{ marginBottom: "2px" }}>
                    * Please Enter Skills
                  </p>
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
                  onChange={idChange}
                  error={idErr}
                />
                {idErr ? (
                  <p className="label-text" style={{ marginBottom: "2px" }}>
                    * Please Enter Experience
                  </p>
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
          <div>
            <DataTable
              //title="Employee Details"
              columns={columns}
              data={filteredData}
              fixedHeader
              fixedHeaderScrollHeight="300px"
              customStyles={tableCustomStyles}
              // selected={selectedRow}
              // selectableRows
              //pagination
            ></DataTable>
          </div>

          <div className="buttons">
            <Stack spacing={2} direction="row"></Stack>
          </div>
        </div>
      ) : (
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
          {Object.entries(assetData).map(
            ([key, value]) =>
              !["employeeId", "employeeName"].includes(key) &&
              value !== "" && (
                <div key={key} className="display">
                  <div className="keyfield" style={{ width: "170px" }}>
                    {key}:
                  </div>{" "}
                  <div className="valuefield">
                    {stringifyNestedObjects(value)}
                  </div>
                </div>
              )
          )}
          <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center", marginBottom:"20px"}}>
              
              <TextField
                label="Employee"
                disabled
                value={selectedRow.employeeName} // Set the default value here
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
              >
                {/* {employeeOptions} */}
              </TextField>
              
              <TextField
                label="Reason for Deallocation"
                InputLabelProps={{
                  style: labelStyles,
                }}
                {...register("reason")}
                fullWidth
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "100px",
                    width: "200px",
                    marginBottom: "0px",
                    marginTop: "10px",
                  },
                }}
              >
                {/* {employeeOptions} */}
              </TextField>
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
