import React, { useEffect, useState } from 'react';
import './css/admin_home.css';

//Modal
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin_table_box({item,deleteUI,fun_getDataUser,fun_getDataNote,fun_getDataUpload}) {

  // Date
  const[dateProduct,setdateProduct] = useState('');

  // Modal
  const[show,setshow]=useState(false);
  const handleshow = () => setshow(true);
  const handleclose = () => setshow(false);

  useEffect(()=>{
    fun_getDateProduct();
  })

  const fun_deleteAll=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.delete('http://127.0.0.1:8000/api/user/'+item.id,{
      headers:{
        "Authorization" : "Bearer "+Token.token,
      }
    }).then(()=>{
      axios.delete('http://127.0.0.1:8000/api/deleteAllNote/'+item.id,{
        headers:{
          "Authorization" : "Bearer "+Token.token,
        }
      })
    }).then(()=>{
      axios.delete('http://127.0.0.1:8000/api/upload_type/'+item.id,{
        headers:{
          "Authorization" : "Bearer "+Token.token,
        }
      })
    }).then(()=>{
      axios.delete('http://127.0.0.1:8000/api/deletecalender/'+item.user_id,{
        headers:{
          "Authorization" : "Bearer "+Token.token,
        }
      })     
    }).then(()=>{
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
      deleteUI(item.id);
      fun_getDataUser();
      fun_getDataNote();
      fun_getDataUpload();
      setTimeout(() => {
        handleclose();
      },1000);
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
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{dateProduct}</td>
            <td><button onClick={handleshow} type="button" class="btn btn-outline-danger">Delete</button></td>
            <Modal show={show}>
              <Modal.Header>
                <Modal.Title>
                  DELETE
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are Your Sure to Delete USER and All USER Product : {item.name}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleclose}>Close</Button>
                <Button onClick={fun_deleteAll}>Delete</Button>
              </Modal.Footer>
            </Modal>

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
        </tr>

        
  )
}
