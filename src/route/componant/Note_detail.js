import "../../style/detail.css";

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import left from '../../img/left.svg';
import axios from "axios";

function Note_detail() {
  const { id } = useParams();
  const [data,setdata] = useState([]);

  useEffect(()=>{
      const Token = JSON.parse(localStorage.getItem("auth"));
      axios.get('http://localhost:8000/api/note/'+id,{
        headers:{
          "Authorization" : "Bearer "+Token.token,
        }
      }).then((Data)=>{
        setdata(Data.data);
      });
  },[]);

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
                <img src={data.image}></img>
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