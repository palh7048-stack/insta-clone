import React, { useEffect, useState } from "react"; 
import profile from "../image/profile.jpg";
import "./Home.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


export default function Home() {

  const notify = (message) => toast.error(message);
  const notifyS = (message) => toast.success(message);

  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const[show, setShow]= useState(false);
  const[item, setItem] = useState([])

  const user = JSON.parse(localStorage.getItem("user")); 

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      navigate("/signup"); 
      return;
    }
      // Fetching all Posts
    fetch("http://localhost:5000/allposts", { 
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  // show and hide comment
  const toggleComment = (posts) =>{
    if(show){
      setShow(false)
    }else{
      setShow(true)
      if(posts) setItem(posts)   
    }
  };

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
  })    
}

// make a comment
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
    const newData = data.map((item) => {
      if(item._id === result._id){
        return result
      }else{
        return item
      }
    })
    setData(newData)
    setComment("")
    notifyS("Comment Posted")
  })    
}

  return (
    <div className="home">
      {data.map((posts) => {
        return(
          <div className="card" key={posts._id}>

            <div className="card-header">
              <div className="card-pic">
                <img src={profile} alt="profile-image" />
              </div>
              <h5><Link to={`/profile/${posts.postedBy._id}`}>
              {posts.postedBy.name}
              </Link></h5> 
            </div>

            <div className="card-image">
              <img src={posts.photo} alt="post" />
            </div>

            <div className="card-content">
              {
                user && posts.likes.includes(user._id) ? (  
                  <span className="material-symbols-outlined 
                  material-symbols-outlined-red"
              onClick={()=>{unlikePost(posts._id)}}>favorite</span>
                ):(
                  <span className="material-symbols-outlined"
              onClick={()=>{likePost(posts._id)}}>favorite</span>
                )
              }
              <p>{posts.likes.length} Likes</p>
              <p>{posts.body}</p>
              <p style={{fontWeight:"bold",cursor:"pointer"}} onClick={()=>{toggleComment(posts)}} >
                View all Comment</p>
            </div>

            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input type="text" placeholder="Add a comment" value={comment} onChange={(e)=>{setComment(e.target.value)}} />
              <button className="comment" onClick={()=>{makeComment(posts._id, comment)}}>Post</button>
            </div>
          </div>
        );
      })}
        {/*show comment */}
      {show && (
        <div className="show-comments">
        <div className="container">
          <div className="postPic">
            <img src={item?.photo} alt="post" /> 
            </div>
            <div className="details">

                <div className="card-header"
                style= {{borderBottom:"1px solid #00000029"}} >

                  <div className="card-pic">
                  <img src={profile} alt="profile-image" />
              </div>
                  <h5>{item.postedBy.name}</h5>
            </div>

                  <div className="comment-section" 
                  style= {{borderBottom:"1px solid #00000029"}}>
                    {item?.comments?.map((comment)=>{   
                      return(
                        <p className="comm">
                      <span className="commmenter" style={{fontWeight:"bolder"}}>{comment?.postedBy?.name}{" "}</span>
                      <span className="commentText"> {comment?.text}</span>
                      </p>
                      )
                    })}
                    
                  </div>

              <div className="card-content">
                    <p>{item?.likes?.length}</p>
                    <p>{item?.body}</p>
              </div>

            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input type="text" placeholder="Add a comment" value={comment} onChange={(e)=>{setComment(e.target.value)}} />
              <button className="comment" 
                onClick={()=>{makeComment(item._id, comment)
                toggleComment()
              }}>Post</button>
            </div>
              
            </div>
        </div>
        <div className="close-comment">
          <span className="material-symbols-outlined 
            material-symbols-outlined-comment" 
            onClick={()=>{toggleComment()}}>close</span>
        </div>
      </div>
        )}
    </div>
  );
}