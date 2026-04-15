import React,{useEffect,useState} from "react" ;
import profile from "../image/profile.jpg";
import "./profile.css";
import PostDetails from "./postDetails";

export default function Profile(){
const[pic,setPic] = useState([])
const[show, setShow] = useState(false)
const [posts,setPosts] = useState([])

const toggleDetails = (posts) =>{
    if(show){
      setShow(false)
    }else{
      setShow(true)
      if(posts) setPosts(posts)   
    }
  };


useEffect(()=>{
  fetch("http://localhost:5000/myPosts",{
    headers:{
      Authorization :"Bearer " + localStorage.getItem("jwt")
    }
  }).then(res=>res.json())
  .then((result) => {setPic(result)
    console.log(pic)
  })

}, [])



  return(
    <div className="profile">
      <div className="profile-frame">
       {/*profile-pic*/}
      <div className="profile-pic">
        <img src={profile} alt="profile-photo"/>
      </div>
          {/*profile-data*/}
      <div className="profile-data">
        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
        <div className="profile-info">
        <p> 40 posts </p>
        <p> 40 followers </p>
        <p> 50 following </p>
        </div>
      </div>
      </div>
    <hr/>
      {/*Gallery*/}
      <div className="gallery">
        {pic.map((pics)=>{
          return <img key={pics._id} src={pics.photo}
          onClick={()=>{
            toggleDetails(pics)
          }}
         className="item"></img>
        })} 
    </div>

    {show &&
      <PostDetails item={posts}  toggleDetails={toggleDetails} />
    }

      </div>
    
  )
}