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
              <span className="material-symbols-outlined">favorite</span>
              <p>1 Likes</p>
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