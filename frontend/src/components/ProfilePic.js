import React from "react"


export default function ProfilePic(){
  return(
    <div className="profilePic darkBg">
      <div className="changePic centered">
          <div>
            <h2>Change Profile Photo</h2>
          </div>
          <div style={{borderTop:"1px solid #00000030"}}>
            <button className="upload-btn" style={{color:"#1EA1F7"}}>Upload Photo</button>
            <input type="file" accept="image/*" style={{display:"none"}}/>
          </div>
          <div style={{borderTop:"1px solid #00000030"}}>
            <button className="upload-btn" style={{color:"#ED4956"}}>Remove Current Photo</button>
          </div>
          <div style={{borderTop:"1px solid #00000030"}}>
            <button style={{background:"none", cursor:"pointer",border:"none", fontSize:"15px"}}>
              Cancel</button>
          </div>
      </div>
    </div>
  )
}