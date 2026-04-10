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

module.exports = router;
