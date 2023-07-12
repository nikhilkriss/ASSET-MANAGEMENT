import React, { useState, useEffect } from "react";
import "../Assets/RightPortion.css";
import axios from "axios";
// import { Button, Stack } from "@mui/material";
import AddAsset from "./AddAsset";
import AllocateAsset from "./AllocateAsset";
import Eaa from "./Eaa";
import Sbe from "./Sbe";

function RightPortion(props) {
  const [toggle, setToggle] = useState(true);

  // const [addAssetState, setAddAssetState]=useState(props.page.addAsset);
  
  // console.log(props.page.page.addAsset);
  
  const[editMode, setEditMode]=useState(false);
  const [editData, setEditData]=useState("");
  const [editId, setEditId]=useState(null);
  
  const getEditingData = async () => {         //prepolation for edit asset
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${editId}`
      );
      setEditData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{if(editId){getEditingData();}},[editId])
  useEffect(()=>{setEditMode(true);},[editData]);
  const editHandler = (id) => {
    console.log(id);
    setEditId(id);
    
    props.page.page.addAsset=false;
    props.page.page.allocateAsset=false;
    console.log(props.page.page.allocateAsset);
    
  };
  const undoEdit=()=>{
    setEditMode(false);
    props.page.page.allocateAsset=true;
    
  }
  useEffect(() => {
    setToggle(false);
    setEditMode(false);
  }, [props.page]);
  return (
    <div className="right">
      <div className="right-portion">
        {/* <div className="welcome-text">Welcome to Asset Management</div> */}

        {(toggle || props.page.page.addAsset) && <AddAsset editingData={editData} editingMode={editMode} undoEdit={undoEdit}/>}
        {(toggle || props.page.page.allocateAsset) && (
          <AllocateAsset  editHandler={editHandler} />
        )}
        {(toggle|| editMode)&&<AddAsset editingData={editData} editingMode={editMode} undoEdit={undoEdit}/>}
        {(toggle||props.page.page.eaa)&&<Eaa/>}
        {(toggle||props.page.page.sbe)&&<Sbe/>}
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

export default RightPortion;
