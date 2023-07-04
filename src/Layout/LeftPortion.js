import React, { useState, useEffect } from "react";
import "../Assets/LeftPortion.css";

function LeftPortion({ displayPage }) {
  const [showAssetsSubMenu, setShowAssetsSubMenu] = useState(false);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);

  const [page, setPage] = useState({
    addAsset: true,
    // editAsset: false,
    allocateAsset: false,
    allAssets: false,
    allocatedAssets: false,
    unAllocatedAssets: false,
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
      // editAsset: false,
      allocateAsset: false,
      allAssets: false,
      allocatedAssets: false,
      unAllocatedAssets: false,
      addAsset: true,
    });
  };
  // const handleEditAsset = () => {
  //   setPage({
  //     addAsset: false,
  //     editAsset: true,
  //     allocateAsset: false,
  //     allAssets: false,
  //     allocatedAssets: false,
  //     unAllocatedAssets: false,
      
  //   });
  // };
  const handleaAllocateAsset = () => {
    setPage({
      addAsset: false,
      // editAsset: false,
      allocateAsset: true,
      allAssets: false,
      allocatedAssets: false,
      unAllocatedAssets: false,
      
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
            {/* <div className="submenu-item" onClick={handleEditAsset}>
              Edit Asset
            </div> */}
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
            <div className="submenu-item">All Assets</div>
            <div className="submenu-item">Allocated Assets</div>
            <div className="submenu-item">Unallocated Assets</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftPortion;
