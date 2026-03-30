import React,{useEffect,useState} from "react" ;
import logo from "../image/logo.jpg";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function SignUp() {

const navigate = useNavigate();

  // Toast function
  const notify = (message) => toast.error(message);
  const notifyS = (message) => toast.success(message);

  const [name,  setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const postData = ()=>{
    // if(!emailRegex.test(email)){
    //   notify("Enter proper email");
    //   return;
    // }
    // else if(!passwordRegex.test(password)){
    //   notify("Password must be at least 8 characters long and contain at least 1 letter and 1 number");
    //   return;
    // }

    // sending data to server
    fetch("http://localhost:5000/signup",{

      method:"post",
      headers:{ "Content-Type":"application/json" },

      body:JSON.stringify({
        name:  name,
        userName: userName,
        email: email,
        password: password
      })

    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
      notify(data.error);
      } else{
        notifyS(data.message);
        navigate("/signin");
      }

      console.log(data) })
  }

  return(
    <div className= "signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt= "Instagram Logo"/>

          <p className="loginPara">
            Sign up to see Photo and videos <br/> from your friends 
          </p>

          <div>
            <input  type="email"  name="email" id="email" value={email} placeholder="Email"
              onChange={(e)=>{setEmail(e.target.value)}} 
            />
          </div>

          <div>
            <input type="text" name="name"  id="name"  value={name}  placeholder="Full Name" 
            onChange={(e)=>{setName(e.target.value)}} 
            />
          </div>

          <div>
            <input  type="text"  name="username" id="username" value={userName} placeholder="Username" 
              onChange={(e)=>{setUserName(e.target.value)}} 
            />
          </div>

          <div>
            <input type="password"  name="password" id="password" value={password} placeholder="Password"
              onChange={(e)=>{setPassword(e.target.value)}} 
            />
          </div>

          <p className="loginPara" style={{fontSize:"12px", margin:"3px 0px"}}>
            By Signing up, you Agree to our Terms, <br/>
            privacy policy and cookies policy 
          </p>

          <input  type="button"  id="submit-btn"  value="Sign Up"  onClick={()=>{ postData() }} />
        </div>

        <div className="form2">
          Already have an account ? 
          <Link to = "/signin">
            <span style={{color: "blue", cursor:"pointer"}}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  )
}