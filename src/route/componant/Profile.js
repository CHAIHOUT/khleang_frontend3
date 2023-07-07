import React, { useEffect, useState } from 'react';
import './css/profile.css';

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import Head from '../../Head';

//firebase
import { storage } from '../../firebase';
import { getDownloadURL, ref , uploadBytesResumable , listAll} from "@firebase/storage";
import { uploadBytes} from "@firebase/storage";

// modal
import { Button, Modal } from 'react-bootstrap';

//spinners
import ClipLoader from "react-spinners/ClipLoader";

export default function Profile() {

    const[userdata,setuserdata] = useState([]);
    const[userdataimg,setuserdataimg] = useState([]);
    const[profile_img,setprofile_img] = useState([]);
    const[tempImg,settempImg] = useState('../../img/plus.webp');

    // Date
    const[dateProduct,setdateProduct] = useState('');

    useEffect(()=>{
        getDataUser();
        getProfileImage();
    },[])

    const getDataUser=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://localhost:8000/api/upload',{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((datauser)=>{
            setuserdata(Token.user);
            fun_getDateProduct(Token.user.created_at)
            console.log(userdata);
        })
    }

    const getProfileImage=()=>{
        const Token = JSON.parse(localStorage.getItem("auth"));
        axios.get('http://localhost:8000/api/upload_type',{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
        }).then((datauser)=>{
            setuserdataimg(datauser.data);
            console.log(userdataimg);
        })
    }


    //To Login
    const navigate = useNavigate();
    const DirectLogin=()=>{
        navigate('/khleang_login');
    }

    // Logout
    const Logout=()=>{
        localStorage.clear();
        DirectLogin();
    }

    // upload Img to firebase
    const [validationInput,setvalidationInput] = useState(0);

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
    
        const storageRef = ref(storage, `/user_img/${nameFile}`);    // /files is the name of folder   , storageRef is the place to upload , name folder
        uploadBytes(storageRef,file).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then((url)=>{
            setprofile_img((prev) => [...prev,url]);
            setisloading(false);
          });      //spacific place    //that place
        });

      }

        // modal
        const[show,setshow]=useState(false);
        const handleshow = () => setshow(true);
        const handleclose = () => setshow(false);
        const [isloading,setisloading] = useState(false);

        //CSS spiner
        const override = {
            margin: "25px 20px ",
            width: "50px",
            height: "50px",
        };

    // btn save
    const btn_save=(e)=>{
        if(profile_img != ""){
            if(userdataimg.length == 0){
                let user_image = "";
                // convert file array to string
                profile_img.map((val,i)=>{
                    user_image = val;
                });
    
                const data = {user_image};
                const Token = JSON.parse(localStorage.getItem("auth"));
                axios.post('http://127.0.0.1:8000/api/upload_type',data,{
                                headers:{
                                    "Authorization" : "Bearer "+Token.token,
                                }
                            }).then((insertData)=>{
                                console.log(insertData.data);
                                getProfileImage();
                                setprofile_img([]);
                                setvalidationInput(0);
                                handleclose();
                            })
                    console.log(data);
            }else{
                let user_image = "";
                // convert file array to string
                profile_img.map((val,i)=>{
                    user_image = val;
                });
    
                const data = {user_image};
                const Token = JSON.parse(localStorage.getItem("auth"));
                axios.put('http://127.0.0.1:8000/api/upload_type/'+userdata.id,data,{
                                headers:{
                                    "Authorization" : "Bearer "+Token.token,
                                }
                            }).then((insertData)=>{
                                console.log(insertData.data);
                                getProfileImage();
                                setprofile_img([]);
                                setvalidationInput(0);
                                handleclose();
                            })
                    console.log(data);
            }
        }else{
        alert("Please Inset Data to Form");
        }
    }

    // modal close
    const btn_close=()=>{
        handleclose();
        setprofile_img([]);
        setvalidationInput(0);
    }

    // Convert to Date Product
    const fun_getDateProduct=(item)=>{
        let date = item;
        let temp = "";
        for (let index = 0; index < 10; index++) {
        temp = temp + date[index];
        }
        setdateProduct(temp)
    }
      
  return (
    <div id='profile_main'>

        <Head/>

        <div id='profile_body'>
            <div id='profile_cycle'>
                <input onClick={handleshow} id='ip_file_profile' type='submit'/>
                <img src={userdataimg?userdataimg.user_image:tempImg} />
            </div>
            <center>
                <div id='profile_username'>{userdata.name}</div>
            </center>
            <div id='profile_info_body'>
                <div id='profile_info'>
                    <p><b>Username :</b> {userdata.name}</p>
                    <p><b>Email :</b> {userdata.email}</p>
                    <p><b>Created Date :</b> {dateProduct}</p>
                </div>
            </div>
            <center>
                <div id='profile_logout'>
                    <button type="button" onClick={Logout} class="btn btn-outline-danger">Logout</button>
                </div>
            </center>

        </div>

        {/* Modal */}
        <Modal show={show}>
              <Modal.Header>
                <Modal.Title>
                  Upload Image Profile
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-3">
                  <label for="ip_img" className="form-label">Upload Image : selected first Image Only</label>
                  <input onChange={e => upload(e)} className="form-control" type="file" id="ip_img" />
                  <div id='loading'>
                  {isloading?<ClipLoader color={'#360bf7'} cssOverride={override} loading={isloading} size={60} aria-label="Loading Spinner" data-testid="loader"/>
                        : <div></div>
                  }
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={btn_close} >Close</Button>
                <Button onClick={e => btn_save(e)}>Save</Button>
              </Modal.Footer>
            </Modal>
    </div>
  )
}
