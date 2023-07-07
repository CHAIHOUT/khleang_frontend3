import React, { useEffect, useState } from 'react';
import './css/admin.css';

// route
import { Link } from 'react-router-dom';
import { Routes , Route , useNavigate } from "react-router-dom";

// react-con
import {BiHomeAlt2} from 'react-icons/bi'
import {MdOutlineForwardToInbox} from 'react-icons/md'

import Admin_home from './Admin_home';
import Admin_inbox from './Admin_inbox';
import axios from 'axios';

export default function Admin() {
    //Direct to Home Admin
    const navigate = useNavigate();
    const Direct=()=>{
        navigate('./Admin_home');
    }
    useEffect(()=>{
        Direct();
    },[]);

    // To Logout
    const DirectLogin=()=>{
        navigate('/khleang_login');
    }
    // Logout
    const Logout=()=>{
        localStorage.clear();
        DirectLogin();
    }

    // Calender
    const[DataBox,setDataBox] = useState([]);

    useEffect(()=>{
        fun_getDataUpload();
    },[])

    // fun get All Upload
    const fun_getDataUpload=async ()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        // axios.get('http://127.0.0.1:8000/api/inbox',{
        //     headers:{
        //         "Authorization" : "Bearer "+Token.token,
        //     }
        // }).then((dataBox)=>{
        //     setDataBox(dataBox.data);
        // });
        let Data = await axios.get('http://127.0.0.1:8000/api/inbox',{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            })
        setDataBox(Data.data);
    }

  return (
    <div id='admin_body'>
        <div id='admin_body_left'>
            <div id='left_box'><img id='left_box_logo' src='../../../img/KhleangLogo.png' /></div>
            <div id='left_box'><Link className='a_margin' to='Admin_home'><BiHomeAlt2 size="30" color='white'/></Link></div>
            <div id='left_box'><Link id='a_inbox' to='Admin_inbox'><MdOutlineForwardToInbox size="30" color='white'/>{DataBox.length}</Link></div>
            <div id='left_box_logout'>
            <button id='admin_left_btn' type="button" onClick={Logout} class="btn btn-outline-danger">Logout</button>
            </div>
        </div>
        <div id='admin_body_right'>
            <Routes>
                <Route path='Admin_home' element={<Admin_home/>}></Route>
                <Route path='Admin_inbox' element={<Admin_inbox/>}></Route>
            </Routes>
        </div>
    </div>
  )
}
