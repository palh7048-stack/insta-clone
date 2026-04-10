import React,{use, useContext} from 'react';
import logo from "../image/logo.jpg";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function Navbar({login}){
  const{setModalOpen} = useContext(LoginContext)
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if(login || token){
      return[
        <>
        <Link to="/profile">
        <li>Profile</li>
        </Link>
        <Link to="/createPost"><li>Create Post</li>
        </Link>
        <Link to={""}>
        <button className='primaryBtn' onClick={()=>{setModalOpen(true) }} >
          Log Out</button>
        </Link>
        </>
      ]
    }else{
      return[
        <>
         <Link to="/signup">
        <li>SignUp</li>
        </Link>
        <Link to="/signin">
        <li>SignIn</li>
        </Link>
        </>
      ]
    }
  }
  return(
    <div className='navbar'>
      <img src ={logo} alt='instagram-logo'></img>
      <ul className='nav-menu'>
       {loginStatus()}
       
      </ul>
    </div>
  )
}