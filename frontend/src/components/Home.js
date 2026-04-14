import React, { useEffect, useState } from "react";
import profile from "../image/profile.jpg";
import post from "../image/post.jpg";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      navigate("/signup"); 
      return;
    }

    fetch("http://localhost:5000/allposts", { 
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

const likePost = (id) =>{
  fetch("http://localhost:5000/like", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      postId: id,
    }),
  })
  .then((res) => res.json())
  .then((result) => {
    const newData = data.map((item) => {
      if(item._id === result._id){
        return result
      }else{
        return item
      }
    })
    setData(newData)
    console.log(result)
  })    
}

const unlikePost = (id) =>{
  fetch("http://localhost:5000/unlike", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      postId: id,
    }),
  })
  .then((res) => res.json())
  .then((result) => {
    const newData = data.map((item) => {
      if(item._id === result._id){
        return result
      }else{
        return item
      }
    })
    setData(newData)
    console.log(result)
  })    
}

const makeComment = (id,text) =>{
  fetch("http://localhost:5000/comment", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      text: text,
      postId: id,
    }),
  })
  .then((res) => res.json())
  .then((result) => {
    console.log(result)
  })    
}

  return (
    <div className="home">
       {/* cards */}
      {data.map((posts) => {
        return(
          <div className="card">

            {/*card-header*/}
            <div className="card-header">
              <div className="card-pic">
                <img src={profile} alt="profile-image" />
              </div>
              <h5>{posts?.postedBy?.name || "unknown user"}</h5> 
            </div>

              {/*card-image*/}
            <div className="card-image">
              <img src={posts.photo} alt="post" />
            </div>

            {/*card-content*/}
            <div className="card-content">
              {
                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                ? (
                  <span className="material-symbols-outlined material-symbols-outlined-red"
              onClick={()=>{unlikePost(posts._id)}}>favorite</span>
                ):(
                  <span className="material-symbols-outlined"
              onClick={()=>{likePost(posts._id)}}>favorite</span>
                )
              }
              <p>{posts.likes.length} Likes</p>
              <p>{posts.body}</p>
            </div>

            {/*add comment*/}
            <div className="add-comment">
              <input type="text" placeholder="Add a comment" value={comment} onChange={(e)=>{setComment(e.target.value)}} />
              <button className="comment" onClick={()=>{makeComment(posts._id, comment)}}>Post</button>
            </div>
          </div>
        )
      })}

      {/*show comments */}

      <div className="show-comments">
        <div className="container">
          <div className="postPic">
            <img src="http://res.cloudinary.com/dqolrgkwz/image/upload/v1775886242/qzzumrpxdw9ts3q2l2va.jpg"
            alt="post" />
            </div>
            <div className="details">

                  {/*card-header*/}
                <div className="card-header">
                  <div className="card-pic">
                  <img src={profile} alt="profile-image" />
              </div>
                  <h5>wow</h5> 
            </div>
                  {/*comment section */}
                  <div className="comment-section"></div>

                    {/*card-content*/}
              <div className="card-content">
                    <p>2 Likes</p>
                    <p>awesome post</p>
              </div>
             {/*add comment*/}
           <div className="add-comment">
              <input type="text" placeholder="Add a comment" value={comment} onChange={(e)=>{setComment(e.target.value)}} />
              <button className="comment" 
             // onClick={()=>{makeComment(posts._id, comment)}}
              >Post</button>
            </div>
              
            </div>
        </div>
      </div>
    </div>
  );
}