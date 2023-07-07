import React, { useState } from 'react';
import axios from 'axios';

import '../css/login.css';
import '../css/otp.css';

import { useNavigate } from "react-router-dom";

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//spinners
import ClipLoader from "react-spinners/ClipLoader";


// OTP INPUT
import OTPInput, { ResendOTP } from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

    //OTP Function
import { auth } from '../../FirebaseOTP';
import {RecaptchaVerifier ,signInWithPhoneNumber} from "firebase/auth";


export default function Register() {

    // Spinner
    const [isloading,setisloading] = useState(false);
        //CSS spiner
    const override = {
        margin: "0px 5px 0px 0px ",
        width: "17px",
        height: "17px",
      };    

    // OTP
    const [OTP, setOTP] = useState("");
    const[show,setshow] = useState(false);

    //Redirt to Home use in Upload URL
    const navigate = useNavigate();
    const Direct=()=>{
        navigate('/khleang_login/login');
    }
    const LoginDirect=()=>{
        navigate('/khleang_login/login');
    }
    const HomepageDirect=()=>{
        navigate('/');
    }
    const ToRegister=()=>{
        navigate('/khleang_login/register');
    }
    const login=()=>{
        Direct();
    }

    // Register
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [Cpassword,setCpassword] = useState("");
    const [ph,setph] = useState("");


    // Regis at verify
    const R_verify=async()=>{
        setisloading(true)
        const phone_number = ph;
        const data = {name,email,password,phone_number};
        localStorage.setItem("len_pass",password.length);
        const res = await axios.post("http://127.0.0.1:8000/api/register",data);
        if(res.status == 200){
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
            localStorage.setItem("auth",JSON.stringify(res.data));
            setTimeout(() => {
                setisloading(false)
                HomepageDirect();
            }, 2000);
        }
    }


    //To OTP & REGISTER
    const ToOtp=()=>{
        setshow(true);
    }
    const ToRegis=()=>{
        setshow(false);
    }

    // OTP Function
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

    function onSignup(){
        onCaptchVerify()

        const appVerifier = window.recaptchaVerifier;

        const formatPh = '+' + ph;
        console.log(formatPh);
        if(name != "" && email != "" && password != "" && Cpassword !="" && ph != ""){
            if(password != Cpassword){
                    toast.warn('Password not match', {
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
                    setshow(true)
                }).catch((error) => {
                    console.log(error);
                });   
            }
        }else{
            toast.warn('Please Inset phone number', {
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
        window.confirmationResult.confirm(OTP).then(async(res)=>{
            console.log(res)
            R_verify();
        }).catch((err)=>{
            console.log(err)
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

  return (
    <div id='login_main'>
        {
            show ?
                <div>
                    <div id='login_main2'>
                        <div id='login_title'><center><b>ENTER YOUR VERIFY NUMBER</b></center></div>

                        <div id='otp_field'>
                            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false}  />
                            <button onClick={onOTPVerify} type="button" class="btn btn-outline-primary">{isloading?<ClipLoader color={'#360bf7'} cssOverride={override} loading={isloading} size={60} aria-label="Loading Spinner" data-testid="loader"/>:<div></div>}Verify OTP</button>
                        </div>
                        <div id='reset_otp'>
                        <ResendOTP onResendClick={() => onSignup()} />
                        </div>
                        <div id='login_foot'>
                                <p>Back to Register ?</p>
                                <a onClick={ToRegis}>Register</a>
                        </div>
                    </div>
                </div>
            :
            <div>
                <div id='login_title'><center><b>Register</b></center></div>
                <div id='login_form2'>
                    <form>
                        <div class="mb-1">
                            <label for="Input0" class="form-label">Name</label>
                            <input type="text" value={name} onChange={(e)=> setname(e.target.value)} class="form-control" id="Input0" placeholder="Email address" required/>
                        </div>
                        <div class="mb-1">
                            <label for="Input1" class="form-label">Email</label>
                            <input type="email" value={email} onChange={(e)=> setemail(e.target.value)} class="form-control" id="Input1" placeholder="Email address" required/>
                        </div>
                        <div id='R_phonenumber'>
                            <label id='ph_label'>Phone Number : *Please Input the valid phone number*</label>
                            <PhoneInput country={"ca"} value={ph} onChange={setph} />
                        </div>
                        <div class="mb-1">
                            <label for="Input2" class="form-label">password</label>
                            <input type="password" value={password} onChange={(e)=> setpassword(e.target.value)} class="form-control" id="Input2" placeholder="Password" required/>
                        </div>
                        <div class="mb-3">
                            <label for="Input3" class="form-label">Confirm password</label>
                            <input type="password" value={Cpassword} onChange={(e)=> setCpassword(e.target.value)} class="form-control" id="Input3" placeholder="Password" required/>
                        </div>
                        <div id='login_body_btn'>
                            <button type="button" id='resgister_btn' onClick={onSignup} class="btn btn-light">Resgister</button>
                        </div>

                    </form>
                    <div id='login_foot'>
                        <p>have an Account ?</p>
                        <a onClick={login}>Login</a>
                    </div>
                </div>
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
