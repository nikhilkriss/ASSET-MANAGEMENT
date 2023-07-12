import React, { useState, useEffect } from "react";
import "../Assets/LeftPortion.css";

function LeftPortion({ displayPage }) {
  const [showAssetsSubMenu, setShowAssetsSubMenu] = useState(false);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);

  const [page, setPage] = useState({
    addAsset: true,
    allocateAsset: false,
    eaa: false,
    sbe: false,
    sbs: false,
  });

  useEffect(() => {
    displayPage({ page });
  }, [page]);
  const handleAssetsClick = () => {
    setShowAssetsSubMenu(!showAssetsSubMenu);
    setShowReportsSubMenu(false);
  };

  const handleReportsClick = () => {
    setShowReportsSubMenu(!showReportsSubMenu);
    setShowAssetsSubMenu(false);
  };
  const handleAddAsset = () => {
    setPage({
      addAsset: true,
      allocateAsset: false,
      eaa: false,
      sbe: false,
      sbs: false,
    });
  };
  
  const handleaAllocateAsset = () => {
    setPage({
      addAsset: false,
      allocateAsset: true,
      eaa: false,
      sbe: false,
      sbs: false
    });
  };
  const handleEaa=()=>{
    setPage({
      addAsset: false,
      allocateAsset: false,
      eaa: true,
      sbe: false,
      sbs: false
    })
  };
  const handleSbe=()=>{
    setPage({
      addAsset: false,
      allocateAsset: false,
      eaa: false,
      sbe: true,
      sbs: false
    })
  };
  const handleSbs=()=>{
    setPage({
      addAsset: false,
      allocateAsset: false,
      eaa: false,
      sbe: false,
      sbs: true
    });
  };
  return (
    <div className="left-portion">
      <div className="menu">
        <div className="menu-item" onClick={handleAssetsClick}>
          Assets
          <span className={`arrow ${showAssetsSubMenu ? "up" : ""}`} />
        </div>
        {showAssetsSubMenu && (
          <div className="submenu">
            <div className="submenu-item" onClick={handleAddAsset}>
              Add Asset
            </div>
            <div className="submenu-item" onClick={handleaAllocateAsset}>
              Allocate Asset
            </div>
          </div>
        )}
        <div className="menu-item" onClick={handleReportsClick}>
          Reports
          <span className={`arrow ${showReportsSubMenu ? "up" : ""}`} />
        </div>
        {showReportsSubMenu && (
          <div className="submenu">
            <div className="submenu-item" onClick={handleEaa}>Employee Asset Allocation</div>
            <div className="submenu-item" onClick={handleSbe}>Search By Employee</div>
            <div className="submenu-item" onClick={handleSbs}>Search By Specification</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftPortion;
