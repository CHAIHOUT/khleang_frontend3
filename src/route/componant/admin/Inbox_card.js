import React, { useEffect, useState } from 'react';
import './css/admin_inbox.css';

// modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Inbox_card({item,deleteUI}) {

    const[DataUser,setDataUser] = useState([]);
    const[ProfileImage,setProfileImage] = useState('');
    const[Message,setMessage] = useState('');

    // Date
    const[dateProduct,setdateProduct] = useState('');

    // Loading modal
    const[show2,setshow2]= useState();
    const handleshow2 = () => setshow2(true);
    const handleclose2 = () => setshow2(false);

    // Modal function
    const fun_closeModal=()=>{
        setshow2(false)
    }

    useEffect(()=>{
        fun_getUserByID();
        fun_getUserProfile();
        fun_getDateProduct();
    },[]);

    // User
    const fun_getUserByID=async()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        // axios.get('http://127.0.0.1:8000/api/getUser/'+item.user_id,{
        //     headers:{
        //         "Authorization" : "Bearer "+Token.token,
        //     }
        // }).then((dataUser)=>{
        //     setDataUser(dataUser.data);
        // });
        let Data = await axios.get('http://127.0.0.1:8000/api/getUser/'+item.user_id,{
                headers:{
                    "Authorization" : "Bearer "+Token.token,
                }
            })
        setDataUser(Data.data);
    }

    // Profile Image
    const fun_getUserProfile=async ()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        // axios.get('http://127.0.0.1:8000/api/getProfileImage/'+item.user_id,{
        //     headers:{
        //         "Authorization" : "Bearer "+Token.token,
        //     }
        // }).then((dataImage)=>{
        //     if(dataImage.data.user_image != null){
        //         setProfileImage(dataImage.data.user_image);
        //     }else{
        //         setProfileImage('../../../img/profile.png');
        //     }
        // });
        let Data = await axios.get('http://127.0.0.1:8000/api/getProfileImage/'+item.user_id,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        })
        if(Data.status == 200){
            setProfileImage(Data.data.user_image)
        }else{
            setProfileImage('../../../img/profile.png');
        }
    }

    //Delete
    const fun_delete=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.delete('http://127.0.0.1:8000/api/inbox/'+item.id,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((dataInbox)=>{
            toast.success('Delete Success', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                deleteUI(item.id);
                handleclose2();
            }, 1000);
        });
    }

  // Convert to Date Product
  const fun_getDateProduct=()=>{
    let date = item.created_at;
    let temp = "";
    for (let index = 0; index < 10; index++) {
      temp = temp + date[index];
    }
    setdateProduct(temp)
  }

  return (
    <div>
        <div onClick={handleshow2} id='inbox_box'>
            <div id='inbox_profile'><img src={ProfileImage}></img></div>
            <div id='inbox_mid'>
                <div id='info'>
                    <div id='info_box'>{DataUser.name}</div>
                    <div id='info_box' className='info_box'>{DataUser.email}</div>
                </div>
                <div id='mes_box'>
                    <div id='mes'><p>{item.message}</p></div>
                </div>
            </div>
            <div id='inbox_foot'>
                {dateProduct}
            </div>

        </div>

                {/* Modal */}
        <Modal show={show2} key={item.id}>
            <Modal.Header>
                <Modal.Title>
                  <center>{DataUser.name}</center>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea id='m_body'>{item.message}</textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleclose2}>Close</Button>
                <Button onClick={fun_delete}>Delete</Button>
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
