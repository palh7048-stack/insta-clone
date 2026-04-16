import React,{useEffect,useState} from "react" ;
import profile from "../image/profile.jpg";
import "./profile.css";
import { useParams } from "react-router-dom";

export default function UserProfile(){
const{userid} = useParams()
// console.log(userid)
const[isFollow,setIsFollow] = useState(false)
const[user,setUser] = useState("")
const [posts,setPosts] = useState([])

// follow user
const followUser = (userId)=>{
fetch("http://localhost:5000/follow",{
  method: "put",
  headers:{
    "Content-Type" :"application/json",
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
  body: JSON.stringify({
    followId: userId
  })
}).then(res=>res.json())
 .then((data)=>{
  console.log(data)
  setIsFollow(true)
})
}

// unfollow user
const unfollowUser = (userId)=>{
fetch("http://localhost:5000/unfollow",{
  method: "put",
  headers:{
    "Content-Type" :"application/json",
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
  body: JSON.stringify({
    followId: userId
  })
}).then(res=>res.json())
.then((data)=>{
  console.log(data)
  setIsFollow(false)
})
}

useEffect(()=>{
  fetch(`http://localhost:5000/user/${userid}`,{
    headers:{
      Authorization :"Bearer " + localStorage.getItem("jwt")
    }
  }).then(res=>res.json())
  .then((result) => {
    //console.log(result);
    setUser(result.user);
    setPosts(result.post);
    if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
      setIsFollow(true)
    }
  })

}, [isFollow])


  return(
    <div className="profile">
      <div className="profile-frame">
       {/*profile-pic*/}
      <div className="profile-pic">
        <img src={profile} alt="profile-photo"/>
      </div>
          {/*profile-data*/}
      <div className="profile-data">
        <div style={{display:"flex",alignItems:"center",justifyContent: "space-between"}}>
          <h1>{user.name}</h1>
          <button className="followBtn" onClick={()=>{
            if(isFollow){
              unfollowUser(user._id);
            }else{
              followUser(user._id);
            }
          }} >{isFollow ? "Unfollow" : "Follow"}</button>
        </div>
        
        <div className="profile-info">
        <p> {posts.length} posts </p>
        <p> {user.followers ? user.followers.length: "0"} followers </p>
        <p> {user.following ? user.following.length : "0"} following </p>
        </div>
      </div>
      </div>
    <hr/>
      {/*Gallery*/}
      <div className="gallery">
        {posts.map((pics)=>{
          return <img key={pics._id} src={pics.photo}
         className="item"></img>
        })} 
    </div>

      </div>
    
  )
}