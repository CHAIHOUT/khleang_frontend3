import "../../style/detail.css";

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import left from '../../img/left.svg';
import axios from "axios";

// react icon
import {FcDownload} from 'react-icons/fc';

function Note_detail() {
  const { id } = useParams();
  const [data,setdata] = useState([]);
  const[type_file,settype_file] = useState("");

  useEffect(()=>{
      const Token = JSON.parse(localStorage.getItem("auth"));
      axios.get('http://localhost:8000/api/note/'+id,{
        headers:{
          "Authorization" : "Bearer "+Token.token,
        }
      }).then((Data)=>{
        setdata(Data.data);
        fun_checkfiletype(Data.data);
      });
  },[]);

  const[a,seta] = useState(false);
  const[b,setb] = useState(false);

  // Check file type
  const fun_checkfiletype=(item)=>{
    if(item.type_file == "photo"){
      seta(true)
      setb(false)
      settype_file(item.image);
    }else if(item.type_file == 'file'){
      seta(true)
      setb(false)
      settype_file("../../../img/file.webp");
    }else if(item.type_file == 'video'){
      seta(true);
      setb(true)
      settype_file("../../../img/videoIcon.png");
    }
  }

  // Turn back
  const navigate = useNavigate();
  const back = () => {
    navigate('/khleang_note');
  }

  return (
    <main>
      <div class="containers">
            <div id="row_1">
                <a onClick={back}><img id="left_img" src={left}></img></a>
                <center><p id="detail_caption">{data.caption}</p></center>
            </div>
            <div id="row_2">
                <p id="detail_img">Image :</p>
                {
                  a?b?<video id="vid" src={data.image} controls/>
                    :<img src={type_file}></img>
                  :<div></div>
                }
                <a id="download" href={data.image} target="_blank" downloaded><FcDownload size="35"/></a>
                {/* <video id="vid" src={data.image} controls/> */}
                {/* <img src={type_file}></img> */}
            </div>
            <div id="row_3">
                <p id="text">description :</p>
                <textarea value={data.description} id="detail_desc" minLength='400'></textarea>
            </div>
        </div>
    </main>
  )
}

export default Note_detail