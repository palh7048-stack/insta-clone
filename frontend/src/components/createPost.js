import React, { useState, useEffect } from "react";
import profile from "../image/profile.jpg";
import "./createPost.css"
import icone from "../image/icone.png"


export default function Createpost() {
  const loadfile = (event)=>{
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) 
    }
  }
  return (
    <div className="createPost">
      <div className="post-header">
        <h4 style={{margin:"3px auto"}}>Create New Post</h4>
        <button id="post-btn">Share</button>
      </div>
      <div className="main-div">
        <img id="output" src={icone}/>
         <input type="file" accept="image/*" onChange={(event)=>{loadfile(event)} }/>
      </div>
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src={profile} alt=""/>
          </div>
          <h5>John</h5>
        </div>
        <textarea type="text" placeholder="write a caption...."></textarea>
      </div>
    </div>
  );
}