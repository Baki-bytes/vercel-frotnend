import React from "react";
import "./ChatOptions.css";
import {ChatState} from "../../../context/ChatProvider"
import { NameAvatar } from "../../Avatar";
import { useNavigate } from "react-router-dom"; 


function ChatOptions({ onBack }) {
  const {selectedChat,user}=ChatState();
  const otherUser = selectedChat?.users.find(
            (u) => u._id.toString() !== user._id.toString()
          );
  const navigate = useNavigate();

  console.log(otherUser?.name);
  return (
    <div className="topbar">
      <div className="left-section">
        {/* Back button for mobile */}
        <button 
          className="back-btn-mobile" 
          onClick={onBack}
          aria-label="Back to chats"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <NameAvatar name={otherUser?.name} size={30}/>
           <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <p className="title">
            {otherUser?.name}
        </p>
       {/* <p style={{fontSize:"12px",marginTop:"-14px"}}>{otherUser?.email}</p>*/}
           </div>
      </div>

      <div className="right-section">
        <span className="icon" onClick={() => navigate(`/call/${selectedChat._id}`)}><i className="fa-solid fa-video"></i></span>
        <span className="icon"><i className="fa-solid fa-phone"></i></span>
        <span className="icon"><i className="fa-solid fa-user-group"></i></span>
        <span className="icon">⋯</span>
      </div>
    </div>
  );
}

export default ChatOptions;
