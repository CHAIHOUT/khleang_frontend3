import React, { useEffect, useState } from 'react';
import "./css/setting_profile.css";
import axios from 'axios';

// modal
import { Button, Modal } from 'react-bootstrap';
//spinners
import ClipLoader from "react-spinners/ClipLoader";
// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//firebase
import { storage } from '../../firebase';
import { getDownloadURL, ref , uploadBytesResumable , listAll} from "@firebase/storage";
import { uploadBytes} from "@firebase/storage";

export default function Setting_profile() {

    // modal & data backend 
    const[userdata,setuserdata] = useState([]);
    const[userdataimg,setuserdataimg] = useState([]);
    const[profile_img,setprofile_img] = useState([]);
    const[tempImg,settempImg] = useState('../../img/plus.webp');

    useEffect(()=>{
      getDataUser();
      getProfileImage();
    },[])

    const getDataUser=()=>{
      const Token = JSON.parse(localStorage.getItem("auth"));
      axios.get('http://localhost:8000/api/user',{
          headers:{
              "Authorization" : "Bearer "+Token.token,
          }
      }).then((datauser)=>{
          setuserdata(datauser.data);
          setusername(datauser.data.name);
          setemail(datauser.data.email);

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
          setimg([datauser.data.user_image]);  // for loop
      })
    }

    // modal
    const[show,setshow]=useState(false);
    const handleshow = () => setshow(true);
    const handleclose = () => setshow(false);
    const [isloading,setisloading] = useState(false);

    //CSS spiner
    const override = {
        margin: "30px ",
        width: "40px",
        height: "40px",
    };

    // modal close
    const btn_close=()=>{
        handleclose();
        setimg([userdataimg.user_image]);
        setvalidationInput(-1); 
    }

    // Update
    const[username,setusername]=useState('');
    const[email,setemail]=useState('');
    const[img,setimg] = useState([userdataimg.user_image]);
    const [validationInput,setvalidationInput] = useState(0);

        // firebase   
    const imageListRef = ref(storage,"khleang/");
        // Img upload to firebase & display
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
    // display img
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
    if(userdata!=''){
      let user_image = "";
      let name = username;
      let logic = 0;   // if first img null => set user_image = null (toastyfy no image to update)

      // convert img array to string
      img.map((val,i)=>{
          // setimage(val);
          if(val == undefined){
            logic = 1;
            user_image = val;
            console.log('null');
          }else if(logic  == 0){
            user_image = val;
            console.log('no null');
          }
      });
        const data = {name,email};
        const data2 = {user_image};
        const Token = JSON.parse(localStorage.getItem("auth"));
  
        axios.put('http://127.0.0.1:8000/api/user/'+userdata.id,data,{
          headers:{
            "Authorization" : "Bearer "+Token.token,
          }
        }).then(()=>{
          setvalidationInput(0);
          setusername(name);
          setemail(email);
          getDataUser();
          handleclose();
        })

        if(user_image == null){
          toast.warn('No image to Update...! Please Insert Image At Profile', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }else{
          axios.put('http://127.0.0.1:8000/api/upload_type/'+userdata.id,data2,{
            headers:{
                "Authorization" : "Bearer "+Token.token,
            }
          }).then((insertData)=>{
              setimg([]);
              getProfileImage();
              setvalidationInput(0);
              handleclose();
          })
        }
      }else{
        toast.warn("No Data Can't Update", {
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
            <p><b>Profile Detail :</b></p>
            <a onClick={handleshow}><b>Edit</b></a>
        </div>
        <div id='setting_profile_body'>
            <div id='setting_profile_pic'>
                <img src={userdataimg?userdataimg.user_image:tempImg} id='sp_img'></img>
            </div>
            <div id='sp_name'>
                <p id='sp_p'><b>Username :</b></p>
                <div id='sp_name_box'>{userdata.name}</div>
            </div>
            <div id='sp_name'>
                <p id='sp_p'><b>Email :</b></p>
                <div id='sp_name_box'>{userdata.email}</div>
            </div>
            <div id='sp_name'>
                <p id='sp_p'><b>Created date :</b></p>
                <div id='sp_name_box'>{userdata.created_at}</div>
            </div>
        </div>

            {/* Update Modal */}
            <Modal show={show}>
              <Modal.Header>
                <Modal.Title>
                  Edit
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-3">
                  <label for="ip_caption" className="form-label">Caption :</label>
                  <input value={username} onChange={e => setusername(e.target.value)} type="text" className="form-control" id="ip_caption" />
                </div>
                <div className="mb-3">
                  <label for="ip_caption2" className="form-label">Email :</label>
                  <input value={email} onChange={e => setemail(e.target.value)} type="email" className="form-control" id="ip_caption" />
                </div>
                <div className="mb-3">
                  <label for="ip_img" className="form-label">Upload Image :</label>
                  <input onChange={e => upload(e)} className="form-control" type="file" id="ip_img" />
                  <div id="post_photo">
                        {isloading?<ClipLoader color={'#360bf7'} cssOverride={override} loading={isloading} size={60} aria-label="Loading Spinner" data-testid="loader"/>
                        : img.map((url)=>{
                            if(url == null){
                              url = tempImg;
                            }
                            return <div key={url} id="post_photo_box">
                                    <img src={url} />
                                   </div>
                        })}
                    </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={btn_close}>Close</Button>
                <Button onClick={e =>btn_edit(e)}>Save</Button>
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
