import React, { useDebugValue, useEffect, useState } from 'react'
import '../Styles/AddEmployeeProfile.css';
import { TextField,Stack,Select,MenuItem,Box, TextareaAutosize,Button, typographyClasses, InputLabel, FormControl} from '@mui/material'
import uploadImage from '../Images/upload-file.png'
import axios from 'axios';

const AddEmployeeProfile = () => {

  const [idVal,setIdVal]=useState(null);
  const [Iderror,setIdError] = useState(false);
  const [idErrText,setIdErrText] = useState(null);

  const [empNameVal,setEmpName] = useState('');
  const [empNameError,setEmpNameErr] = useState(false);
  const [empErrText,setEmpErrText] = useState(null);
  
  const [role,setRoleVal] = useState(null);
  const [roleErr,setRoleErr]= useState(null);

  const [yearsOfExp,setYearsOfExp] = useState(null);
  const [yearsOfExpErr,setYearsOfExpErr]=useState(false);

  const [primarySkillsVal,setPrimarySkillsVal] = useState(null);
  const [primarySkillsErr,setPrimarySkillsErr] = useState(null);

  const [fileName,setFileName] = useState('');
  const [attachResumeErr,setAttachResumeErr] = useState(null);
  const [fileErrMsg,setFileErrMsg]= useState(null);

  const [secondarySkillVal,setSecondarySkill] = useState(null);

  // const chooseFileClick = (event) =>{
  //   setFileName(event.target.value)
  // }

  const roleHandle=(e)=>{
    setRoleVal(e.target.value)
  }

 const clearAllHandler=()=>{
    setIdVal('')
    setEmpName('')
    setRoleVal('')
    setYearsOfExp('')
    setPrimarySkillsVal('')
    setSecondarySkill('')
    setFileName(null)

    setIdErrText("")
    setIdError(false)

    setEmpErrText("")
    setEmpNameErr(false)

    setRoleErr(false)
    setYearsOfExpErr(false)
    setPrimarySkillsErr(false)

    setFileErrMsg(false)
    setAttachResumeErr(false)
  }
  
  //let letters =" /^[a-zA-Z]*$/";
  const containNumbers=()=>{
    return true;
  }

  //let val = null;
  let validateErrObj = {}
  const formValidation=()=>{
    //id value validation
      if (!idVal){
        setIdError(true);
        setIdErrText("Please Enter Employee Id");
        validateErrObj.idVal = "Please Enter Employee Id";
     }else if (idVal.toString().length<2){
        setIdError(true)
        setIdErrText("Employee Id Should be more than 1 digit")
        validateErrObj.idVal = "Please Enter Employee Id";
     }else if (idVal.toString().length>5){
        setIdError(true)
        setIdErrText("Employee Id Should be less than 5 digits");
        validateErrObj.idVal = "Please Enter Employee Id";
     }else{
       setIdError(false)
       setIdErrText('');
       delete validateErrObj.idVal;
     }
    
     if (!empNameVal ){
      setEmpNameErr(true)
      setEmpErrText("Please Enter Employee name");
      validateErrObj.empName = "Please Enter Employee Name";
     }else if(empNameVal.length<3){
      setEmpNameErr(true)
      setEmpErrText("Employee Name Should be more than 3 char's")
      validateErrObj.empName = "Please Enter Employee Name";
     }else if(empNameVal.length>100){
      setEmpNameErr(true)
      setEmpErrText("Employee Name Should be less than 100 char's");
      validateErrObj.empName = "Please Enter Employee Name";
     }else{
      setEmpNameErr(false)
      setEmpErrText(null);
      delete validateErrObj.empName;
     }
    
    
     if(!role){
      setRoleErr(true);
      validateErrObj.role = "Please Select Role";
     }else{
      setRoleErr(false)
      delete validateErrObj.role;
     }
    
    if(!yearsOfExp){
      setYearsOfExpErr(true)
      validateErrObj.yoE = "Please Enter YOE";
    }else{
      setYearsOfExpErr(false);
      delete validateErrObj.yoE 
    }
    
    if(!primarySkillsVal){
      setPrimarySkillsErr(true)
      validateErrObj.primarySkills = "Please Enter Primary Skills";
    }else{
      setPrimarySkillsErr(false);
      delete validateErrObj.primarySkills;
    }
    
    if(!fileName){
      setAttachResumeErr(true);
      validateErrObj.fileName = "No File Choosen";
    }else{
      setAttachResumeErr(false);
      delete validateErrObj.fileName;
    }
  }

    
const submitFormData = ()=>{
  const validateFormData = formValidation();
  console.log(validateErrObj);
  if(Object.keys(validateErrObj).length===0){
    axios
        .post("https://jsonplaceholder.typicode.com/posts",{
          employeeId : idVal,
          employeeName: empNameVal,
          Role: role,
          experience:yearsOfExp,
          primarySkills:primarySkillsVal,
          secondarySkills:secondarySkillVal,
          file:fileName
        })
        .then((response)=>{
          console.log(response);
          clearAllHandler();
         
        })
        .catch((err)=>{
            console.log(err)
        })
  }
}



  
  return (
    <div className='add-employee-profile-bg-cont'>
        <Stack direction="row" spacing={20}>
          <div style={{display:"flex",flexDirection:"column"}}>
            <TextField 
            variant='outlined' label="Employee Id" sx={{backgroundColor:"none",width:270}} required type='number' value={idVal}
            onChange={e=>setIdVal(e.target.value)}
            error={Iderror}
            />
            {Iderror?<label className='label-text'>{idErrText}</label>:""}
          </div>
          <div style={{display:"flex",flexDirection:"column"}}>
            <TextField variant='outlined' label="Employee Name" sx={{backgroundColor:"none",width:270}} required type='text' 
            value={empNameVal}
            onChange={e=>setEmpName(e.target.value)}
            error={empNameError}
            // helperText={empNameError?"Please Enter Employee Name":""}
            />
            {empNameError?<label className='label-text'>{empErrText}</label>:""}
            </div>
        </Stack>
        <Stack direction="row" spacing={20} sx={{marginTop:"40px"}}> 
          <FormControl style={{width:"270px"}} required>
              <InputLabel label="Select Role" error={roleErr}>Select Role</InputLabel>
              <Select label='Select Role' fullWidth onChange={roleHandle} error={roleErr} value={role}>
                  <MenuItem value='Developer'>Developer</MenuItem>
                  <MenuItem value="JuniorDeveloper">Junior Developer</MenuItem>
                  <MenuItem value="SeniorDeveloper">Senior Developer</MenuItem>
                  <MenuItem value="TeamLead">Team Lead</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="DevopsEngineer">Devops Engineer</MenuItem>
                  <MenuItem value="SeniorDevopsEngineer">Senior Devops Engineer</MenuItem>
              </Select>
              {roleErr?<label className='label-text'>Please Select Employee's Role</label>:""}
          </FormControl>
          <div style={{display:"flex",flexDirection:"column"}}>
            <TextField  variant='outlined' label="Years of Experience" sx={{backgroundColor:"none",width:270}} required
            type='number' onChange={e=>setYearsOfExp(e.target.value)}
            step=".01"
            error={yearsOfExpErr}
            value={yearsOfExp}
            />
            {yearsOfExpErr?<label className='label-text'>Please Enter Years of Experience</label>:""}
          </div>
        </Stack>
        <div style={{display:"flex",flexDirection:"column",marginTop:"30px"}}>
           <h2 className='skills-heading'>Skills</h2>
           <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",flexDirection:"column"}}>
              <TextareaAutosize 
                placeholder='Enter Your Primary Skills'
                className='text-Area-autosize' 
                required
                onChange={e=>setPrimarySkillsVal(e.target.value)}
                error={setPrimarySkillsErr}
                value={primarySkillsVal}
              />
              {primarySkillsErr?<p className='label-text' style={{marginBottom:"20px"}}>* Please Enter Primary Skills</p>:""}
            </div>
            <TextareaAutosize 
                placeholder='Enter Your Secondary Skills'
                className='text-Area-autosize'
                value={secondarySkillVal}
                onChange={e=>setSecondarySkill(e.target.value)}
                style={{marginTop:"20px"}}
            />
           </div>
        </div>

        <div>
           <input type='file' id='file' accept='application/pdf' className='typeFileResume'
            onChange={({target:{files}}) =>{
            files[0] && setFileName(files[0].name)
           }}
           />
           <label className='uploadResumeButton' for="file">
              <img src={uploadImage} className='uploadImage'/>
              <p className='uploadResumeBtnText' type="file" onClick={()=>{setAttachResumeErr(false)}}>Upload Resume</p>
            </label>
            {!attachResumeErr?<p style={{marginTop:"0px",color:"green"}}>{fileName}</p>:<p className='label-text'>No File Choosen</p>}
            
        </div>
        <div className='add-emp-buttons-cont'>
            <button style={{marginRight:"30px"}} className='addEmployeeBtn' onClick={submitFormData} >Add Employee</button>
            <button className='cancelBtn' onClick={clearAllHandler}>Clear All</button>
        </div>
    </div>
  )
}

export default AddEmployeeProfile