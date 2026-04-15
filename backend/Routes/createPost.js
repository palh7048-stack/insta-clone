const express = require("express");
const router = express.Router();
const reqLogin = require("../middlewares/reqLogin.js");
const POST = require("../models/post.js");

// All Post
router.get("/allposts", reqLogin, async (req, res) => {
  POST.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy","_id name")
    .then(posts => res.json(posts))
    .catch(err => console.log(err));
});

// Create Post
router.post("/createPost", reqLogin, async (req, res) => {
  try {
    const { body, pic } = req.body;
    console.log(pic);

    if (!body) {
      return res.status(422).json({ error: "Please enter the body of the post" });
    }
    if (!pic) {
      return res.status(422).json({ error: "Please upload a picture" });
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

// My Post
router.get("/myPosts", reqLogin, async (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
     .populate("comments.postedBy","_id name")
    .then(mypost => {
      res.json(mypost);
    })
    .catch(err => console.log(err));
});

// for Like
router.put("/like", reqLogin, async (req, res) => {
  POST.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $push: { likes: req.user._id }
    },
    { new: true }
  )
    .populate("postedBy", "_id name")   
    .populate("comments.postedBy", "_id name") 
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      return res.status(422).json({ error: err });
    });
});

// for UnLike
router.put("/unlike", reqLogin, async (req, res) => {
  POST.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $pull: { likes: req.user._id }
    },
    { new: true }
  )
      .populate("postedBy", "_id name")   
      .populate("comments.postedBy", "_id name") 
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      return res.status(422).json({ error: err });
    });
});

//  for comment
router.put("/comment", reqLogin, async (req, res) => {
  const comment = {
  text: req.body.text,
  postedBy: req.user._id
};

POST.findByIdAndUpdate(
  req.body.postId,
  {
    $push: { comments: comment }
  },
  { new: true }
)
.populate("comments.postedBy", "_id name")
.populate("postedBy","_id name")
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      return res.status(422).json({ error: err });
    });
});

// Delete Post 

router.delete('/deletePost/:postId', reqLogin, async (req, res) => {
  try {
    console.log(req.params.postId);

    const post = await POST.findById({_id: req.params.postId})
      .populate("postedBy", "_id");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.postedBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await post.deleteOne();

    return res.json({ message: "Post Successfully Deleted" });

  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

module.exports = router;
