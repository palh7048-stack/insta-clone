const express = require("express");
const router = express.Router();
const POST = require("../models/post.js")
const reqLogin = require("../middlewares/reqLogin.js")
const USER = require("../models/model.js");

// to get User Profile
router.get("/user/:id", async (req, res) => {
  USER.findOne({ _id: req.params.id }).select("-password")
    .then(user => {
      POST.find({ postedBy: req.params.id })
        .populate("postedBy", "_id")
        .exec()
        .then(result => {
          res.status(200).json({ user, post: result });
        })
        .catch(err => {
          return res.status(422).json({ error: err });
        });
    })
    .catch(err => {
      return res.status(422).json({ error: "User not found" });
    });
});

// follow users
router.put("/follow", reqLogin, (req, res) => {

  USER.findByIdAndUpdate( req.body.followId,
    { $push: { followers: req.user._id } },
    { new: true }
  )
  .then(result => {

    USER.findByIdAndUpdate( req.user._id,
      { $push: { following: req.body.followId } },
      { new: true }
    )
    .then(result => res.json(result))
    .catch(err => {
      return res.status(422).json({ error: err })
    })

  })
  .catch(err => {
    return res.status(422).json({ error: err })
  })

})

// unfollow users
router.put("/unfollow", reqLogin, (req, res) => {
  USER.findByIdAndUpdate(req.body.followId,
    { $pull: { followers: req.user._id } },
    { new: true }
  )
  .then(result => {

    USER.findByIdAndUpdate(  req.user._id,
      { $pull: { following: req.body.followId } },
      { new: true }
    )
    .then(result => res.json(result))
    .catch(err => {
      return res.status(422).json({ error: err })
    })

  })
  .catch(err => {
    return res.status(422).json({ error: err })
  })

})

module.exports = router;