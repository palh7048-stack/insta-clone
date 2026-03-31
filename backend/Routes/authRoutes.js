const express = require("express")
const router =  express.Router();
const bcrypt = require("bcrypt")
const USER = require("../models/model.js")
const jwt = require("jsonwebtoken")
const reqLogin = require("../middlewares/reqLogin");

const JWT_SECRET = "harsh@144";
router.get("/",(req,res)=>{
  res.send("Hello");
});

router.get('/createPost',reqLogin,(req,res)=>{
  console.log("hello harsh")
})

router.post("/signup", async(req,res)=>{
  const { name, userName, email, password} = req.body;
  
  if(!name || !userName || !email || !password){
    return res.status(422).json({error:"Please Enter all the Fields"})
  }
  const userExist = await USER.findOne({$or:[{email:email}, {name:name}] })
  .then((userExist)=>{
    if(userExist){
      return res.status(422).json({error:"Name and Email Already Exist"})
    }
  })
  .catch(err =>{console.log(err) })

  const hashedPassword = await bcrypt.hash(password,12) 
  const user = new USER ({
    name,
    email,
    userName,
    password: hashedPassword
 })

user.save()
.then(user => {res.json({message:"Registered successfully"} )})
.catch(err =>{console.log(err) })
})

// signIn
router.post("/signin",async(req,res)=>{
  const {userName, password} = req.body;
  if(!userName || !password ){
    res.status(422).json({error:"Please Enter All the Fields"})
  }
  await USER.findOne({userName:userName}).then ((savesUser)=>{
    if(!savesUser){
      return res.status(422).json({error:"Invalid UserName or Password"})
    }
    bcrypt.compare(password, savesUser.password)
    .then(isMatch=>{
        if(isMatch){
          // return res.json({message:"SignIn Successfully"})
          const token = jwt.sign({_id:savesUser._id}, JWT_SECRET)
          console.log(token)
          res.json({token})
        }else{
          return res.status(422).json({error:"Invalid  Password"})
        }
    })
    .catch(err =>{console.log(err)})
  })
})

module.exports = router;