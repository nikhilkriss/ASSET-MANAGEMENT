import React, { useState, useEffect } from "react";
import "../Assets/Eaa.css";
import DataTable from "react-data-table-component";
import employeeDetails from "./Eaa.json";

const tableCustomStyles = {
  title: {
    style: {
      fontSize: "22px",
    },
  },
  headCells: {
    style: {
      fontSize: "15px",
      backgroundColor: "lightGreen",
      justifyContent: "center",
      color: "black",
    },
  },
  cells: {
    style: {
      fontSize: "13px",
      justifyContent: "center",
      backgroundColor: "white",
      fontFamily: "Sans-serif",
      color: "black",
    },
  },
};
const Eaa = () => {
  const [data, setData] = useState([]);
  const getEmployeeData = () => {
    //api call
    setData(employeeDetails);
  };
  useEffect(() => {
    getEmployeeData();
  }, []);
  const columns = [
    {
      name: "Employee Id",
      selector: (row) => row.employeeid,
    },
    {
      name: "Employee Name",
      selector: (row) => row.employeename,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Configuration",
      selector: (row) => row.id,

      // cell: (row) => (
      //   <div style={{display:"flex", flexDirection:"column"}}>
      //     {row.OS}, {row.ram}, {row.Memory}, {row.processor}, {row.serialnumber}
      //   </div>
      // ),
      cell: (row) => (
        <div >
          <span>{row.OS}, </span>
          <span>{row.ram}, </span>
          <span>{row.Memory}, </span>
          <span>{row.processor}, </span>
          <span>{row.serialnumber}</span>
        </div>
      ),
    },
    {
      name: "CarePaqExpStatus",
      selector: (row) => row.id,
      cell: (row) => <div>{row.carepaqexpstatus ? "Yes" : "No"}</div>,
    },
    {
      name: "Warranty Status",
      selector: (row) => row.id,
      cell: (row) => <div>{row.warrantystatus}</div>,
    },
    {
      name: "owned By Proxima",
      selector: (row) => row.id,
      cell: (row) => <div>{row.ownedbyproxima ? "Yes" : "No"}</div>,
    },
  ];

  return (
    <div className="eaaBody">
      <DataTable
        title="Asset Details"
        columns={columns}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        data={data}
        customStyles={tableCustomStyles}
      />
    </div>
  );
};
export default Eaa;
