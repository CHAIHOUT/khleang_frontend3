import React, { useEffect, useState } from 'react';
import './style/upload_list.css';
// modal
import { Button, Modal } from 'react-bootstrap';

import axios from "axios";

// react icon
import {FcDownload} from 'react-icons/fc';

export default function Upload_list({ item,deleteUI }) {

  // Modal Delete
  const[show2,setshow2]=useState(false);
  const handleshow2 = () => setshow2(true);
  const handleclose2 = () => setshow2(false);

  //Delete
  const btn_delete=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.delete('http://localhost:8000/api/upload/'+item.id,{
      headers:{
        "Authorization" : "Bearer "+Token.token,
      }
    }).then((allData) => {
       console.log("DELETE DONE");
    }).catch((err) => console.log(err))
    .then(()=>{
      deleteUI(item.id);    // UI delete
    });
  }

  const [imgFileType,setimgFileType] = useState('');

  const checkFileType=()=>{
    if(item.type_file === "file"){
      setimgFileType("../img/file.webp")
    }else if(item.type_file === "photo"){
      setimgFileType(item.file);
    }else if(item.type_file === "video"){
      setimgFileType("../img/videoIcon.png");
    }
  }

  useEffect(()=>{
    setimgFileType('');
    checkFileType();
  },[]);

  return (
    <div id='list_box'>
        <img id='box_img' src={imgFileType}></img>
        <div id='p_box'>
          <p id='p'>{item.file_name}</p>
          <p id='p_size'>{item.file_size}KB</p>
        </div>
        <button type="button" onClick={handleshow2} class="btn btn-outline-danger"><img src='../img/trash.png'></img></button>
        <a id='download' href={item.file} target="_blank" download><FcDownload size="27"/></a>

        {/* Delete Modal */}
        <Modal show={show2}>
          <Modal.Header>
            <Modal.Title>
                  Delete
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are You Sure to Delete!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleclose2}>Close</Button>
            <Button onClick={btn_delete}>Yes</Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
