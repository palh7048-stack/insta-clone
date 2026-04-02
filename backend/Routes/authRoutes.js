const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const USER = require("../models/model.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); 
const reqLogin = require("../middlewares/reqLogin.js");

const JWT_SECRET = "harsh@144";

const otpStore = {};

// ---------------- MAIL SETUP ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "palh7048@gmail.com",      // Your Gmail
    pass: "clnqdmztjctejgfo"          // App password
  }
});

// ---------------- GET ROUTE ----------------
router.get("/", (req, res) => {
  res.send("Hello");
});

// ---------------- CREATE POST (protected) ----------------
router.get("/createPost", reqLogin, (req, res) => {
  console.log("hello harsh");
});

// ---------------- SEND OTP ----------------
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Email required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP

  otpStore[email] = {
    otp: otp,
    expires: Date.now() + 1* 60 * 1000, 
  };

  try {
    await transporter.sendMail({
      from: "palh7048@gmail.com",
      to: email,
      subject: "Your OTP Code for registration", 
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Email send failed" });
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
  const { name, userName, email, password } = req.body;

  if (!name || !userName || !email || !password) {
    return res.status(422).json({ error: "Please Enter all the Fields" });
  }

  // Check OTP verified
  if (!otpStore[email] || !otpStore[email].verified) {
    return res.status(422).json({ error: "Please verify OTP first" });
  }

  const userExist = await USER.findOne({ $or: [{ email }, { name }] })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Name or Email Already Exist" });
      }
    })
    .catch((err) => console.log(err));

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new USER({
    name,
    email,
    userName,
    password: hashedPassword,
  });

  user
    .save()
    .then((user) => res.json({ message: "Registered successfully" }))
    .catch((err) => console.log(err));
});

// ---------------- SIGNIN ----------------
router.post("/signin", async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(422).json({ error: "Please Enter All the Fields" });
  }

  await USER.findOne({ userName })
    .then((savesUser) => {
      if (!savesUser) {
        return res.status(422).json({ error: "Invalid UserName or Password" });
      }
      bcrypt
        .compare(password, savesUser.password)
        .then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign({ _id: savesUser._id }, JWT_SECRET);
            res.json({ token });
          } else {
            return res.status(422).json({ error: "Invalid Password" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;