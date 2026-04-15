import React from 'react';
import './postDetails.css';
import profile from "../image/profile.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostDetails({item,toggleDetails}){

  const navigate = useNavigate();
  const notify = (message) => toast.error(message);
  const notifyS = (message) => toast.success(message);
  

const removePosts = (postId)=>{
  if(window.confirm("Do You really want to delete this post ?")){
  fetch(`http://localhost:5000/deletePost/${postId}`,{
  method: "delete",
  headers: {
    Authorization: "Bearer " + localStorage.getItem('jwt')
  },
  }).then(res=>res.json())
  .then((result)=>{
    console.log(result);
    toggleDetails()
    navigate("/")
    notifyS("Post Deleted Successfully")

  })
 }
}

  return(
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
                      <h5>{item?.postedBy?.name}</h5>
                      <div className='deletePost' onClick={()=>{removePosts(item._id)}}>
                        <span className="material-symbols-outlined">delete</span>
                      </div>
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
                  <input type="text" placeholder="Add a comment"
                  // value={comment} onChange={(e)=>{setComment(e.target.value)}}
                 />
                  <button className="comment" 
                  //   onClick={()=>{makeComment(item._id, comment)
                  //   toggleComment()
                  // }}
                  >Post</button>
                </div>
                  
                </div>
            </div>
            <div className="close-comment">
              <span className="material-symbols-outlined 
                material-symbols-outlined-comment" 
                onClick={()=>{toggleDetails()}}
                >close</span>
            </div>
          </div>
  )

}