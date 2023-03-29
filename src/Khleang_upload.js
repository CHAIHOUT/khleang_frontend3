import React from 'react';
import "./style/khleang_display.css";
import "./style/khleang_note.css";
import "./style/khleang_upload.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import Upload_list from './Upload_list';
import UseFatch from './useFatch';

export default function Khleang_upload() {

    const [search, setsearch] = useState([]);
    const [files, setFiles] = useState([]);

    const{data} = UseFatch("http://localhost:8000/api/Get");

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles([...files, file])

        // upload file
        const formData = new FormData();
        formData.append(
            "name",               //Key
            file,                 //value
            file.name,
        )
        axios.post('http://localhost:8000/api/khleang', formData)
            .then((res) => {
                file.isUploading = false;
                setFiles([...files, file])
            })
            .catch((err) => {
                // inform the user
                console.error(err)
                removeFile(file.name)
            });
    }


    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }

    const deleteFileHandler = (_name) => {
        axios.delete(`http://localhost:8080/upload?name=${_name}`)
            .then((res) => removeFile(_name))
            .catch((err) => console.error(err));
    }

  return (
    <div className='main'>

        {/* head */}
        <div className="head_display" >
            <Link to={"/"}  className="icon">
                <img src="./img/home.png" id="img_head" />
            </Link>
            <a href="" className="icon">
                <img src="./img/setting.png" id="img_head" />
            </a>
            <a href="" className="icon">
                <img src="./img/spp.png" id="img_head" />
            </a>
            <a href="" className="icon2">
                <img src="./img/profile.png" id="img_head_profile" />
            </a>
            <a href="" id="logo_khleang">
                <img src="./img/KhleangLogo.png" id="img_head" />
            </a>
        </div>

        {/* body */}
        <div className="note_body">
            {/* search */}
            <div className="khleang_search">
                <form action="" className="khleang_form">
                    <label className="khleang_label" for="khleang_ip"><img src="./img/search.svg" /></label>
                    <input onChange={(e)=> setsearch(e.target.value)} className="khleang_ip" type="text" placeholder="search..." />
                </form>
            </div>

            {/* button upload */}
            <div className="file-card">
                <div className="file-inputs">
                        <input type="file" onChange={uploadHandler} />
                        <button>
                            <i>
                                <FontAwesomeIcon icon={faPlus} />
                            </i>
                            Upload
                        </button>
                </div>
            </div>
        </div>

        <div id='upload_link'>
            <a>All</a>
            <a>FILE</a>
            <a>PHOTO</a>
        </div>

        {/* foot */}
        <div className="upload_foot">
            {/* {files &&
                files.filter((item)=>{
                    return search.toLowerCase() === ''
                        ? item
                        : item.caption.toLowerCase().includes(search);
                })
                .map((item)=>(
                    <div id='f'><Upload_list key={item.name} file={item} deleteFile={deleteFileHandler}/></div>
                ))
            } */}
            {data &&
                data.map((item)=>(
                    <div id='f'><Upload_list key={item.name} file={item} deleteFile={deleteFileHandler}/></div>
                ))
            }
        </div>
    </div>
  )
}
