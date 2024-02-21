import React from "react";
import "../Assets/Header.css";
import ProximaLogo from "../Assets/Images/ProximaLogo.png";
import ProfileIcon from "../Assets/Images/ProfileIcon.png";

function Header({ value, click }) {
  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handleClick = () => {
    console.log("clicked");
    click();
  };
  return (
    <header className="header">
      <div className="logo" style={{ cursor: "pointer" }}>
        <img
          src={ProximaLogo}
          onClick={handleClick}
          width="250px"
          height="55px"
          alt="Proxima Logo"
        />
      </div>

      <div
        claasName="hellouser"
        style={{ textAlign: "end", marginLeft: "auto", fontSize: "25px" }}
      >
        Hello, {value}
      </div>

      <div className="dropdown">
        <div className="dropbtn">
          <img
            className=""
            src={ProfileIcon}
            width="50px"
            height="50px"
            alt="Proxima Logo"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="dropdown-content">
          <a href="#" onClick={logoutHandler}>
            Logout
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
