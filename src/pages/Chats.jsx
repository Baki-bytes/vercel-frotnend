import React, { useState, useEffect } from "react";
import ChatOptions from "../components/Chats/miscellaneous/ChatOptions";
import ChatWindow from "../components/Chats/ChatWindow";
import MyChats from "../components/Chats/MyChats";
import "../components/Chats/Chat.css";

const MOBILE_BREAKPOINT = 768;

export default function Chats() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );
  const [showChatList, setShowChatList] = useState(
    window.innerWidth >= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      // On desktop/tablet always show chat list
      if (!mobile) {
        setShowChatList(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChatSelect = () => {
    if (isMobile) {
      setShowChatList(false);
    }
  };

  const handleBackToChatList = () => {
    setShowChatList(true);
  };

  return (
    <div className="chats-container">
      {(showChatList || !isMobile) && (
        <div className="MsgBox">
          <MyChats onChatSelect={handleChatSelect} />
        </div>
      )}

      {(!showChatList || !isMobile) && (
        <div className="chatBox">
          <ChatOptions onBack={handleBackToChatList} />
          <ChatWindow />
        </div>
      )}
    </div>
  );
}
