import React, { useEffect } from 'react';
import "./style/khleang_display.css";
import "./style/khleang_note.css";
import "./style/khleang_upload.css";

import Head from './Head';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import Upload_list from './Upload_list';
import UseFatch from './useFatch';

// modal
import { Button, Modal } from 'react-bootstrap';

//firebase
import { storage } from './firebase';
import { getDownloadURL, ref , uploadBytesResumable , listAll} from "@firebase/storage";
import { uploadBytes} from "@firebase/storage";

//spinners
import ClipLoader from "react-spinners/ClipLoader";

export default function Khleang_upload() {

    const [search, setsearch] = useState('');

    // link
    const[Alldata,setAlldata] = useState([]);
    const[Allfile,setAllfile] = useState([]);
    const[Allphoto,setAllphoto] = useState([]);
    const[Allvideo,setAllvideo] = useState([]);
    const [Bir,setBir] = useState(false);
    const [Wed,setWed] = useState(false);
    const [Pho,setPho] = useState(false);

    // modal
    const[show,setshow]=useState(false);
    const handleshow = () => setshow(true);
    const handleclose = () => setshow(false);

    // var
    const [select_type,setselect_type] = useState('');
    const [files,setfiles] = useState([]);
    const [file_size,setfile_size] = useState('');
    const [file_name,setfile_name] = useState('');

    // firebase   
    const [isloading,setisloading] = useState(false);
    const imageListRef = ref(storage,"upload/");
    const [validationInput,setvalidationInput] = useState(0);

    useEffect(()=>{
      getData();
    },[])

    const getData=()=>{
      const Token = JSON.parse(localStorage.getItem("auth"));
      axios.get('http://localhost:8000/api/upload',{
          headers:{
              "Authorization" : "Bearer "+Token.token,
          }
      }).then((AllData)=>{
          setAlldata(AllData.data);
      })
    }

  //delete filter UI  (no window reload)
    const deleteUI=(id)=>{
      setAlldata(Alldata.filter(Alldata => Alldata.id !== id));
      setAllfile(Allfile.filter(Allfile => Allfile.id !== id));
      setAllphoto(Allphoto.filter(Allphoto => Allphoto.id !== id));
      setAllvideo(Allvideo.filter(Allvideo => Allvideo.id !== id));
  }


  // btn link file
  const File=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://localhost:8000/api/upload_type/file',{
        headers:{
            "Authorization" : "Bearer "+Token.token,
        }
    }).then((allData2) => {
      setBir(true);
      setWed(true);
      setPho(false);
      setAllfile(allData2.data);
    })
  }

  // btn link photo
  const Photo=()=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    axios.get('http://localhost:8000/api/upload_type/photo',{
        headers:{
            "Authorization" : "Bearer "+Token.token,
        }
    }).then((allData3) => {
      setBir(true);
      setWed(false);
      setAllphoto(allData3.data);
      console.log(allData3.data);
    })
  }

    // btn link video
    const Video=()=>{
      const Token = JSON.parse(localStorage.getItem("auth"));
      axios.get('http://localhost:8000/api/upload_type/video',{
          headers:{
              "Authorization" : "Bearer "+Token.token,
          }
      }).then((allData4) => {
        setBir(true);
        setWed(true);
        setPho(true);
        setAllvideo(allData4.data);
        console.log(allData4.data);
      })
    }


  // btn link All data
  const All=()=>{
    setBir(false);
  }

  //CSS spiner
  const override = {
    margin: "25px 20px ",
    width: "40px",
    height: "40px",
  };

  // upload to firebase
  const upload=(e)=>{
    e.preventDefault();
    setvalidationInput(validationInput+1);  // null + 1

    if(validationInput<1){   // 1 < 1 (true)
        const file = e.target.files[0];
        setfile_size(e.target.files[0].size/1000);
        setfile_name(e.target.files[0].name);
        getUrl(file);
        setisloading(true);
    }else{
        setvalidationInput(0);
    }
  }

  const getUrl=(file)=>{
    if(!file) return;
    const nameFile = file.name;

    const storageRef = ref(storage, `/upload/${nameFile}`);    // /files is the name of folder   , storageRef is the place to upload , name folder
    uploadBytes(storageRef,file).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setfiles((prev) => [...prev,url]);
        setisloading(false);
      });      //spacific place    //that place
    });

  }


  // btn save
  const btn_save=(e)=>{
    if(select_type != "" && files != ""){
      if(select_type == "Select type of file"){
        return alert("Plase Insert Type of file");
      }
      let file = "";
      // convert file array to string
      files.map((val,i)=>{
        file = val;
      });
      const type_file = select_type;

      const data = {file,type_file,file_size,file_name};
      const Token = JSON.parse(localStorage.getItem("auth"));
      axios.post('http://127.0.0.1:8000/api/upload',data,{
                    headers:{
                        "Authorization" : "Bearer "+Token.token,
                    }
                }).then((insertData)=>{
                    console.log(insertData.data);
                    getData();
                    setselect_type('');
                    setfiles([]);
                    setvalidationInput(0);
                    handleclose();
                })

    }else{
      alert("Please Inset Data to Form");
    }
  }

  // modal close
  const btn_close=()=>{
    handleclose();
    setfiles([]);
    setselect_type('');
    setvalidationInput(0);
  }



  return (
    <div className='main'>

        {/* head */}
        <Head/>

        {/* body */}
        <div className="note_body">
            {/* search */}
            <div className="khleang_search">
                <form action="" className="khleang_form">
                    <label className="khleang_label" for="khleang_ip"><img src="./img/search.svg" /></label>
                    <input onChange={(e)=> setsearch(e.target.value)} className="khleang_ip" type="text" placeholder="search..." />
                </form>
            </div>

            {/* button upload & modal*/}
            <div id='btn_upload'>
                {/* <!-- Button trigger modal --> */}
                <button type="button" onClick={handleshow} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal">
                    <i><FontAwesomeIcon icon={faPlus}/></i>UPLOAD
                </button>
            </div>
            {/* <!-- Modal --> */}
            <Modal show={show}>
              <Modal.Header>
                <Modal.Title>
                  Upload
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <select class="form-select" value={select_type} onChange={e => setselect_type(e.target.value)} aria-label="Default select example">
                    <option selected>Select type of file</option>
                    <option value="file">file</option>
                    <option value="photo">photo</option>
                    <option value="video">video</option>
                </select>
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

        <div id='upload_link'>
            <a onClick={All}>All</a>
            <a onClick={File}>FILE</a>
            <a onClick={Photo}>PHOTO</a>
            <a onClick={Video}>VIDEO</a>
        </div>

        {/* foot */}
        <div className="upload_foot">
                {Bir?Wed?Pho?
                        Allvideo.filter((item)=>{
                          return search.toLowerCase() === '' || search.toUpperCase() === ''
                              ? item
                              : item.file_name.toLowerCase().includes(search) || item.file_name.toUpperCase().includes(search)
                        }).map((item)=>{
                          return <div id='f'><Upload_list key={item.id} item={item} deleteUI={deleteUI}/></div>             
                        })
                      :Allfile.filter((item)=>{
                        return search.toLowerCase() === '' || search.toUpperCase() === ''
                            ? item
                            : item.file_name.toLowerCase().includes(search) || item.file_name.toUpperCase().includes(search)
                      }).map((item)=>{
                        return <div id='f'><Upload_list key={item.id} item={item} deleteUI={deleteUI}/></div>             
                      })
                    :Allphoto.filter((item)=>{
                      return search.toLowerCase() === '' || search.toUpperCase() === ''
                          ? item
                          : item.file_name.toLowerCase().includes(search) || item.file_name.toUpperCase().includes(search)
                    }).map((item)=>{
                      return <div id='f'><Upload_list key={item.id} item={item} deleteUI={deleteUI}/></div>             
                    })
                  
                  :Alldata.filter((item)=>{
                    return search.toLowerCase() === '' || search.toUpperCase() === ''
                        ? item
                        : item.file_name.toLowerCase().includes(search) || item.file_name.toUpperCase().includes(search)
                  }).map((item)=>{
                    return <div id='f'><Upload_list key={item.id} item={item} deleteUI={deleteUI}/></div>           
                  })
                }
        </div>
    </div>
  )
}
