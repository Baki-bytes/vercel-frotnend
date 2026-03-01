import React, { useState } from "react";
import "./MessageBar.css";

function MessageBar({ onSend }) {
  const [message, setMessage] = useState("");

  //Send the particular message on chatWindow component 
  const handleSendClick = async () => {
    if (message.trim() !== "") {
      const ok = await onSend(message);
      if (ok) {
        setMessage("");
      }
    }
  };

  return (
    <div className="message-bar">
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
      />
      <div className="icons">
        <span className="icon">😊</span>
        <span className="icon">+</span>
        <span className="icon" onClick={handleSendClick}>➤</span>
      </div>
    </div>
  );
}

export default MessageBar;
