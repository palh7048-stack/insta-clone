const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({

  body: {type: String, required:true },
  photo: {type: String, required:true },
  likes: [{type: ObjectId, ref:"USER"}],
   comments: [   
    {
      text: {
        type: String,
        required: true
      },
      postedBy: {
        type: ObjectId,
        ref: "USER",
        required: true
      }
    }],
  postedBy: {type: ObjectId, ref: "USER" }
})
module.exports =  mongoose.model("POST",postSchema)