import React, { useState,useContext } from "react";
import logo from "../image/logo.jpg";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

export default function SignIn() {
const {setUserLogin} =useContext(LoginContext)

  const navigate = useNavigate();

  const notify = (message) => toast.error(message);
  const notifyS = (message) => toast.success(message);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    
    const trimmedUserName = userName.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUserName) {
      notify("Please enter username");
      return;
    }
    if (!trimmedPassword) {
      notify("Please enter password");
      return;
    }

    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: trimmedUserName,
        password: trimmedPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notify(data.error);
        } else {
          notifyS( "Login successful");
          localStorage.setItem("jwt",data.token); 
          setUserLogin(true)
          navigate("/"); 
        }
      })
      .catch((err) => {
        console.error("SignIn Error:", err);
        notify("Something went wrong");
      });
  };

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="Instagram Logo" />

          <div>
            <input
              type="text"
              name="UserName"
              id="userName"
              value={userName}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="button"
            id="login-btn"
            value="Sign In"
            onClick={postData}
          />
        </div>

        <div className="loginForm2">
          Don't have an account?{" "}
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}