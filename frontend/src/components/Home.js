import React, { useEffect, useState } from "react";
import profile from "../image/profile.jpg";
import post from "../image/post.jpg";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);

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

  return (
    <div className="home">
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

            {/*card-content*/}
            <div className="add-comment">
              <input type="text" placeholder="Add a comment" />
              <button className="comment">Post</button>
            </div>
          </div>
        )
      })}
    </div>
  );
}