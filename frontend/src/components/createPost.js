import React, { useState, useEffect } from "react";
import profile from "../image/profile.jpg";


export default function Createpost() {
  return (
    <div className="createPost">
      {/* //header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn">Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src={profile} alt="img"/>
          </div>
          <h5>Ramesh</h5>
        </div>
      </div>
    </div>
  );
}