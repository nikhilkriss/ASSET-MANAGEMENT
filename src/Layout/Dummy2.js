import React, { useEffect, useState } from 'react'
import '../Styles/ModifyEmployeePg.css'
import DataTable from 'react-data-table-component'
import employeeDetails from './employeeDetails.json'
import { selectClasses } from '@mui/base'
import { Button, useScrollTrigger } from '@mui/material'
import editImage from '../Images/edit.png'
import saveImage from '../Images/save.png'
import trashImage from '../Images/trash.png'
import AddEmployeeProfile from './AddEmployeeProfile'

const tableCustomStyles = {
      title:{
            style:{
                fontSize:"20px"
            }
      },
      headCells: {
        style: {
          fontSize:"15px",
          backgroundColor: 'lightGreen',
          justifyContent:"center",
          color:"black"
        },
      },
      cells:{
            style:{
                  fontSize:"15px",
                  justifyContent:"center",
                  backgroundColor:"white",
                  fontFamily:"Sans-serif",
                  color:"black"
            }
      }
    }

const ModifyEmployeePg = () => {
      const [editingRowId,setEditingRowId]= useState(null);
      const[data,setData] = useState(employeeDetails);
      //let editRowData=null;

      const [showTableData,setShowTableData] = useState(true);

      const handleEdit = (employeeId)=>{
            setEditingRowId(employeeId);
            setShowTableData(false);
            // editRowData = data[employeeId-1]
            // console.log(editRowData)
      }

      // const handleInputChange = (value, rowId, field) => {
      //       setData((prevData) => {
      //         return prevData.map((row) => {
      //           if (row.employeeId === rowId) {
      //             return { ...row, [field]: value };
      //           }
      //            return row;
      //       });
      //    });
      // };

      const handleDelete=(rowId)=>{
            setData((prevData) => prevData.filter((row) => row.employeeId !== rowId));
            console.log(`Successfully Deleted ${rowId}`)
            //DELETE API REQUEST
      }

      const handleSave = () => {
            setEditingRowId(null);
            //console.log(data)
            // Perform save action (e.g., send updated data to server)
      };

      const editRowData = data[editingRowId-1];
      //console.log(editRowData);

      const columns=[
            {
                  name:"Employee Id",
                  selector : (row)=>row.employeeId
            },
            {
                  name:"Employee Name",
                  selector : (row)=> row.employeeName
                  // selector:'employeeName',
                  // cell:(row)=>(editingRowId===row.employeeId?
                  // (<input
                  //       type="text"
                  //       value={row.employeeName}
                  //       onChange={(e) => handleInputChange(e.target.value, row.employeeId, 'employeeName')}
                  //       // onChange={(e) => handleInputChange(e.target.value, row.employeeId,'employeeName')}
                  // />)
                  //  : (
                  // <span>{row.employeeName}</span>
                  // ))
            },
            {
                  name:"Role",
                  selector:(row)=>row.role,
                  // selector:'role',
                  // cell:(row)=>(editingRowId===row.employeeId)?
                  // <input
                  //       type="text"
                  //       value={row.role}
                  //       onChange={(e) => handleInputChange(e.target.value, row.employeeId, 'role')}
                  // />
                  //  : (
                  // <span>{row.role}</span>
                  // )
            },
            {
                  name:"Years Of Experience",
                  selector:(row)=>row.yearsOfExperience
                  // selector:"yearsOfExperience",
                  // cell:(row)=>(editingRowId===row.employeeId)?
                  // <input
                  //       type="text"
                  //       value={row.yearsOfExperience}
                  //       onChange={(e) => handleInputChange(e.target.value, row.employeeId, 'yearsOfExperience')}
                  // />
                  //  : (
                  // <span>{row.yearsOfExperience}</span>
                  // )
            },
            {
                  name:"Primary Skills",
                  selector:(row)=>row.primarySkills
                  // selector:"primarySkills",
                  // cell:(row)=>(editingRowId===row.employeeId)?
                  // <input
                  //       type="text"
                  //       value={row.primarySkills}
                  //       onChange={(e) => handleInputChange(e.target.value, row.employeeId, 'primarySkills')}
                  // />
                  //  : (
                  // <span>{row.primarySkills}</span>
                  // )
            },
            {
                  name:"Actions",
                  cell:(row)=> <div style={{display:"flex"}}>
                        <img src={editImage} className='editImageIcon' onClick={()=>handleEdit(row.employeeId)} style={{marginRight:"25px"}}/>
                        <img src={trashImage} className='editImageIcon' onClick={()=>handleDelete(row.employeeId)}/>
                  </div>
            }
      ]

      return (
      <div>
            {editingRowId && <AddEmployeeProfile rowData={editRowData}/>}
            {
                  showTableData &&
            <div className='bg-container'>
                  <DataTable
                  title="Employee Details"
                  columns={columns}
                  data ={data}
                  fixedHeader
                  fixedHeaderScrollHeight='450px'
                  customStyles={tableCustomStyles} 
                  // selectableRows
                  // pagination
                  ></DataTable>
            </div>
            }
      </div>
      )
            
}

export default ModifyEmployeePg