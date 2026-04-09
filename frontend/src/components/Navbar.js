import React from 'react';
import logo from "../image/logo.jpg";
import "./Navbar.css";
import { Link } from 'react-router-dom';

export default function Navbar(){
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    console.log(token);
  }
  loginStatus();
  return(
    <div className='navbar'>
      <img src ={logo} alt='instagram-logo'></img>
      <ul className='nav-menu'>
        <Link to="/signup">
        <li>SignUp</li>
        </Link>
        <Link to="/signin">
        <li>SignIn</li>
        </Link>
        <Link to="/profile">
        <li>Profile</li>
        </Link>
        <Link to="/createPost">
        <li>Create Post</li>
        </Link>
      </ul>
    </div>
  )
}