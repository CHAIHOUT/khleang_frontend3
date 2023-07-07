import React, { useEffect, useState } from 'react';
import './css/admin_home.css';
import axios from 'axios';

import Admin_table_box from './Admin_table_box';


export default function Admin_home() {

    const[DataUser,setDataUser] = useState([]);
    const[DataNote,setDataNote] = useState([]);
    const[DataUpload,setDataUpload] = useState([]);
    const[DataCalender,setDataCalender] = useState([]);

    useEffect(()=>{
        fun_getDataUser();
        fun_getDataNote();
        fun_getDataUpload();
        fun_getDataCalender();
    },[])

    // fun get All User
    const fun_getDataUser=async ()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        // axios.get('http://127.0.0.1:8000/api/getalluser',{
        //     headers:{
        //         "Authorization" : "Bearer "+Token.token,
        //     }
        // }).then((dataUser)=>{
        //     setDataUser(dataUser.data);
        // });
        let Data = await axios.get('http://127.0.0.1:8000/api/getalluser',{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        })
        setDataUser(Data.data);
    }

    // fun get All Note
    const fun_getDataNote=async ()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        // axios.get('http://127.0.0.1:8000/api/getallnote',{
        //     headers:{
        //         "Authorization" : "Bearer "+Token.token,
        //     }
        // }).then((dataNote)=>{
        //     setDataNote(dataNote.data);
        // });
        let Data = await axios.get('http://127.0.0.1:8000/api/getallnote',{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            })
        setDataNote(Data.data);
    }

    // fun get All Upload
    const fun_getDataUpload=async ()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        // axios.get('http://127.0.0.1:8000/api/getallupload',{
        //     headers:{
        //         "Authorization" : "Bearer "+Token.token,
        //     }
        // }).then((dataUpload)=>{
        //     setDataUpload(dataUpload.data);
        // });
        let Data = await axios.get('http://127.0.0.1:8000/api/getallupload',{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            })
        setDataUpload(Data.data);
    }

    // fun get All Calender
    const fun_getDataCalender=async ()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        // axios.get('http://127.0.0.1:8000/api/getallcalender',{
        //     headers:{
        //         "Authorization" : "Bearer "+Token.token,
        //     }
        // }).then((dataCalender)=>{
        //     setDataCalender(dataCalender.data);
        // });
        let Data = await axios.get('http://127.0.0.1:8000/api/getallcalender',{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            })
        setDataCalender(Data.data);
    }

    //delete filter UI  (no window reload)
    const deleteUI=(id)=>{
        setDataUser(DataUser.filter(DataUser => DataUser.id !== id));
    }

  return (
    <div id='admin_home_body'>
        <div id='head'>
            <h3>Administration</h3>
        </div>
        <div id='body'>
            <div id='body_box1'>
                <div id='total'><h2>Total</h2></div>
                <div id='total_value'>
                    <div id='total_box'>
                        <p id='value' className='color1'>{DataUser.length}</p>
                        <p id='type' className='color1'>USER</p>
                    </div>
                    <div id='total_box' className='color2'>
                        <p id='value'>{DataNote.length}</p>
                        <p id='type' className='color2'>NOTE PRODUCT</p>
                    </div>
                    <div id='total_box' className='color3'>
                        <p id='value'>{DataUpload.length}</p>
                        <p id='type' className='color3'>UPOAD PRODUCT</p>
                    </div>
                    <div id='total_box' className='color4'>
                        <p id='value'>{DataCalender.length}</p>
                        <p id='type' className='color4'>CALENDER PRODUCT</p>
                    </div>
                </div>
            </div>

            <div id='body_box2'>
                <table id='table'  width="100%">
                    <tr id='t_head'>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Created</th>
                        <th>Delete User</th>
                    </tr>

                    {
                        DataUser.map((item)=>{
                            return <Admin_table_box key={item.id} item={item} deleteUI={deleteUI} fun_getDataNote={fun_getDataNote} fun_getDataUpload={fun_getDataUpload} fun_getDataUser={fun_getDataUser}/>
                        })
                    }

                </table>
            </div>
        </div>
    </div>
  )
}
