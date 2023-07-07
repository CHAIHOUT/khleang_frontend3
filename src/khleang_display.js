import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./style/khleang_display.css";
import axios from 'axios';

import Head from './Head';

function Note_display() {

    useEffect(()=>{
        fun_getDataBaseCalender()
    },[])

    // For Calender
    const fun_getDataBaseCalender=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        let tempdata = [];
        axios.get('http://127.0.0.1:8000/api/calender',{
          headers:{
              "Authorization" : "Bearer "+Token.token,
          }
        }).then((Data)=>{
          tempdata = Data.data;
          tempdata.map((item)=>{
            item.date = new Date(item.date)
          })
          console.log(tempdata)
          localStorage.setItem("$calendar_db", JSON.stringify(tempdata));
        })
      }

  return (
    <main>
        <Head/>

        <div className="box">
            <div className="row">
                <div className="column">
                    <Link to={'/khleang_note'}>
                        <div id="link_bg">
                            <p id="font">Note</p>
                            <p id="font_below">The place where you can note</p>
                            <img src="./img/n3.png" />
                        </div>
                    </Link>
                </div>

                <div className="column">
                    <Link to={'/Calender'} id="link_bg_calender" >
                        <p id="font">Calender</p>
                        <p id="font_below">The place where you can set your date</p>
                        <img src="./img/c5.jpg" />
                    </Link>
                </div>

                <div className="column">
                    <Link to={'/Khleang_upload'}>
                        <div id="link_bg_upload">
                            <p id="font">Upload</p>
                            <p id="font_below">The place where you can upload</p>
                            <img src="./img/upload2.png" />
                        </div>
                    </Link>
                </div> 

            </div>
        </div>

        <div className="foot">
            <img src="./img/st1.png" id="foot_img" />
        </div>

    </main>
  )
}

export default Note_display