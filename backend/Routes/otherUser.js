const express = require("express");
const router = express.Router();
const POST = require("../models/post.js")
const USER = require("../models/model.js");

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

module.exports = router ;