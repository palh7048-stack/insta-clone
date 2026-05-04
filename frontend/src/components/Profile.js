import React,{useEffect,useState} from "react" ;
import "./profile.css";
import PostDetails from "./postDetails";
import ProfilePic from "./ProfilePic";

export default function Profile(){
var picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png"
const[pic,setPic] = useState([])
const[show, setShow] = useState(false)
const [posts,setPosts] = useState([])
const[user, setUser] = useState("")
const[changePic, setChangePic] = useState(false)

const toggleDetails = (posts) =>{
    if(show){
      setShow(false)
    }else{
      setShow(true)
      if(posts) setPosts(posts)   
    }
  };

  const changeProfile = () =>{
    if(changePic){
      setChangePic(false)
    }else{
      setChangePic(true)
    }
  }


useEffect(()=>{
  fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
    headers:{
      Authorization :"Bearer " + localStorage.getItem("jwt")
    }
  }).then(res=>res.json())
  .then((result) => {
    setPic(result.post)
    setUser(result.user)
    console.log(pic)
  })

}, [])



  return(
    <div className="profile">
      <div className="profile-frame">
       {/*profile-pic*/}
      <div className="profile-pic">
        <img 
         onClick={changeProfile}
        src={user.Photo ? user.Photo : picLink} alt="profile-photo"/>
      </div>
          {/*profile-data*/}
      <div className="profile-data">
        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
        <div className="profile-info">
        <p> {pic ? pic.length: "0"} posts </p>
        <p> {user.followers ? user.followers.length : "0"} followers </p>
        <p>  {user.following ? user.following.length : "0"} following </p>
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
    {
      changePic && <ProfilePic changeProfile = {changeProfile} />
    }
    </div>
    
  )
}