import React, { useState, useEffect } from "react";
import "../Assets/RightPortion.css";
// import Basic from "./Basic";
// import Details from "./Details";
// import { Button, Stack } from "@mui/material";
import AddAsset from "./AddAsset";
import AllocateAsset from "./AllocateAsset";

function RightPortion(props) {
  const [toggle, setToggle]=useState(true);
  const [rightState, setRightState]=useState(null);
  console.log(props.page);
  useEffect(()=>{setToggle(false); setRightState(props.page)},[props.page]);
  return (
    <div className="right">
      <div className="right-portion">
        {/* <div className="welcome-text">Welcome to Asset Management</div> */}
        
        {(toggle||props.page.page.addAsset)&& <AddAsset />}
        {(toggle||props.page.page.allocateAsset)&&<AllocateAsset krish={rightState}/>}
        {/* {(props.page && props.page.page.allocateAsset) ? <AllocateAsset /> : null} */}
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

export default RightPortion;
