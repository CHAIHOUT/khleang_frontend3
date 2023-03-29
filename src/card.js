import React, { useEffect, useState } from 'react';
import "./style/card.css";
import UseFatch from './useFatch';
import { Button, Modal } from 'react-bootstrap';

import { Link, useNavigate } from "react-router-dom";

function Card({item}) {

  const[caption, setcaption] = useState(item.caption);
  const[img, setimg] = useState(item.img);
  const[description, setdescription] = useState(item.description);
  const[file_img_name,setfile_img_name] = useState(item.file_img_name);


  const[show,setshow]=useState(false);
  const handleshow = () => setshow(true);
  const handleclose = () => setshow(false);

// Navi + Param router
  const navigate = useNavigate();
  const Directdetail=(id)=>{
    navigate('/Khleang_note_detail/'+id);
  }




// Edit
  const Onclick_edit=()=>{
    const data_edit={caption, file_img_name , img , description};              // data 1

    fetch("http://localhost:8000/note/"+item.id,{            // id ort do
      method:"PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(data_edit)
    }).then(()=>{
      window.location.reload();
    })
  }


  // Delete
  const Onclick_delete=((id)=>{
    if(window.confirm("Are you sure to Delete...!")){
      fetch("http://localhost:8000/note/"+id,
      {method:"DELETE"}).then(()=>{
        window.location.reload()
      })
    }
  })


  // upload Img
  const uploadImg= async (e)=>{
    const file_img = e.target.files[0];
    setfile_img_name(e.target.value);
    const base64 = await convertBase64(file_img);
    setimg(base64);
  }

  const convertBase64=(file_img)=>{
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file_img);
        fileReader.onload = () =>{
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) =>{
            reject(error);
        };
    })
  }




  return (
    <main>
        <div className="card" >
          <img src={item.img} class="card-img-top"/>
          {/* {item.img} */}
          <div className="card-body">
            <h5 className="card-title">{item.caption}</h5>
            <p id='text_area' className="card-text">{item.description}</p>

            <a href="#" onClick={()=>{Directdetail(item.id)}} className="btn btn-outline-primary">Detail</a>

            <a href="#" onClick={handleshow} className="btn btn-outline-info">Edit</a>

            <Modal show={show}>
              <Modal.Header>
                <Modal.Title>
                  Edit
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div class="mb-3">
                  <label for="ip_caption" class="form-label">Caption :</label>
                  <input value={caption} onChange={e => setcaption(e.target.value)} type="text" class="form-control" id="ip_caption" />
                </div>
                <div class="mb-3">
                  <label for="ip_img" class="form-label">Upload Image :</label>
                  <input onChange={e => uploadImg(e)} class="form-control" type="file" id="ip_img" />
                  <div>File :  {file_img_name}aa</div>
                </div>
                <div class="mb-3">
                  <label for="ip_description" class="form-label">Description :</label>
                  <textarea value={description} onChange={e => setdescription(e.target.value)} class="form-control" id="ip_description" rows="3"></textarea>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleclose}>Close</Button>
                <Button onClick={Onclick_edit}>Save</Button>
              </Modal.Footer>
            </Modal>

            <a href="#" onClick={()=>{Onclick_delete(item.id)}} className="btn btn-outline-danger">Delete</a>
          </div>

        </div>
    </main>

  )
}

export default Card