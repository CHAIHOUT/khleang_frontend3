import React, { useState } from 'react';
import '../css/login.css';
import PrivateRoutes from '../../PrivateRoutes';

import { useNavigate } from "react-router-dom";
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  //Redirt to Home use in Upload URL
  const navigate = useNavigate();
  const Direct=()=>{
    navigate('/khleang_login/register');
  }
  const HomeDirect=()=>{
    navigate('/');
  }
  const register=()=>{
    Direct();
  }

  // Login
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [Token,setToken] = useState("");

  const Login=async()=>{
    if( email =="" && password ==""){
      toast.warn('Please Insert all form...!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }else{
      const data = {email,password};
      const res = await axios.post("http://127.0.0.1:8000/api/login",data);
      if(res.status == 200){
        console.log(res.data);
        localStorage.setItem("auth",JSON.stringify(res.data));
        // const Auth = JSON.parse(localStorage.getItem("auth")); 
        setTimeout(() => {
          HomeDirect();
        }, 2000);
      }
    }
  }

  // test Logout
  const Logout=()=>{
    localStorage.clear();
    alert("Log out Success");
  }

  return (
      <div>
        <div id='login_title'><center><b>Login</b></center></div>
        <div id='login_form'>
          <form>
            <div class="mb-2">
              <label for="Input1" class="form-label">Email</label>
              <input type="email" value={email} onChange={(e) => setemail(e.target.value)} class="form-control" id="Input1" placeholder="Email address" />
            </div>
            <div class="mb-3">
              <label for="Input2" class="form-label">password</label>
              <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} class="form-control" id="Input2" placeholder="Password" />
            </div>
            <center><button type="button" onClick={Login} class="btn btn-light" id='login_btn'>LOGIN</button></center>
            {/* toastify */}
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
            />
          </form>
        </div>
        <div id='login_foot'>
          <p>Don't have an Account ?</p>
          <a onClick={register}>Register</a>
        </div>
        <button onClick={Logout}>Login</button>
      </div>
  )
}
