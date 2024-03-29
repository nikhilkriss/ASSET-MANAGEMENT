import React, { useState, useEffect } from "react";
import "../Assets/Eaa.css";
import DataTable from "react-data-table-component";
import config from "../config";
import axios from "axios";

const tableCustomStyles = {
  title: {
    style: {
      fontSize: "22px",
    },
  },
  headCells: {
    style: {
      fontSize: "13px",
      backgroundColor: "lightGreen",
      justifyContent: "center",
      color: "black",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
      justifyContent: "center",
      backgroundColor: "white",
      fontFamily: "Sans-serif",
      color: "black",
    },
  },
};
const Eaa = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      await axios
        .get(config.API_ENDPOINT + `v1/AssetAllocation`)
        .then((response) => {
          console.log(response);
          setData(response.data);
        });
    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      name: "Employee Id",
      selector: (row) => row.employee_id,
      width: "11%"
    },
    {
      name: "Employee Name",
      selector: (row) => row.employee_name,
      width: "12%"
    },
    {
      name: "Category",
      selector: (row) => row.category_name,
      width: "11%"
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      width: "10%"
    },
    {
      name: "Configuration",
      cell: (row) => (
        <div>
          
          <span>{row.os}{row.os ? ', ' : ''}</span>
          <span><span>{row.ram ? 'Ram:' : ''}</span> {row.ram}<span>{row.ram ? 'gb, ' : ''}</span></span>
          <span><span>{row.memory ? 'Memory:' : ''}</span> {row.memory}<span>{row.memory ? 'gb, ' : ''}</span></span>
          <span>{row.processor}{row.processor ? ', ' : ''}</span>
          <span>{row.serial_number}</span>
        </div>
      ),
      width: "15%"
    },
    {
      name: "CarePaqExpStatus",
      selector: (row) => row.id,
      cell: (row) => <div>{row.carepaqexpstatus ? "Yes" : "No"}</div>,
      width: "14%"  
    },
    {
      name: "Warranty Status",
      selector: (row) => row.id,
      cell: (row) => <div>{row.warranty_status?row.warranty_status:"-"}</div>,
      width: "12%"  
    },
    {
      name: "Owned By Proxima",
      selector: (row) => row.id,
      cell: (row) => <div>{row.owned_by_proxima ? "Yes" : "No"}</div>,
      width: "15%"   
    },
  ];

  return (
    <div className="eaaBody">
      <DataTable
        title="Allocated Assets"
        columns={columns}
        fixedHeader
        fixedHeaderScrollHeight="61vh"
        data={data}
        customStyles={tableCustomStyles}
        pagination
        className="customDataTable"
        
      />
    </div>
  );
};
export default Eaa;
