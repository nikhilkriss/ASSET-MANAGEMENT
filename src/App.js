import React, { useState } from "react";
import "./Assets/App.css";
import Login from "./Layout/Login";


import HomePage from "./Layout/HomePage";

const App = () => {
  const [display, setDisplay]=useState([]);

  const handleDisplay=(page)=>{
    setDisplay(page);
    console.log(page);
  }
  return (
    <div>
      <Login></Login>
    </div>
  );
};

export default App;
