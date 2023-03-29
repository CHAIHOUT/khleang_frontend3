import React, { useState } from 'react';
import axios from 'axios';

import '../css/login.css';

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {

    //Redirt to Home use in Upload URL
    const navigate = useNavigate();
    const Direct=()=>{
        navigate('/khleang_login/login');
    }
    const LoginDirect=()=>{
        navigate('/khleang_login/login');
    }
    const login=()=>{
        Direct();
    }

    // Register
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [Cpassword,setCpassword] = useState("");


    const register =async ()=>{
        // validation
        if(name == "" && email == "" && password == "" && Cpassword =="" ){
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
        }else if(password != Cpassword ){
            toast.error('Password not Match...!', {
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
            const data = {name,email,password};
            const res = await axios.post("http://127.0.0.1:8000/api/register",data);
            if(res.status == 201){
                toast.success('Register Success', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    LoginDirect();
                }, 1000);
            }
        }
    }

  return (
    <div>
        <div id='login_title'><center><b>Register</b></center></div>
        <div id='login_form2'>
            <form>
                <div class="mb-1">
                    <label for="Input0" class="form-label">Name</label>
                    <input type="text" value={name} onChange={(e)=> setname(e.target.value)} class="form-control" id="Input0" placeholder="Email address"/>
                </div>
                <div class="mb-1">
                    <label for="Input1" class="form-label">Email</label>
                    <input type="email" value={email} onChange={(e)=> setemail(e.target.value)} class="form-control" id="Input1" placeholder="Email address" />
                </div>
                <div class="mb-1">
                    <label for="Input2" class="form-label">password</label>
                    <input type="password" value={password} onChange={(e)=> setpassword(e.target.value)} class="form-control" id="Input2" placeholder="Password" />
                </div>
                <div class="mb-3">
                    <label for="Input3" class="form-label">Confirm password</label>
                    <input type="password" value={Cpassword} onChange={(e)=> setCpassword(e.target.value)} class="form-control" id="Input3" placeholder="Password" />
                </div>
                <center><button type="button" onClick={register} class="btn btn-light">Resgister</button></center>
                {/* Toastify */}
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
            <div id='login_foot'>
                <p>have an Account ?</p>
                <a onClick={login}>Login</a>
            </div>
        </div>
    </div>
  )
}
