import React from "react" ;
import profile from "../image/profile.jpg";
import "./profile.css";

export default function Profile(){
  return(
    <div className="profile">
      <div className="profile-frame">
       {/*profile-pic*/}
      <div className="profile-pic">
        <img src={profile} alt="profile-photo"/>
      </div>
          {/*profile-data*/}
      <div className="profile-data">
        <h1>John</h1>
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
            <img src={profile} alt="grallery"/>
             <img src={profile} alt="grallery"/>
              <img src={profile} alt="grallery"/>
               <img src={profile} alt="grallery"/>
                <img src={profile} alt="grallery"/>
                 <img src={profile} alt="grallery"/>
                  <img src={profile} alt="grallery"/>
                  <img src={profile} alt="grallery"/>
                  <img src={profile} alt="grallery"/>
        </div>


      </div>
    
  )
}