import React, { useState, useEffect } from "react";
import "../Assets/Details.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Text from "../Components/Texts";
import {
  validRam,
  validHdm,
  validProcessor,
  validDd,
} from "../Components/Regex";
import { MenuItem } from "@mui/material";
import MyDatePicker from "../Components/MyDatePicker";
import { parseISO } from "date-fns";
const Details = ({ isSubmit, undoSubmit, detailsData, handleDetailsError }) => {
  const [ramError, setRamError] = useState(false);
  const [hdmError, setHdmError] = useState(false);
  const [processorError, setProcessorError] = useState(false);
  const [snError, setSnError] = useState(false);
  const [ddError, setDdError] = useState(false);

  const [allInputs, setAllInputs] = useState({
    ram: "",
    hardDiskMemory: "",
    processor: "",
    serialNumber: "",
    purchaseDate: null,
    carePaqExpDate: null,
    warranty: "",
    displayDimensions: "",
  });

  const handleDateChange1 = (date) => {
    console.log(date);

    setAllInputs((prevInputs) => ({
      ...prevInputs,
      purchaseDate: parseISO(date),
    }));
  };

  const handleDateChange2 = (date) => {
    setAllInputs((prevInputs) => ({
      ...prevInputs,
      carePaqExpDate: parseISO(date),
    }));
  };

  const validate = () => {
    let i = 0;
    if (!validRam.test(allInputs.ram)) {
      setRamError(true);
      i++;
    } else {
      setRamError(false);
    }
    if (!validHdm.test(allInputs.hardDiskMemory)) {
      setHdmError(true);
      i++;
    } else {
      setHdmError(false);
    }
    if (!validProcessor.test(allInputs.processor)) {
      setProcessorError(true);
      i++;
    } else {
      setProcessorError(false);
    }
    if (!validProcessor.test(allInputs.serialNumber)) {
      setSnError(true);
      i++;
    } else {
      setSnError(false);
    }
    if (!validDd.test(allInputs.displayDimensions)) {
      setDdError(true);
      i++;
    } else {
      setDdError(false);
    }
    if (i > 0) {
      undoSubmit();
      handleDetailsError(true);
    }
  };
  useEffect(() => {
    if (isSubmit) {
      validate();
    }
    if (
      isSubmit &&
      !ramError &&
      !hdmError &&
      !processorError &&
      !snError &&
      !ddError
    ) {
      handleDetailsError(false);
      detailsData(allInputs);
    }
  }, [isSubmit]);
  // useEffect(()=>{},[ramError,hdmError,processorError,snError,ddError]);
  const getRam = (data) => {
    setAllInputs({ ...allInputs, ram: data });
  };
  const getHdm = (data) => {
    setAllInputs({ ...allInputs, hardDiskMemory: data });
  };
  const getProcessor = (data) => {
    setAllInputs({ ...allInputs, processor: data });
  };
  const getSn = (data) => {
    setAllInputs({ ...allInputs, serialNumber: data });
  };
  const getDd = (data) => {
    setAllInputs({ ...allInputs, displayDimensions: data });
  };

  const warrantyChange = (e) => {
    setAllInputs({ ...allInputs, warranty: e.target.value });
  };
  const labelStyles = {
    //for labelsize in warrantystatus
    fontSize: "0.84rem",
  };
  return (
    <div></div>
  );
};
export default Details;
