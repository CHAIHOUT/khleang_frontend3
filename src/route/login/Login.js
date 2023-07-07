import React, { useState } from 'react';
import '../css/login.css';
import '../css/otp.css';

import { useNavigate } from "react-router-dom";
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// modal
import { Button, Modal } from 'react-bootstrap';
//spinners
import PacmanLoader from "react-spinners/PacmanLoader";
import ClipLoader from "react-spinners/ClipLoader";

// OTP INPUT
import OTPInput, { ResendOTP } from "otp-input-react";
import 'react-phone-input-2/lib/style.css';

    //OTP Function
import { auth } from '../../FirebaseOTP';
import {RecaptchaVerifier ,signInWithPhoneNumber} from "firebase/auth";

export default function Login() {

  const[show,setshow] = useState(false);
  const [OTP, setOTP] = useState("");
  const [ph,setph] = useState("");

  // Spinner
  const [isloading2,setisloading2] = useState(false);
  //CSS spiner
  const override2 = {
    margin: "3px 8px 0px 0px ",
    width: "17px",
    height: "17px",
  };   

  //Redirt to Home use in Upload URL
  const navigate = useNavigate();
  const Direct=()=>{
    navigate('/khleang_login/register');
  }
  const HomeDirect=()=>{
    navigate('/');
  }
  const ToLogin=()=>{
    navigate('/khleang_login/login')
  }
  const admin=()=>{
    navigate('/Admin');
  }

  // Login
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");


  // login & get phone number
  const fun_LoginGetPh=async()=>{
    const data = {email,password};
    const res = await axios.post("http://127.0.0.1:8000/api/login",data);
    if(res.status == 200){
      if(res.data == ""){
        toast.warn('Incorrect account...!', {
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
        if(res.data.admin == "admin"){
          localStorage.setItem("auth",JSON.stringify(res.data));
          localStorage.setItem("len_pass",password.length); // jab pass for len
          localStorage.setItem("admin",JSON.stringify(res.data));
          // admin();
          localStorage.setItem("ph",JSON.stringify('+'+res.data.user.phone_number));
        }
        else{
          console.log(res.data);
          localStorage.setItem("auth",JSON.stringify(res.data));
          localStorage.setItem("len_pass",password.length); // jab pass for len
          // HomeDirect();
          localStorage.setItem("ph",JSON.stringify('+'+res.data.user.phone_number));
        }
      }
    }
  }

  // Loading modal
  const[show2,setshow2]=useState(false);
  const handleshow2 = () => setshow2(true);
  const handleclose2 = () => setshow2(false);
  // spinner
  const [isloading,setisloading] = useState(false);
  //CSS spiner
  const override = {
    width: "100px",
    height: "50px",
    float: "left",
  };


// OTP

const ToRegis=()=>{
  setshow(false);
}

function onCaptchVerify(){
  if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          size: 'invisible',
          callback: (response) => {
              // onSignup()
          },
          'expired-callback': () => {

          },
        }, auth);
  }
}

  async function onSignup(){
    onCaptchVerify()
    setisloading(true)
    const appVerifier = window.recaptchaVerifier;
    const run = await fun_LoginGetPh();

      if(email != "" && password != ""){
        const ph = localStorage.getItem("ph");
        const formatPh = ph;
        console.log(ph);
        signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            toast.success('OTP sended Success !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setisloading(false)
            setshow(true)
        }).catch((error) => {
            setisloading(false)
            console.log(error);
        }); 
      }else{
        setisloading(false)
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
      }  

  }

  function onOTPVerify(){
    setisloading2(true)
    window.confirmationResult.confirm(OTP).then(async(res)=>{
        console.log(res)
        setisloading2(false)
        if(!localStorage.getItem('admin')){
          HomeDirect();  
        }else{
          admin();
        }
    }).catch((err)=>{
        console.log(err)
        setisloading2(false)
        toast.warn('Wrong Verify Number...!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    })
  }

  const Test=()=>{
    localStorage.clear();
  }

  return (
      <div id='login_main'>
        {
          show ? 
            <div>
                <div id='login_main2'>
                  <div id='login_title'><center><b>ENTER YOUR VERIFY NUMBER</b></center></div>

                  <div id='otp_field'>
                    <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false}  />
                    <button onClick={onOTPVerify} type="button" class="btn btn-outline-primary">{isloading2?<ClipLoader color={'#360bf7'} cssOverride={override2} loading={isloading} size={60} aria-label="Loading Spinner" data-testid="loader"/>:<div></div>}Verify OTP</button>
                  </div>
                  <div id='reset_otp'>
                    <ResendOTP onResendClick={() => onSignup()} />
                  </div>
                  <div id='login_foot'>
                    <p>Back to Login ?</p>
                    <a onClick={ToLogin}>Login</a>
                  </div>
                </div>              
            </div>
          :
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
                <div id='login_body_btn'>
                  <button type="button" onClick={onSignup} class="btn btn-light" id='login_btn'>{isloading?<ClipLoader color={'#360bf7'} cssOverride={override2} loading={isloading} size={60} aria-label="Loading Spinner" data-testid="loader"/>:<div></div>}LOGIN</button>
                  <button onClick={Test}>Logout</button>
                </div>

              </form>
            </div>
            <div id='login_foot'>
              <p>Don't have an account ?</p>
              <a onClick={Direct}>Register</a>
            </div>

            {/* Loading Modal */}
            <Modal show={show2}>
              <Modal.Body>
                <span id='spann'>Loading Please Wait!</span><PacmanLoader color={'#360bf7'} cssOverride={override} loading={true} size={20} aria-label="Loading Spinner" data-testid="loader"/>
              </Modal.Body>
            </Modal>
          </div>
        }

        <div id='recaptcha-container'></div>
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
      </div>
  )
}
