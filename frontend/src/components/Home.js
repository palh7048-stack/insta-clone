import React from "react";
import profile from "../image/profile.jpg"
import post from "../image/post.jpg"
import "./Home.css"

export default function Home(){
  return(
    <div className="home">
      <div className="card">
        {/*card-header*/}
          <div className="card-header">
            <div className="card-pic">
            <img  src={profile} alt="profile-image"/>
            </div>
            <h5>John</h5>
          </div>
          <div className="card-image"> 
            <img src={post} alt="post"/>
          </div>
          {/*card-content*/}
          <div className="card-content">
            <span className="material-symbols-outlined">favorite</span>
            <p>1 Likes</p>
            <p>This is very Amazing</p>
          </div>
          {/*card-content*/}
          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input type="text" placeholder="Add a comment"/>
            <button className="comment">Post</button>
          </div>
      </div>
    </div>
  )
}