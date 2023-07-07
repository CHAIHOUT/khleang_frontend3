import React from 'react';
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import CalendarState from "./context/CalendarContext";
import TaskForm from "./components/TaskForm";

import Head from './Head';

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

      <Head/>

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
