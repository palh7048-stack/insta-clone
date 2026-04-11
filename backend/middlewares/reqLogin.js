const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const USER = mongoose.model("USER")
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
module.exports = (req,res,next)=>{
  const {authorization} = req.headers;
  if(!authorization){
    return res.status(401).json({error:"you Must have Logged In 1 "})
  }
 const token = authorization.replace("Bearer ","")
 jwt.verify(token,JWT_SECRET,(err, payload)=>{
  if(err){
    return res.status(401).json({error:"you Must have Logged In 2 "})
  }
  const {_id} = payload
  USER.findById(_id).then(userData=>{
    req.user = userData
      next();
  })
 })

}