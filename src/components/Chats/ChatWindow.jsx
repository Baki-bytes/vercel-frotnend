import React, { useState, useEffect, useRef } from "react";
import socket from "../../socket";
import ChatHistory from "./miscellaneous/ChatHistory";
import MessageBar from "./miscellaneous/MessageBar";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import API_CONFIG from "../../config/api";

function ChatWindow() {
  const { user, selectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const selectedChatCompare = useRef(null);
  const lastFetchRef = useRef(0);

  /* ================= SOCKET SETUP ================= */
  useEffect(() => {
    if (!user?._id) return;

    socket.emit("setup", user);

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("message received", (newMessage) => {
      if (
        selectedChatCompare.current &&
        selectedChatCompare.current._id === newMessage.chat._id
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [user]);

  /* ================= FETCH MESSAGES ================= */
  useEffect(() => {
    if (!selectedChat?._id || !user?.token) return;

    selectedChatCompare.current = selectedChat;
    socket.emit("join chat", selectedChat._id);
    let isMounted = true;

    const fetchMessages = async () => {
      if (Date.now() - lastFetchRef.current < 1500) return;
      lastFetchRef.current = Date.now();

      try {
        const { data } = await axios.get(
          `${API_CONFIG.getFullUrl(
            API_CONFIG.ENDPOINTS.MESSAGE.GET
          )}/${selectedChat._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (isMounted) {
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    const pollId = setInterval(() => {
      if (!document.hidden) {
        fetchMessages();
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(pollId);
    };
  }, [selectedChat, user?.token]);

  /* ================= SEND MESSAGE ================= */
  const handleSend = async (text) => {
    if (!text.trim()) return;

    try {
      const { data } = await axios.post(
        API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.MESSAGE.SEND),
        {
          content: text,
          chatId: selectedChat._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      socket.emit("new message", data);
      setMessages((prev) => [...prev, data]);
      lastFetchRef.current = Date.now();
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const chatHistory = document.querySelector(".chat-history");
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatBox">
      <ChatHistory messages={messages} />
      <MessageBar onSend={handleSend} />
    </div>
  );
}

export default ChatWindow;
