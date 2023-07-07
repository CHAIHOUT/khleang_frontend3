import React, { useEffect, useState } from 'react';
import './css/setting_profile.css';

// modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Setting_login() {

    const[star,setstar] = useState('');
    const[oldpassword,setoldpassword]= useState('');
    const[password,setpassword]= useState('');
    const[confpass,setconfpass]= useState('');

    // modal
    const[show,setshow]=useState(false);
    const handleshow = () => setshow(true);
    const handleclose = () => setshow(false);
    const [isloading,setisloading] = useState(false);

    useEffect(()=>{
        getStar();
    },[])

    const getStar=()=>{
        let n = localStorage.getItem("len_pass");
        let stars = '';
        for (let index = 0; index < n; index++) {
            const temp = "*";
            stars = stars + temp;
        }
        setstar(stars);
    }

    // modal close
    const btn_close=()=>{
        handleclose();
        setoldpassword('');
        setpassword('');
    }

    const btn_save=()=>{
      if(password == confpass){
        const Token = JSON.parse(localStorage.getItem("auth"));
        const data = {oldpassword,password};
        axios.put('http://localhost:8000/api/changepassword',data,{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        }).then((Data)=>{
          if(Data.data == true){
            toast.success('ChangePassword Success', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.setItem("len_pass",password.length);
            getStar();
            setTimeout(() => {
              handleclose();
            }, 1000);
          }else{
            toast.error('Old Password Incorrect...!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
      }else{
        toast.warn('Confirm Password & New password is not match...!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }

  return (
    <div id='setting_profile'>
        <div id='setting_profile_head'>
            <p><b>Change Password :</b></p>
            <a onClick={handleshow}><b>Edit</b></a>
        </div>
        <div id='setting_profile_body'>
            {/* <div id='setting_profile_pic'>
                <img src={userdataimg?userdataimg.user_image:tempImg} id='sp_img'></img>
            </div> */}
            <div id='sp_name'>
                <p><b>Password :</b></p>
                <div id='sp_name_box'>{star}</div>
            </div>

        </div>

        {/* Update Modal */}
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              Change Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label for="ip_caption" className="form-label">Old Password :</label>
              <input value={oldpassword} onChange={e => setoldpassword(e.target.value)} type="password" className="form-control" id="ip_caption" />
            </div>
            <div className="mb-3">
              <label for="ip_caption2" className="form-label">New Password :</label>
              <input value={password} onChange={e => setpassword(e.target.value)} type="password" className="form-control" id="ip_caption" />
            </div>
            <div className="mb-3">
              <label for="ip_caption2" className="form-label">Confirm Password :</label>
              <input value={confpass} onChange={e => setconfpass(e.target.value)} type="password" className="form-control" id="ip_caption" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={btn_close}>Close</Button>
            <Button onClick={btn_save}>Save</Button>
          </Modal.Footer>
        </Modal>

        {/* toastify */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </div>
  )
}
