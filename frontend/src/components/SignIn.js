import React, {useState} from "react" ;
import logo from "../image/logo.jpg"
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function SignIn() {

  const navigate = useNavigate();

const notify = (message)=> toast.error(message);
const notifyS = (message)=>toast.success(message)


const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");

// const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const postData = ()=>{ 
  // if(!checkEmail.test(email)){
  //   notify("Enter Proper Email")
  //   return;
  // }

  // sending data to server
  fetch("http://localhost:5000/signin",{
    method:"post",
    headers:{"Content-Type": "application/json"},

    body:JSON.stringify({

      userName: userName,
      password: password
    }) 

  }).then(res=>res.json())
  .then(data=>{
    if(data.error){
      notify(data.error)
    }else{
      notifyS(data.message)
      navigate("/")
    }
  })
}
  return(
    <div className="signIn">
      <div>
      <div className="loginForm">
        <img className="signUpLogo" src={logo} alt="Instagram Logo"/>
        <div>
          <input type="text" name="username" id="username" value={userName} placeholder="Username"
          onChange={(e)=>{setUserName(e.target.value)}}/>
        </div>
        <div>
          <input type="password" name="password" id="password" value={password} placeholder="Password"
          onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
          <input type="button" id="login-btn" value="Sign In" onClick={()=>{ postData() }}/>
      </div>
      <div className="loginForm2">
        Don't have an account ? <Link to="/signup">
          <span style={{color:"blue", cursor:"pointer"}}>Sign Up</span>
        </Link>
      </div>
    </div>
    </div>
  )
}