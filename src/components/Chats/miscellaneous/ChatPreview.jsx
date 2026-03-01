import React from "react";
import "./ChatPreview.css";
import { NameAvatar } from "../../Avatar";
import { ChatState } from "../../../context/ChatProvider";

function ChatPreview({ otherUser, msg, chat }) {
  const { setSelectedChat, selectedChat } = ChatState();

  const handleClick = () => {
    setSelectedChat(chat);
  };

  return (
    <div
      className={`ChatPreview ${
        selectedChat?._id === chat?._id ? "selected" : ""
      }`}
      onClick={handleClick}
    >
      
      <div>
        <NameAvatar name={otherUser?.name} size={43} />
      </div>

      <div style={{ textAlign: "start" }}>
        <p
          style={{
            fontSize: "clamp(.8rem,1rem,1rem)",
            margin: "0",
            padding: "0",
          }}
        >
          {otherUser?.name}
        </p>

        <small>
          <p style={{ margin: "0.2rem 0", padding: "0" }}>
            {!msg
              ? "No messages yet"
              : otherUser?._id === msg.sender?._id
              ? msg.content
              : `You: ${msg.content}`}
          </p>
        </small>
      </div>
    </div>
  );
}

export default ChatPreview;
