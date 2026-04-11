const express = require("express");
const router = express.Router();
const reqLogin = require("../middlewares/reqLogin.js");
const POST = require("../models/post.js");

router.get("/allposts",reqLogin, async (req,res)=>{
  POST.find()
     .populate("postedBy","_id name")
     .then(posts => res.json(posts))
     .catch(err => console.log(err))
})

router.post("/createPost", reqLogin, async (req, res) => {
  try {
    const { body, pic } = req.body;
    console.log(pic)

    if (!body ) {
      return res.status(422).json({error:"Please enter the body of the post"});
    }
    if (!pic) {
      return res.status(422).json({error:"Please upload a picture"});
    }

    const post = new POST({
      body,
      photo: pic,
      postedBy: req.user
    });

    const result = await post.save();

    res.json({ post: result });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

router.get("/myPosts",reqLogin,async(req,res)=>{
  POST.find({postedBy: req.user._id})
   .populate("postedBy","_id name")
     .then(mypost=>{
       res.json(mypost)
  })
  
})

router.put("/like",reqLogin,async(req,res)=>{
  POST.findOneAndReplace(req.body.postId,{
    $push:{likes:req.user._id}
  },{
    new:true
  }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }else{
      res.json(result)
    }
  })
})

router.put("/unlike",reqLogin,async(req,res)=>{
  POST.findOneAndReplace(req.body.postId,{
    $pull:{likes:req.user._id}
  },{
    new:true
  }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }else{
      res.json(result)
    }
  })
})

module.exports = router;