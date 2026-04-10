const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const USER = require("../models/model.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); 
const reqLogin = require("../middlewares/reqLogin.js");

const JWT_SECRET = "harsh@144";

const otpStore = {};

// ---------------- MAIL ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,     
    pass: process.env.EMAIL_PASS          
  }
});
console.log(process.env.USER_EMAIL)
console.log(process.env.EMAIL_PASS)

// ---------------- GET ROUTE ----------------
router.get("/", (req, res) => {
  res.send("Hello");
});

// ---------------- CREATE POST ----------------
router.get("/createPost", reqLogin, (req, res) => {
  console.log("hello harsh");
  res.json({ message: "Authorized user" }); 
});

// ------------------ SEND OTP ----------------
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Email required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = {
    otp: otp,
    expires: Date.now() + 1 * 60 * 1000,
  };

  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Your OTP  for registration", 
      html: `<h2>Your OTP is: ${otp} for Social Media App</h2> and Fill correct OTP in the OTP field for successful registration.<br/><br> <style>color: #c51515;</style> Note: Please  do not share your OTP with anyone. Your OTP is valid for 1 minute.<br/><br/><p style="color: #c51515;"> please do not reply.</p>`,
    });
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Email is invalid" });
  }
});

// ---------------- VERIFY OTP ----------------
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.status(400).json({ error: "No OTP found for this email" });
  }

  if (otpStore[email].expires < Date.now()) {
    return res.status(400).json({ error: "OTP expired" });
  }

  if (otpStore[email].otp != otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  otpStore[email].verified = true;
  res.json({ message: "OTP verified" });
});

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  const { name, email, userName, password } = req.body;
   if (!name)  return res.status(422).json({ error: "Please Enter Name" });
    if (!userName) return res.status(422).json({ error: "Please Enter userName" }); 
    if (!email) return res.status(422).json({ error: "Please Enter Email" });
    if (!password) return res.status(422).json({ error: "Please Enter Password" });
  try {
    if (!otpStore[email] || !otpStore[email].verified) {
      return res.status(422).json({ error: "Please verify OTP first" });
    }

    const userExist = await USER.findOne({
      $or: [{ email }, { userName }]
    });

    if (userExist) {
      return res.status(422).json({ error: "Name or Email Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new USER({
      name,
      email,
      userName,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    delete otpStore[email]; 
    res.json({ message: "Registered successfully", token });

  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message }); 
  }
});

// ---------------- SIGNIN ----------------
router.post("/signin",reqLogin, async (req, res) => {
  const { userName, password } = req.body;

  if (!userName) {
    return res.status(422).json({ error: "Please Enter userName" });
  }
  if (!password) {
    return res.status(422).json({ error: "Please Enter password" });
  }

  try {
    const savesUser = await USER.findOne({ userName });

    if (!savesUser) {
      return res.status(422).json({ error: "Invalid UserName or Password" });
    }

    const isMatch = await bcrypt.compare(password, savesUser.password);

    if (isMatch) {
      const token = jwt.sign({ _id: savesUser._id }, JWT_SECRET);
      res.json({ token });
      console.log(token)
    } else {
      return res.status(422).json({ error: "Invalid Password! please Enter correct Password" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Signin failed" });
  }
});

module.exports = router;