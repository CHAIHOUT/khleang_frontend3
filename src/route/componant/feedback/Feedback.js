import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes , Route , useNavigate } from "react-router-dom";

import Head from '../../../Head';

// css
import "../../../style/khleang_display.css";
import './css/feedback.css'; 
// icon
import { VscFeedback } from 'react-icons/vsc';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Feedback() {

    const[message,setmessage] = useState('');

    //Redirt to Home use in Upload URL
    const navigate = useNavigate();
    const Direct=()=>{
        navigate('/');
    }

    const fun_submit=()=>{
        if(message != ""){
            const Token  = JSON.parse(localStorage.getItem("auth"));
            const data = {message}
            axios.post('http://127.0.0.1:8000/api/inbox',data,{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                } 
            }).then((Data)=>{
                toast.success('Feedback Success', {
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
                    Direct();
                }, 1000);
            });
        }else{
            toast.warn('Please Insert the Feedback...!', {
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

  return (
    <main>
        <Head/>

        <div id='feedback_body'>
            <div id='feedback_logo'>
                <p><VscFeedback size="45"/> Feedback </p>
            </div>
            <div id='feedback_box'>
                <div id='f_form'>
                    <textarea id='f_des' value={message} onChange={e => setmessage(e.target.value)} placeholder='comment your feedback here....'></textarea>
                </div>
                <div id='f_btn'>
                    <button onClick={fun_submit} type="button" class="btn btn-outline-primary">Submit</button>
                </div>
            </div>
        </div>

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
    </main>
  )
}
