import React, { useEffect, useState } from 'react';
import './css/admin_inbox.css';

import Inbox_card from './Inbox_card';

// modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function Admin_inbox() {

    const[DataUser,setDataUser] = useState([]);

    useEffect(()=>{
        fun_getDataUser();
    },[]);

    //delete filter UI  (no window reload)
    const deleteUI=(id)=>{
        setDataUser(DataUser.filter(DataUser => DataUser.id !== id));
    }

    // fun get All User
    const fun_getDataUser=async ()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        // axios.get('http://127.0.0.1:8000/api/inbox',{
        //     headers:{
        //         "Authorization" : "Bearer "+Token.token,
        //     }
        // }).then((dataUser)=>{
        //     setDataUser(dataUser.data);
        // });
        let Data = await axios.get('http://127.0.0.1:8000/api/inbox',{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            })
        setDataUser(Data.data);
    }


  return (
    <div id='inbox_body'>
        {
            DataUser.map((item)=>{
                return <Inbox_card key={item.id} item={item} deleteUI={deleteUI}></Inbox_card>
            })
        }
    </div>
    
  )
}

