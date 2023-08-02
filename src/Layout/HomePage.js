import React, { useState } from "react";
import Header from "./Header";
import LeftPortion from "./LeftPortion";
import RightPortion from "./RightPortion";

import "../Assets/HomePage.css";

const HomePage = ({value}) => {
  const [display, setDisplay]=useState([]);

  const handleDisplay=(page)=>{
    setDisplay(page);
    console.log(page);
  }
  return (
    <div>
      <Header value={value}></Header>
      <div className="body">
        <LeftPortion displayPage={handleDisplay}></LeftPortion>
        <RightPortion page={display}></RightPortion>
      </div>
    </div>
  );
};

export default HomePage;