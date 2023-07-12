import React, { useState } from 'react';
import '../Styles/SearchBySkillPg.css'
import { FormControl, Stack, TextField, TextareaAutosize } from '@mui/material';
import DataTable from 'react-data-table-component';
import employeeDetails from './employeeDetails.json'
import axios from 'axios';
import apiConfig from './Config'
const tableCustomStyles = {
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
const SearchBySkillPg = () => {
  const [searchSkills,setSearchSkills] = useState(null);
  const [searchYoe,setSearchYoe] = useState(null);
  const [filteredData,setFilteredData] = useState(employeeDetails);
  const [skillsErr,setSkillsErr] = useState(false);
  const [experienceErr,setExperienceErr] = useState(false)
  const searchBySkillHandler=()=>{
    //validation
    if(!searchSkills && !searchYoe){
        setSkillsErr(true);
        setExperienceErr(true);
    }else{
      setSkillsErr(false);
      setExperienceErr(false)
    }
    //api-search
    if(!searchSkills ===false || !searchYoe===false){
      var path = apiConfig.apiBaseUrl + `/${searchSkills}/${searchYoe}`;
      console.log(path);
        axios.get(path)
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
  const clearAllSkillsHandler=()=>{
    setSearchSkills("");
    setSearchYoe("");
  }
  const columns=[
    {
          name:"Employee Id",
          selector : (row)=>row.employeeId
    },
    {
          name:"Employee Name",
          selector : (row)=> row.employeeName
    },
    {
          name:"Role",
          selector:(row)=>row.role,
    },
    {
          name:"Years Of Experience",
          selector:(row)=>row.experience
    },
    {
          name:"Primary Skills",
          selector:(row)=>row.primarySkills
    }
];
  return (
    <div className='bg-cont-search-skill'>
        <h1 className='searchBySkillHeading' style={{marginTop:"0px"}}>Search By Skill / Experience</h1>
        <Stack direction="row" spacing={20} sx={{marginTop:"20px",marginBottom:"30px"}}>
            <div style={{display:"flex",flexDirection:"column"}}>
              <FormControl error>
            <TextareaAutosize
            value={searchSkills}
            style={{borderColor:skillsErr?"#F44336":""}}
            placeholder='Enter Your Skills'
            className={skillsErr?"placeholder":"textAreaAutoSize"}
            //onFocus={handleInputFocus}
            onChange={(e)=>setSearchSkills(e.target.value)}
            />
            </FormControl>
            {skillsErr?<p className='label-text' style={{marginBottom:"20px"}}>* Please Enter Skills</p>:""}
            </div>
            <div>
            <TextField
            value={searchYoe}
            label="Experience"
            type='number'
            sx={{width:"270px"}}
            onChange={(e)=>setSearchYoe(e.target.value)}
            error={experienceErr}
            />
            {experienceErr?<p className='label-text' style={{marginBottom:"20px"}}>* Please Enter Experience</p>:""}
            </div>
        </Stack>
      <div>
        <DataTable
            //title="Employee Details"
            columns={columns}
            data ={filteredData}
            fixedHeader
            fixedHeaderScrollHeight='430px'
            customStyles={tableCustomStyles}
            // selectableRows
            //pagination
        ></DataTable>
      </div>
        <div style={{position:"absolute",bottom:"0",right:"0"}}>
            <button className='searchEmpBtn' style={{marginRight:"30px"}} onClick={searchBySkillHandler}>Search Employee</button>
            <button className='clearAllBtn' onClick={clearAllSkillsHandler}>Clear All</button>
        </div>
    </div>
  )
}
export default SearchBySkillPg