import React from 'react';
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import CalendarState from "./context/CalendarContext";
import TaskForm from "./components/TaskForm";

import './index.css';
import { Link, useNavigate } from "react-router-dom";

export default function Khleang_calender() {
    //Detail Button
    const navigate = useNavigate();
    const DirectHome=()=>{
      navigate('/');
    }
  return (
    <div id='body_calender'>
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
      <div className="container">
        <a onClick={DirectHome}><img src='../img/left.svg'></img></a>
        <CalendarState>
          <Header />
          <Calendar />
          <TaskForm/>
        </CalendarState>
      </div>
    </div>
  )
}
