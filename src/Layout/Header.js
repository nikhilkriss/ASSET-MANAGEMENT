import React, { useState } from "react";
import "../Assets/Header.css";
import ProximaLogo from "../Assets/Images/ProximaLogo.png";
import ProfileIcon from "../Assets/Images/ProfileIcon.png";

function Header(){
    return(
    <header className="header">
        <div className="logo">
          <img src={ProximaLogo} width="250px" height="55px" alt="Proxima Logo" />
        </div>
        <div className="dropdown">
          <div className="dropbtn">
          <div claasName="hellouser">Hello, User</div>
          <img className="" src={ProfileIcon} width="50px" height="50px" alt="Proxima Logo" />
          </div>
            <div className="dropdown-content">
              <a href="#">Logout</a>
            </div>
        </div>
        
      </header>)
}

export default Header;