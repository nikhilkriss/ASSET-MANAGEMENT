import React, { useState, useEffect } from "react";
import "../Assets/LeftPortion.css";

function LeftPortion({ displayPage }) {
  const [showAssetsSubMenu, setShowAssetsSubMenu] = useState(false);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);
  const [sameChange1,setSameChange1]=useState(false);
  const [sameChange2,setSameChange2]=useState(false);
  const [sameChange3,setSameChange3]=useState(false);

  const [page, setPage] = useState({
    welcome:true,
    addAsset: false,
    allocateAsset: false,
    editAsset:false,
    eaa: false,
    sbe: false,
    sbs: false,
    scaa:false,
    scsbe:false,
    scsbs:false
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
      welcome:false,
      allocateAsset: false,
      eaa: false,
      sbe: false,
      sbc: false
      
    });
    
  };
  
  const handleaAllocateAsset = () => {
    setPage({
      welcome:false,
      addAsset: false,
      allocateAsset: true,
      eaa: false,
      sbe: false,
      sbc: false,
      scaa:(!sameChange1)
    });
    setSameChange1(!sameChange1);
  };
  const handleEaa=()=>{
    setPage({
      addAsset: false,
      welcome:false,
      allocateAsset: false,
      eaa: true,
      sbe: false,
      sbc: false,
    });
  };
  const handleSbe=()=>{
    setPage({
      addAsset: false,
      welcome:false,
      allocateAsset: false,
      eaa: false,
      sbe: true,
      sbc: false,
      scsbe:(!sameChange2)
    });
    setSameChange2(!sameChange2);
  };
  const handleSbs=()=>{
    setPage({
      addAsset: false,
      welcome:false,
      allocateAsset: false,
      eaa: false,
      sbe: false,
      sbc: true,
      scsbs:(!sameChange3)
    });
    setSameChange3(!sameChange3);
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
            <div className="submenu-item" onClick={handleSbs}>Search By Configuration</div>
          </div>
        )}
      </div>
    </div>
  );
}
//sbs
export default LeftPortion;
