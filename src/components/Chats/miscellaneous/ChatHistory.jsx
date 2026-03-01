import React from 'react';
import './ChatHistory.css';
import { ChatState } from '../../../context/ChatProvider'; 
import { useState } from 'react';

function ChatHistory({ messages }) {
  const {user}=ChatState();
  return (
    <div className="chat-history">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`message ${msg.sender._id === user._id ? 'sent' : 'received'}`}
        >
          <div className="message-text">{msg.content}</div>
          
            <div className="message-time" type="button">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
