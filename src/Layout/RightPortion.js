import React, { useState, useEffect } from "react";
import "../Assets/RightPortion.css";
import AddAsset from "./AddAsset";
import EditAsset from "./EditAsset";
import AllocateAsset from "./AllocateAsset";
import Eaa from "./Eaa";
import Sbe from "./Sbe";
import Sbc from "./Sbc";

function RightPortion(props) {
  const [toggle, setToggle] = useState(true);
  const [editData, setEditData] = useState(null);
  const [sbeId, setSbeId] = useState(null);
  const [sbeName, setSbeName] = useState(null);
  const [sbeMode, setSbeMode] = useState(false);
  const [sbeAux, setSbeAux] = useState(false);
  const [change, setChange] = useState(false);
 
  const editHandler = (data) => {
    console.log(data);
    setEditData(data);
    setChange(false);
    props.page.page.editAsset = true;
    props.page.page.allocateAsset = false;
  };
  const undoEdit = () => {
    console.log("asdfghjkl");
    props.page.page.editAsset = false;
    props.page.page.allocateAsset = true;
    setChange(true);
  };
  useEffect(() => {
    setToggle(false);
    console.log(sbeId);
    try {
      if (props.page.page.allocateAsset === false) {
        console.log("marindi");
        setSbeId(null);
        setSbeName(null);
        setSbeMode(false);
        setChange(false);
      }
    } catch (error) {}
  }, [props.page.page]);

  useEffect(() => {
    if (sbeId) {
      setSbeMode(true);
    }
  }, [sbeId, sbeAux]);

  const sbeAllocation = (id, name) => {
    console.log(id);
    setSbeId(id);
    setSbeName(name);
    setSbeAux(!sbeAux);
    props.page.page.allocateAsset = true;
    props.page.page.sbe = false;
  };
  return (
    <div className="right">
      <div className="right-portion">
        {(toggle || props.page.page.addAsset) && <AddAsset />}
        {(toggle || props.page.page.welcome) && (
          <div className="welcome">
            <div className="welcome-text">Welcome to Asset Management</div>
          </div>
        )}
        {((toggle || props.page.page.allocateAsset || sbeMode || change)&& props.page.page?.scaa) && (
          <AllocateAsset
            editHandler={editHandler}
            sbe={sbeId}
            sbeName={sbeName}
          />
        )}
        {((toggle || props.page.page.allocateAsset || sbeMode || change)&& !props.page.page?.scaa) && (
          <AllocateAsset
            editHandler={editHandler}
            sbe={sbeId}
            sbeName={sbeName}
          />
        )}
        {((toggle || props.page.page.editAsset && !change)) && (
          <EditAsset editingData={editData} undoEdit={undoEdit} />
        )}
        {(toggle || (props.page.page.eaa && !sbeMode)) && <Eaa />}

        {((toggle || props.page.page.sbe && !sbeMode)&& props.page.page?.scsbe) && (
          <Sbe sbeAllocation={sbeAllocation} />
        )}
        {((toggle || props.page.page.sbe && !sbeMode)&& !props.page.page?.scsbe) && (
          <Sbe sbeAllocation={sbeAllocation} />
        )}
        {((toggle || props.page.page.sbc && !sbeMode)&& !props.page.page?.scsbs) && <Sbc />}
        {((toggle || props.page.page.sbc && !sbeMode)&& props.page.page?.scsbs) && <Sbc />}
      </div>
      <footer className="footer">
        <div className="footer-section">
          <h3 style={{ fontSize: "15px", fontWeight: "500", color: "black" }}>
            © Copyrights 2023
            <span style={{ color: "orange" }}> ProximaBiz</span> All rights
            Reserved
          </h3>
        </div>
      </footer>
    </div>
  );
}

export default RightPortion;
