import React, { useEffect, useState } from 'react';
import './css/profile.css';

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Profile() {

    const[userdata,setuserdata] = useState([]);

    useEffect(()=>{
        getDataUser();
    },[])

    const getDataUser=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://localhost:8000/api/upload',{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((datauser)=>{
            setuserdata(Token.user);
            console.log(userdata);
        })
    }

    //To Login
    const navigate = useNavigate();
    const DirectLogin=()=>{
        navigate('/khleang_login');
    }

    // Logout
    const Logout=()=>{
        localStorage.clear();
        DirectLogin();
    }

  return (
    <div id='profile_main'>
        <div className="head_display" >
            <Link to={"/"}  className="icon">
                <img src="./img/home.png" id="img_head" />
            </Link>
            <a href="" className="icon">
                <img src="./img/setting.png" id="img_head" />
            </a>
            <a href="" className="icon">
                <img src="./img/spp.png" id="img_head" />
            </a>
            <a href="" className="icon2">
                <img src="./img/profile.png" id="img_head_profile" />
            </a>
            <a href="" id="logo_khleang">
                <img src="./img/KhleangLogo.png" id="img_head" />
            </a>
        </div>
        <div id='profile_body'>
            <div id='profile_cycle'>
                <img src='../../../img/KhleangLogo.png'></img>
            </div>
            <center>
                <div id='profile_username'>{userdata.name}</div>
            </center>
            <div id='profile_info_body'>
                <div id='profile_info'>
                    <p><b>Username :</b> {userdata.name}</p>
                    <p><b>Email :</b> {userdata.email}</p>
                    <p><b>Created Date :</b> {userdata.created_at}</p>
                </div>
            </div>
            <center>
                <div id='profile_logout'>
                    <button type="button" onClick={Logout} class="btn btn-outline-danger">Logout</button>
                </div>
            </center>
        </div>
    </div>
  )
}
