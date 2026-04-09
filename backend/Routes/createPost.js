const express =require("express");
const router = express();
const reqLogin = require('../middlewares/reqLogin.js')
const POST = require('../models/post.js')


router.post("/createPost",reqLogin, (req,res)=>{
  const {body, pic} = req.body;
  if(!body || !pic){
    return res.status(422).json({error:"Please add all the Fields"})
  }
  console.log(req.user)
  const post =  new POST({
    body,
    photo:pic,
    postedBy: req.user
  })
  post.save().then((result)=>{
    return res.json({post: result })
  }).catch(err=> console.log(err))
})
module.exports = router