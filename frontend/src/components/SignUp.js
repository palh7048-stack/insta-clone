import React, { useState } from "react";
import logo from "../image/logo.jpg";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {

  const navigate = useNavigate();

  const notify = (msg) => toast.error(msg);
  const notifyS = (msg) => toast.success(msg);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // ---------------- SEND OTP ----------------
  const sendOtp = () => {
    if (!email) return notify("Enter Email First to get OTP");

    fetch("http://localhost:5000/send-otp", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) notify(data.error);
        else notifyS("OTP sent to your email successfully and valid for 1 minutes");
      })
      .catch(() => notify("OTP sending to your email Failed"));
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = () => {

    if (!otp) return notify("Enter OTP for verification"); 

    fetch("http://localhost:5000/verify-otp", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) notify(data.error);
        else {
          notifyS("your OTP is successfully verified");
          setOtpVerified(true);
        }
      })
      .catch(() => notify(" your OTP is expired ")); 
  };

  // ---------------- SIGNUP ----------------
  const postData = () => {
   if(!name) return notify("Please Enter Name");
   if(!userName) return notify("Please Enter userName");
   if(!email) return notify("Please Enter Email");
   if(!password) return notify("Please Enter Password");

    if (!otpVerified) {
      return notify("Please verify OTP first");
    }

    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userName, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) notify(data.error);
        else {
          notifyS(data.message);
          navigate("/signin");
        }
      })
      .catch(() => notify("Signup Failed"));
  };

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">

          <img className="signUpLogo" src={logo} alt="Logo" />

          <p className="loginPara">
            Sign up to see Photo and videos <br/> from your friends 
          </p>

          <div> 
            <input type="email" placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input type="text" placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
             
          <div>
            <input type="text" placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <input type="password" placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <input type="text" placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <input type="button" id="otp-btn" value="Get OTP" onClick={sendOtp} />
          <input type="button" id="verify-btn" value="Verify OTP" onClick={verifyOtp} />

          <p className="loginPara" style={{fontSize:"12px", margin:"3px 0px"}}>
            By Signing up, you Agree to our Terms, <br/>
            privacy policy and cookies policy 
          </p>

          <input type="button" id="submit-btn" value="Sign Up" onClick={postData} />

        </div>

        <div className="form2">
          Already have an account?
          <Link to="/signin">
            <span style={{ color: "blue" }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}