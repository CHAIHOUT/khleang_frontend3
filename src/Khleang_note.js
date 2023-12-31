import React, { useEffect, useState } from 'react';
import "./style/khleang_display.css";
import "./style/khleang_note.css";
import Card from './route/componant/Post_card';
import { Button, Modal } from 'react-bootstrap';

import { Link, useNavigate } from "react-router-dom";

import Head from './Head';

//firebase
import { storage } from './firebase';
import { getDownloadURL, ref , uploadBytesResumable , listAll} from "@firebase/storage";
import { uploadBytes} from "@firebase/storage";

//spinners
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Khleang_note() {
    
  const[caption, setcaption] = useState('');
  const [select_type,setselect_type] = useState('');
  const[img,setimg] = useState([]);
  const[description,setdescription] = useState('');
  const[getAllData,setgetAllData] = useState([]);
  const [validationInput,setvalidationInput] = useState(0);


  // firebase   
  const [isloading,setisloading] = useState(false);
  const imageListRef = ref(storage,"khleang/");

  // search
  const[search,setsearch] = useState('');  

  const upload=(e)=>{
    e.preventDefault();
    setvalidationInput(validationInput+1);  // null + 1

    if(validationInput<1){   // 1 < 1 (true)
        const file = e.target.files[0];
        getUrl(file);
        setisloading(true);
    }else{
        setvalidationInput(0);
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
    getData();
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

  //delete filter UI  (no window reload)
  const deleteUI=(id)=>{
    setgetAllData(getAllData.filter(getAllData => getAllData.id !== id));
  }

  //Update UI  (no window reload)
  const updateUI=(id,update)=>{
    setgetAllData(getAllData.map((getAllData) => getAllData.id === id ? update : getAllData))
  }

  const getData=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://127.0.0.1:8000/api/note',{
        headers:{
            "Authorization" : "Bearer "+Token.token,
        }
    }).then((Data)=>{
        setgetAllData(Data.data);
    })
  }

    //CSS spiner
    const override = {
        margin: "25px 20px ",
        width: "50px",
        height: "50px",
      };

    //  POST 
      const post_btn=()=>{
        if(caption != "" && description != "" && img != "" ){
            let image = "";

            // convert img array to string
            img.map((val,i)=>{
                // setimage(val);
                image = val;
            });
                const type_file = select_type;
                const data = {caption,description,image,type_file};
                const Token = JSON.parse(localStorage.getItem("auth"));
    
                axios.post('http://127.0.0.1:8000/api/note',data,{
                    headers:{
                        "Authorization" : "Bearer "+Token.token,
                    }
                }).then((insertData)=>{
                    console.log(insertData.data);
                    getData();
                    setcaption('');
                    setdescription('');
                    setimg([]);
                    setvalidationInput(0);
                    handleclose();
                });

        }else{
          toast.warn('Please wait for loading file upload...!', {
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

    // modal close
    const btn_close=()=>{
        handleclose();
        setcaption("");
        setdescription("");
        setselect_type("");
        setimg([]);
        setisloading(false);
        setvalidationInput(0);
    }

      // Modal
    const[show,setshow]=useState(false);
    const handleshow = () => setshow(true);
    const handleclose = () => setshow(false);


  return (
    <main>
        <Head/>
        
        <div className="note_body">

            {/* Button Search */}
            <div className="khleang_search">
                <form action="" className="khleang_form">
                    <label className="khleang_label" for="khleang_ip"><img src="./img/search.svg" /></label>
                    <input onChange={(e)=> setsearch(e.target.value)} className="khleang_ip" type="text" placeholder="search..." />
                </form>
            </div>
            
            {/* Button ADD */}

            <div id="note_add">
                {/* <!-- Button trigger modal --> */}
                <button type="button" onClick={handleshow} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal">
                    Add Note
                </button>
                {/* <!-- Modal --> */}
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
                  <label for="ip_img" className="form-label">Upload Image : Please Select spacific file type</label>
                  <select class="form-select" value={select_type} onChange={e => setselect_type(e.target.value)} aria-label="Default select example">
                    <option selected disabled value="">Select type of file</option>
                    <option value="file">file</option>
                    <option value="photo">photo</option>
                    <option value="video">video</option>
                  </select>
                  <input onChange={e => upload(e)} className="form-control" type="file" id="ip_img" />
                  <div id="post_photo">
                        {isloading?<ClipLoader color={'#360bf7'} cssOverride={override} loading={isloading} size={60} aria-label="Loading Spinner" data-testid="loader"/>
                        : img.map((url)=>{
                            if(select_type == ""){
                              toast.warn('Please Select File type Before upload...!', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                              });
                              btn_close();
                            }
                            else if(select_type == 'file'){
                              url = '../../img/file.webp';
                            }else if(select_type == 'video'){
                              url = '../../img/videoIcon.png';
                            }

                            return <div key={url} id="post_photo_box">
                                    <img 
                                      src={url} 
                                    />
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
                <Button onClick={e =>post_btn(e)}>Save</Button>
              </Modal.Footer>
            </Modal>
            </div>
        </div>

        <div className="note_foot">
            {
                getAllData && 
                getAllData.filter((item)=>{
                    return search.toLowerCase() === '' || search.toUpperCase() === ''
                        ? item
                        : item.caption.toLowerCase().includes(search) || item.caption.toUpperCase().includes(search)
                })
                .map((item)=>{
                   return <div id='np'><Card key={item.id} item={item} deleteUI={deleteUI} updateUI={updateUI}/></div>
                })
            }
        </div>

            {/* toastify CSS*/}
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

    </main>
  )
}

export default Khleang_note