import React, { useState, useEffect } from "react";
import "../Assets/AllocateAsset.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import AssetDetails from "./AssetDetails.json";
import profileIcon from "../Assets/Images/user.png";
import bin from "../Assets/Images/bin.png";
import edit from "../Assets/Images/edit.png";


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
      fontSize: "15px",
      justifyContent: "center",
      backgroundColor: "white",
      fontFamily: "Sans-serif",
      color: "black",
    },
  },
};
const AllocateAsset = ({krish}) => {
  const [data, setData] = useState([]);
  // const [krishna, setKrishna]=useState(null);

  const getData= async()=>{
      try{
          const response= await axios.get('https://jsonplaceholder.typicode.com/users');
          setData(response.data);
      }
      catch(error){
          console.log(error);
      }
  };

  const handleEdit=()=>{

  }
  const handleDelete=()=>{
    
  }
  const columns = [
    {
      name: "Asset Id",
      selector: (row) => row.id,
    },
    {
      name: "Asset",
      selector: (row) => row.name,
    },
    {
      name: "Brand",
      selector: (row) => row.username,
    },
    {
        name:"Actions",
        cell:(row)=> <div style={{display:"flex"}}>
              <img src={edit} className='editImageIcon' onClick={()=>handleEdit(row.employeeId)} style={{marginRight:"15px"}}/>
              <img src={bin} className='editImageIcon' onClick={()=>handleDelete(row.employeeId)} style={{marginRight:"15px"}}/>
              <img src={profileIcon} className='editImageIcon' onClick={()=>handleDelete(row.employeeId)}/>
        </div>
  }
  ];
  // useEffect(()=>{setKrishna(krish)},[krish])
  useEffect(()=>{
      getData();
      console.log("api");
  },[krish]);
  console.log(krish);
  return (
    <div className="bg-container">
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
export default AllocateAsset;
