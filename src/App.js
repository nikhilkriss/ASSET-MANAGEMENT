import React, { useState } from "react";
import "./Assets/App.css";
import Header from "./Layout/Header";
import LeftPortion from "./Layout/LeftPortion";
import RightPortion from "./Layout/RightPortion";

import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";

const App = () => {
  const [display, setDisplay]=useState([]);

  const handleDisplay=(page)=>{
    setDisplay(page);
    console.log(page);
  }
  return (
    <div>
      <Header></Header>
      <div className="body">
        <LeftPortion displayPage={handleDisplay}></LeftPortion>
        <RightPortion page={display}></RightPortion>
      </div>
    </div>
  );
};

export default App;
