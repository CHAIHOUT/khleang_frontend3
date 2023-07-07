import React from 'react';
import './css/setting.css';
import { Link , useNavigate } from 'react-router-dom';

// Card
import Setting_profile from './Setting_profile';
import Setting_login from './Setting_login';

export default function Setting() {

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
    <div id='setting_main'>
        <div id='setting_left'>
            <div id='setting_back'>
                <div id='setting_back_img'>
                    <Link to={'/'}><img src='../../img/left.svg' /></Link>
                    <img id='setting_setting' src='../../img/setting.png'/><b>Setting</b>
                </div>
            </div>
            <div id='setting_link'>
                <img src='../../img/profile.png' /><b id='s_b'>Account</b>
            </div>
            <div id='setting_logout'>
                <button onClick={Logout} type="button" class="btn btn-outline-danger">logout</button>
            </div>
        </div>
        <div id='setting_right'>
            <div id='setting_box'>
                <Setting_profile/>
            </div>
            <div id='setting_box'>
                <Setting_login/>
            </div>
        </div>
    </div>
  )
}
