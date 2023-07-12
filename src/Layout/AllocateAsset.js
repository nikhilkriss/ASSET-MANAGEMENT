import React, { useState, useEffect } from "react";
import "../Assets/AllocateAsset.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import AssetDetails from "./AssetDetails.json";
import profileIcon from "../Assets/Images/user.png";
import bin from "../Assets/Images/bin.png";
import edit from "../Assets/Images/edit.png";
import config from "../config";
import Allocate from "./Allocate";
import { Button, Stack } from "@mui/material";
import {Dialog, DialogContent,DialogTitle,DialogContentText, DialogActions} from "@mui/material";
import AssetInfo from "./AssetInfo.json"
const tableCustomStyles = {
  title: {
    style: {
      fontSize: "22px",
    },
  },
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
const AllocateAsset = ({ editHandler }) => {
  const [deleteDialog, setDeleteDialog]=useState(false);
  useEffect(() => {
    // const endpoint=config.API_ENDPOINT;
    // const path=`${endpoint}`
  }, []);
  const [assetData, setAssetData] = useState([]);
  const [allocateMode, setAllocateMode] = useState(false);
  const [allocateItem, setAllocateItem] = useState("");

  const getAssetData = async () => {
    // try {
    //   const response = await axios.get(
    //     "https://jsonplaceholder.typicode.com/users"
    //   );
    //   setAssetData(response.data);
      
    // } catch (error) {
    //   console.log(error);
    // }
    setAssetData(AssetInfo);
      
  };

  const handleEdit = (id) => {
    console.log(id);
    editHandler(id);
  };
  const handleDelete = async (id) => {
    console.log(id);
    
    // try {
      
    //   await axios
    //     .delete(`https://jsonplaceholder.typicode.com/users${id}`)
    //     .then((response) => {
    //       console.log(response);
    //       if (response.status > 199 && response.status < 299) {
    //         // setDeleteDialog(true);
    //       }
    //       setDeleteDialog(true);
    //     });
        // getAssetData();
      const updatedData = assetData.filter((row) => row.id !== id)
      setAssetData(updatedData);
      // alert("Asset deleted successfully!");
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handleAllocate = (id) => {
    console.log(id);
    setAllocateItem(id);
    setAllocateMode(true);
  };
  const allocationDone=()=>{
    setAllocateMode(false);
  }
  const columns = [
    {
      name: "Asset Id",
      selector: (row) => row.id,
    },
    {
      name: "Asset",
      selector: (row) => row.Asset,
    },
    {
      name: "Brand",
      selector: (row) => row.Brand,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex" }}>
          <img
            src={edit}
            className="editImageIcon"
            onClick={() => handleEdit(row.id)}
            style={{ marginRight: "15px" }}
          />
          <img
            src={bin}
            className="editImageIcon"
            onClick={() => handleDelete(row.id)}
            style={{ marginRight: "15px" }}
          />
          <img
            src={profileIcon}
            className="editImageIcon"
            onClick={() => {
              handleAllocate(row.id);
            }}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAssetData();
  }, []);
  return (
    <div className="bg-container">
      <Dialog open={deleteDialog} onClose={()=>{setDeleteDialog(false)}} aria-labelledby="dialog-title" aria-aria-describedby="dialog-description">
        <DialogTitle id="dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">Asset deleted</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setDeleteDialog(false)}}>OK</Button>
        </DialogActions>
      </Dialog>
      {allocateMode ? (
        <Allocate allocateDone={allocationDone} id={allocateItem} />
      ) : (
        <DataTable
          title="Asset Details"
          columns={columns}
          fixedHeader
          fixedHeaderScrollHeight="380px"
          data={assetData}
          customStyles={tableCustomStyles}
        />
      )}
    </div>
  );
};
export default AllocateAsset;
// npx json-server --watch Data/db.json --port 8000
