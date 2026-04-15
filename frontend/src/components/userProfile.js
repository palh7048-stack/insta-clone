import React,{useEffect,useState} from "react" ;
import profile from "../image/profile.jpg";
import "./profile.css";
import PostDetails from "./postDetails";
import { useParams } from "react-router-dom";

export default function UserProfile(){
const{userid} = useParams()
console.log(userid)
const[user,setUser] = useState("")
const [posts,setPosts] = useState([])

useEffect(()=>{
  fetch(`http://localhost:5000/user/${userid}`,{
    headers:{
      Authorization :"Bearer " + localStorage.getItem("jwt")
    }
  }).then(res=>res.json())
  .then((result) => {
    console.log(result)
    setUser(result.user)
    setPosts(result.post)
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
        <h1>{user.name}</h1>
        <div className="profile-info">
        <p> {posts.length} posts </p>
        <p> 40 followers </p>
        <p> 50 following </p>
        </div>
      </div>
      </div>
    <hr/>
      {/*Gallery*/}
      <div className="gallery">
        {posts.map((pics)=>{
          return <img key={pics._id} src={pics.photo}
          // onClick={()=>{
          //   toggleDetails(pics)
          // }}
         className="item"></img>
        })} 
    </div>

    {/* {show &&
      <PostDetails item={posts}  toggleDetails={toggleDetails} />
    } */}

      </div>
    
  )
}