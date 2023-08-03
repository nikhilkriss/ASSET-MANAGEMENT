import React, { useState, useEffect} from "react";
import Header from "./Header";
import LeftPortion from "./LeftPortion";
import RightPortion from "./RightPortion";
import "../Assets/HomePage.css";

const HomePage = ({ value }) => {
  const [display, setDisplay] = useState([]);
  const [logoClick, setLogoClick] = useState(false);
  
  const handleDisplay = (page) => {
    setDisplay(page);
    setLogoClick(false);
    console.log(page);
  };
  const click = () => {
    setLogoClick(true);
  };
  return (
    <div>
      <Header value={value} click={click}></Header>
      <div className="body">
        <LeftPortion displayPage={handleDisplay}></LeftPortion>
        <>
          { !logoClick ? (
            <RightPortion page={display}></RightPortion>
          ) : (
            <div className="right">
              <div className="welcome-text">Welcome to Asset Management</div>
              <footer className="footer">
                <div className="footer-section">
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    © Copyrights 2023
                    <span style={{ color: "orange" }}> ProximaBiz</span> All
                    rights Reserved
                  </h3>
                </div>
              </footer>
            </div>
          )}

        </>
      </div>
    </div>
  );
};

export default HomePage;
