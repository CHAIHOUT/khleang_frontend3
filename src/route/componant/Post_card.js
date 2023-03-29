import React, { useEffect, useState } from 'react';
import './css/postBtn.css';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { Link, redirect , useNavigate } from "react-router-dom";

//firebase
import { storage } from '../../firebase';
import { getDownloadURL, ref , uploadBytesResumable , listAll} from "@firebase/storage";
import { uploadBytes} from "@firebase/storage";

//spinners
import ClipLoader from "react-spinners/ClipLoader";

export default function Post_card({item,deleteUI,updateUI}) {

  const[caption, setcaption] = useState(item.caption);
  const[img,setimg] = useState([item.image]);
  const[description,setdescription] = useState(item.description);
  const [validationInput,setvalidationInput] = useState(0);

//Delete
  const btn_delete=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.delete('http://localhost:8000/api/note/'+item.id,{
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

  // firebase   
  const [isloading,setisloading] = useState(false);
  const imageListRef = ref(storage,"khleang/");

  // Modal
  const[show,setshow]=useState(false);
  const handleshow = () => setshow(true);
  const handleclose = () => setshow(false);

  // Edit , IMG display
  const upload=(e)=>{
    e.preventDefault();
    setvalidationInput(validationInput+1);  // null + 1

    if(validationInput<1){   // 1 < 1 (true)
        const file = e.target.files[0];
        getUrl(file);
        setisloading(true);
    }else{
      setvalidationInput(-1);
    }
  }

  const getUrl=(file)=>{
    if(!file) return;
    const nameFile = file.name;

    const storageRef = ref(storage, `/khleang/${nameFile}`);    // /files is the name of folder   , storageRef is the place to upload , name folder
    uploadBytes(storageRef,file).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setimg((prev) => [...prev,url]);
        setisloading(false);
      });      //spacific place    //that place
    });

  }
  
  useEffect(()=>{
    // getData();
    if(!getUrl){
        listAll(imageListRef).then((response)=>{
            response.items.forEach((item)=>{
              getDownloadURL(item).then((url)=>{
                setimg((prev) => [...prev,url]);
                setisloading(true);
              });
            });
        });
    }
  },[]);

  // Botton Edit
  const btn_edit=(e)=>{
    let image = "";

    // convert img array to string
    img.map((val,i)=>{
        // setimage(val);
        image = val;
    });
    const id = item.id;
      const data = {id,caption,image,description};
      const Token = JSON.parse(localStorage.getItem("auth"));

      axios.put('http://127.0.0.1:8000/api/note/'+item.id,data,{
        headers:{
          "Authorization" : "Bearer "+Token.token,
        }
      }).catch((err) => console.log(err))
      .then(()=>{
        updateUI(item.id,data);
        setimg([image]);
        setvalidationInput(0);
        console.log(data);
        handleclose();
      })
  }

  // button Close
  const btn_close=()=>{
    handleclose();
    setimg([item.image]);
    setvalidationInput(-1);    // reset = 1
  }

  //CSS spiner
  const override = {
    margin: "25px 20px ",
    width: "50px",
    height: "50px",
  };

  //Detail Button
  const navigate = useNavigate();
  const DirectDetail=()=>{
    navigate('/khleang_note_detail/'+item.id);
  }

    return (
        <div className="card">
            <div id='card-head'>
                <img src={item.image} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{item.caption}</h5>
                <p className="card-text">{item.description}</p>
                <a onClick={DirectDetail} className="btn btn-outline-primary">Check</a>
                <a href="#" id='mid_btn' onClick={handleshow} className="btn btn-outline-warning">Update</a>
                <a href="#" className="btn btn-outline-danger" onClick={btn_delete}>Delete</a>
            </div>


            <Modal show={show}>
              <Modal.Header>
                <Modal.Title>
                  Edit
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-3">
                  <label for="ip_caption" className="form-label">Caption :</label>
                  <input value={caption} onChange={e => setcaption(e.target.value)} type="text" className="form-control" id="ip_caption" />
                </div>
                <div className="mb-3">
                  <label for="ip_img" className="form-label">Upload Image :</label>
                  <input onChange={e => upload(e)} className="form-control" type="file" id="ip_img" />
                  <div id="post_photo">
                        {isloading?<ClipLoader color={'#360bf7'} cssOverride={override} loading={isloading} size={60} aria-label="Loading Spinner" data-testid="loader"/>
                        : img.map((url)=>{
                            return <div key={url} id="post_photo_box">
                                    <img src={url} />
                                   </div>
                        })}
                    </div>
                </div>
                <div className="mb-3">
                  <label for="ip_description" className="form-label">Description :</label>
                  <textarea value={description} onChange={e => setdescription(e.target.value)} className="form-control" id="ip_description" rows="3"></textarea>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={btn_close}>Close</Button>
                <Button onClick={e =>btn_edit(e)}>Save</Button>
              </Modal.Footer>
            </Modal>
        </div>
    )
}
