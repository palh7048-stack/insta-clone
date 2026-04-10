import React, { useState,useEffect } from "react";
import profile from "../image/profile.jpg";
import "./createPost.css"
import icone from "../image/icone.png"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Createpost() {

 const [body, setBody] = useState("")
 const [image, setImage] = useState("")
 const [url, setUrl] = useState("")
 const navigate = useNavigate();

 const notify = (message) => toast.error(message);
const notifyS = (message) => toast.success(message);
 
 
 useEffect(()=>{

  // saving post to database 
   if(url){
  fetch("http://localhost:5000/createPost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization" :"Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        body,
        pic:url  
      }) 
    })
    .then(res => res.json())
    .then(data => {if(data.error){
      notify(data.error)
    }else{
      notifyS("Post Successfully Posted")
    }
    navigate("/")
  })
    .catch(err => console.log(err))
  }
},[url])

 
 const postDetails = ()=>{
  console.log(body, image)
  const data = new FormData()
  data.append("file",image)
  data.append("upload_preset","insta-clone")
  data.append("cloud_name","dqolrgkwz")

  fetch("https://api.cloudinary.com/v1_1/dqolrgkwz/image/upload",{
    method:"post",
    body:data
  })
  .then(res=>res.json())
  .then(data => {setUrl(data.url)
  })
  .catch(err=>console.log(err))
}
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
        <button id="post-btn" onClick={()=> { postDetails() }}>Share</button>
      </div>
      <div className="main-div">
        <img id="output" src={icone}/>
          <input type="file" accept="image/*" onChange={(event)=>{loadfile(event);
            setImage(event.target.files[0])
          }}/>

      </div>
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src={profile} alt=""/>
          </div>
          <h5>John</h5>
        </div>
        <textarea value={body} onChange={(e)=>{setBody(e.target.value) }} type="text" 
        placeholder="Write a Caption...."></textarea>
      </div>
    </div>
  );
}