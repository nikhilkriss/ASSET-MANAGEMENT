import React from 'react'
import { useEffect, useState } from 'react'
import {auth,provider} from '../Firebaseconfig'
import '../Assets/LoginPg.css'
import { signInWithPopup } from 'firebase/auth'
import HomePage from './HomePage'
import proximaLogo from '../Assets/Images/ProximaLogo.png'

const Login = () => {
    const [value,setValue] = useState(null);

    // const signInWithGoogle = () =>{
    //     signInWithPopup(auth,provider)
    //     .then(data=>{
    //         setValue(data.user.email);
    //         localStorage.setItem("email",data.user.email);
    //     })
    // };
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
          .then(data => {
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
          })
          .catch(error => {
            if (error.code === "auth/popup-blocked") {
              // Handle popup blocking here, show alternative sign-in method
              alert("Popup blocked. Please click the button again to sign in.");
              // Alternatively, redirect to a separate login page for redirect-based authentication
            } else {
              // Handle other errors
              console.error("Error signing in with Google:", error);
            }
          });
      };

    useEffect(()=>{
        setValue(localStorage.getItem("email"));
    },[]);

  return (
    value?<HomePage value={value}/>:
    <div className='bgContainer'>
        <div className='bg-Image-Container'></div>
        <div className='text-container'>
            <img src={proximaLogo} className='proxima-logo' style={{marginBottom:"20px"}}/>
            <h1 >Welcome to<br/>Asset Management</h1>
            <button className='google-sign-in-btn' onClick={signInWithGoogle}>
                <img src='https://th.bing.com/th/id/OIP.zGN-I33BmulL9J4LjyZmQAHaHa?pid=ImgDet&rs=1' className='google-icon'/>
                <p className='google-sign-in-text'>Login with Google</p>
            </button>
        </div>
    </div>
  )
}

export default Login