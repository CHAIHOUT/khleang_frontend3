import React from 'react';
import { Link } from 'react-router-dom';

import "./style/khleang_display.css";

function note_display() {
  return (
    <main>
        <div className="head_display" >
            <a href="" className="icon">
                <img src="./img/home.png" id="img_head" />
            </a>
            <a href="" className="icon">
                <img src="./img/setting.png" id="img_head" />
            </a>
            <a href="" className="icon">
                <img src="./img/spp.png" id="img_head" />
            </a>
            <Link to={'/Profile'} className="icon2">
                <img src="./img/profile.png" id="img_head_profile" />
            </Link>
            <a href="" id="logo_khleang">
                <img src="./img/KhleangLogo.png" id="img_head" />
            </a>
        </div>

        <div className="box">
            <div className="row">
                <div className="column">
                    <Link to={'/khleang_note'}>
                        <div id="link_bg">
                            <p id="font">Note</p>
                            <p id="font_below">The place where you can note</p>
                            <img src="./img/n3.png" />
                        </div>
                    </Link>
                </div>

                <div className="column">
                    <Link to={'/Calender'} id="link_bg_calender" >
                        <p id="font">Calender</p>
                        <p id="font_below">The place where you can set your date</p>
                        <img src="./img/c5.jpg" />
                    </Link>
                </div>

                <div className="column">
                    <Link to={'/Khleang_upload'}>
                        <div id="link_bg_upload">
                            <p id="font">Upload</p>
                            <p id="font_below">The place where you can upload</p>
                            <img src="./img/upload2.png" />
                        </div>
                    </Link>
                </div> 

                {/* <div className="column">
                    <a href="" id="link_bg_soon">
                        <p id="font">Coming Soon</p>
                        <p id="font_below"></p>
                        <img src="./img/soon2.png" />
                    </a>
                </div> */}

            </div>
        </div>

        <div className="foot">
            <img src="./img/st1.png" id="foot_img" />
        </div>

    </main>
  )
}

export default note_display