import React, { useState, useEffect, useCallback } from "react";
import "../Assets/Basic.css";

import { validOsVersion } from "../Components/Regex";
import Box from "@mui/material/Box";

const category = ["laptop", "macbook", "mouse"];

function Basic({ isSubmit, undoSubmit, basicData, handleBasicError, isClear }) {
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [osOptions, setOsOptions] = useState([]);
  const [osVersionError, setOsVersionError] = useState(false);

  const [categoryError, setCategoryError] = useState(false);
  const [brandError, setBrandError] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [osError, setOsError] = useState(false);

  const [allBasicInput, setAllBasicInput] = useState({
    category: "",
    brand: "",
    model: "",
    os: "",
    osVersion: "",
    checkBox: null,
  });

  useEffect(() => {
    if (isClear) {
      setAllBasicInput({
        category: "",
        brand: "",
        model: "",
        os: "",
        osVersion: "",
        checkBox: null,
      });
    }
  }, [isClear]);
  const validate = () => {
    let i = 0;
    if (!allBasicInput.category) {
      setCategoryError(true);
      i++;
    } else {
      setCategoryError(false);
    }
    if (!allBasicInput.brand) {
      setBrandError(true);
      i++;
    } else {
      setBrandError(false);
    }
    if (!allBasicInput.model) {
      setModelError(true);
      i++;
    } else {
      setModelError(false);
    }
    if (!allBasicInput.os) {
      setOsError(true);
      i++;
    } else {
      setOsError(false);
    }
    if (!validOsVersion.test(allBasicInput.osVersion)) {
      setOsVersionError(true);
      i++;
    } else {
      setOsVersionError(false);
    }
    if (i > 0) {
      undoSubmit();
      handleBasicError(true);
    }
  };
  useEffect(() => {
    if (isSubmit) {
      validate();
    }
    if (isSubmit) {
      if (!osVersionError) {
        handleBasicError(false);
        // console.log(allBasicInput);
        basicData(allBasicInput);
      }
    }
  }, [isSubmit]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (allBasicInput.category === "laptop") {
      setBrandOptions(["hp", "dell", "lenovo"]);
    }
    if (allBasicInput.category === "macbook") {
      setBrandOptions(["apple"]);
    }
    if (allBasicInput.category === "mouse") {
      setBrandOptions(["dell", "logitech", "zebronics"]);
    }
    if (
      allBasicInput.category === "laptop" ||
      allBasicInput.category === "macbook"
    ) {
      setOsOptions(["windows", "macos", "linux", "chromeos"]);
    }
  }, [allBasicInput.category]);

  useEffect(() => {
    if (allBasicInput.category === "laptop" && allBasicInput.brand === "hp") {
      setModelOptions(["hp model1", "hp model2"]);
    }
    if (allBasicInput.category === "laptop" && allBasicInput.brand === "dell") {
      setModelOptions(["dellmodel1", "dellmodel2"]);
    }
    if (
      allBasicInput.category === "laptop" &&
      allBasicInput.brand === "lenovo"
    ) {
      setModelOptions(["lenovomode1", "lenovomodel2"]);
    }
    if (
      allBasicInput.category === "macbook" &&
      allBasicInput.brand === "apple"
    ) {
      setModelOptions(["macbook1", "macbook2", "macbook3"]);
    }
    if (allBasicInput.category === "mouse" && allBasicInput.brand === "dell") {
      setModelOptions(["dellmouse1", "dellmouse2"]);
    }
    if (
      allBasicInput.category === "mouse" &&
      allBasicInput.brand === "logitech"
    ) {
      setModelOptions(["logitechmouse1", "logitechmouse2"]);
    }
    if (
      allBasicInput.category === "mouse" &&
      allBasicInput.brand === "zebronics"
    ) {
      setModelOptions(["zebronicsmouse1", "zebronicsmouse2"]);
    }
  }, [allBasicInput.brand]);
  const getCategoryData = (data) => {
    setAllBasicInput({ ...allBasicInput, category: data });
  };

  const getBrandData = (data) => {
    setAllBasicInput({ ...allBasicInput, brand: data });
  };
  const getModelData = (data) => {
    setAllBasicInput({ ...allBasicInput, model: data });
  };
  const getOsData = (data) => {
    setAllBasicInput({ ...allBasicInput, os: data });
  };

  const getImpData = (data) => {
    setAllBasicInput({ ...allBasicInput, osVersion: data });
  };
  const handleCheckBox = (data) => {
    setAllBasicInput({ ...allBasicInput, checkBox: data });
  };
  return (
    <div></div>
  );
}

export default Basic;
