import React from 'react';
import { Link } from 'react-router-dom';
import "./style/khleang_display.css";

export default function Head() {
  return (
    <div className="head_display" >
        <Link to={'/'} className="icon">
            <img src="./img/home.png" id="img_head" />
        </Link>
        <Link to={'/Setting'} className="icon">
            <img src="./img/setting.png" id="img_head" />
        </Link>
        <Link to={'/feedback'} className="icon">
            <img src="./img/spp.png" id="img_head" />
        </Link>
        <Link to={'/Profile'} className="icon2">
            <img src="./img/profile.png" id="img_head_profile" />
        </Link>
        <a id="logo_khleang">
            <img src="./img/KhleangLogo.png" id="img_head" />
        </a>
    </div>
  )
}
