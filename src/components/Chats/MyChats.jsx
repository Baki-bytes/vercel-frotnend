import React, { useCallback, useEffect, useState } from "react";
import ChatPreview from "./miscellaneous/ChatPreview";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import API_CONFIG from "../../config/api";
import "./Chat.css";


function MyChats({ onChatSelect }) {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  //Fetches all the chats in which the user is involved
  const fetchChat = useCallback(async (token) => {
    if (!token) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          _: Date.now(),
        },
      };
      const { data } = await axios.get(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.CHAT.GET_ALL), config);
      setChats(data);
    } catch (err) {
      console.log(err);
    }
  }, [setChats]);

  useEffect(() => {
    const userInfo = user || JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    if (!token) return;

    setLoggedUser(userInfo);
    fetchChat(token);

    const pollId = setInterval(() => {
      fetchChat(token);
    }, 2500);

    const syncOnFocus = () => fetchChat(token);
    window.addEventListener("focus", syncOnFocus);
    document.addEventListener("visibilitychange", syncOnFocus);

    return () => {
      clearInterval(pollId);
      window.removeEventListener("focus", syncOnFocus);
      document.removeEventListener("visibilitychange", syncOnFocus);
    };
  }, [user, fetchChat]);

  return (
    <div className="MsgBox">
      <div className="mychats-header">
        <div> 
          <b><p style={{fontSize:"20px"}}>Chat</p></b>
        </div>
        <div className="mychats-header-btn-row">
            <button><i className="fa-solid fa-filter"></i></button>
            <button><i className="fa-solid fa-video"></i></button>
            <button><i className="fa-solid fa-pen-to-square"></i></button>
        </div>
        
      </div>
      <div>
          <small><p>&nbsp;Recent</p></small>
        </div>
        {user && loggedUser && chats && chats.map((chat) => {
          const otherUser = chat.users && chat.users.find(
            (u) => u._id.toString() !== loggedUser._id.toString()
          );
          return (
            <div key={chat._id} onClick={() => onChatSelect && onChatSelect()}>
              <ChatPreview
                otherUser={otherUser}
                msg={chat.latestMessage}
                chat={chat}
              />
            </div>
          );
        })}
    </div>
  );
}

export default MyChats;
