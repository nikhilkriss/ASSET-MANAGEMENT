import React, { useState, useEffect } from "react";
import "../Assets/AllocateAsset.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import profileIcon from "../Assets/Images/user.png";
import bin from "../Assets/Images/bin.png";
import edit from "../Assets/Images/edit.png";
import config from "../config";
import Allocate from "./Allocate";
import { Button, Stack } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";

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
const AllocateAsset = ({ editHandler, sbe, sbeName, display }) => {     //sbe means employeid 
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [giveChance, setGiveChance]=useState(false);
  const [assetData, setAssetData] = useState([]);
  const [allocateMode, setAllocateMode] = useState(false);
  const [allocateItem, setAllocateItem] = useState(null);
  const [sbeMode, setSbeMode] = useState(false);
  // const [sbeName, setSbeName] = useState(null);
  const [titleState, setTitleState]=useState("");
  useEffect(() => {
    console.log(sbe, sbeName);
    
    if (sbe) {
      setTitleState(`Allocate an Asset for ${sbeName}`);
      setSbeMode(true);
    }
  }, []);
  
  const getAssetData = async () => {
    try {
      const response = await axios.get(
        config.API_ENDPOINT + `v1/Assets/false` 
      );
      console.log(response);
      setAssetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleEdit = (data) => {
    console.log(data);
    editHandler(data);
  };
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios
        .delete(config.API_ENDPOINT + `v1/Assets/${id}`)
        .then((response) => {
          console.log(response);
          if (response.status > 199 && response.status < 299) {
            setDeleteDialog(true);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (deleteDialog && !giveChance) {
      setGiveChance(true);
    }
  }, [deleteDialog]);
  useEffect(() => {
    if (!deleteDialog && giveChance) {
      getAssetData();
    }
  }, [giveChance, deleteDialog]);
  const handleAllocate = async (id) => {
    console.log(id);
    setAllocateItem(id);
    setAllocateMode(true);
  };
  const allocationDone = () => {
    setAllocateMode(false);
    getAssetData();
  };
  const columns = [
    {
      name: "Asset Name",
      selector: (row) => row.asset_name,
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
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex" }}>
          {!sbeMode && (
            <>
              <img
                src={edit}
                className="editImageIcon"
                onClick={() => handleEdit(row)}
                style={{ marginRight: "15px" }}
              />
              <img
                src={bin}
                className="editImageIcon"
                onClick={() => handleDelete(row.asset_id)}
                style={{ marginRight: "15px" }}
              />
            </>
          )}
          <img
            src={profileIcon}
            className="editImageIcon"
            onClick={() => {
              handleAllocate(row.asset_id);
            }}
          />
        </div>
      ),
    },
  ];
  //hello
  useEffect(() => {
    setTitleState("Unallocated Assets");
    getAssetData();
    
  }, []);

  useEffect(()=>{if(sbeName!==null){setTitleState(`Allocate an Asset for ${sbeName}`)}},[sbeName])
  return (
    <div className="bg-container">
      <Dialog
        open={deleteDialog}
        onClose={() => {
          setDeleteDialog(false);
        }}
        aria-labelledby="dialog-title"
        aria-aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Asset deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialog(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {allocateMode ? (
        <Allocate  allocateDone={allocationDone} id={allocateItem} sbe={sbe} sbeName={sbeName} />
      ) : (
        <DataTable
          title={titleState}
          columns={columns}
          fixedHeader
          fixedHeaderScrollHeight="58vh"
          data={assetData}
          customStyles={tableCustomStyles}
          pagination
          
        />
      )}
    </div>
  );
};
export default AllocateAsset;