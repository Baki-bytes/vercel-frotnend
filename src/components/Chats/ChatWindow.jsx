import React, { useCallback, useState, useEffect, useRef } from "react";
import socket from "../../socket";
import ChatHistory from "./miscellaneous/ChatHistory";
import MessageBar from "./miscellaneous/MessageBar";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import API_CONFIG from "../../config/api";

function ChatWindow() {
  const { user, selectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [sendError, setSendError] = useState("");
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
  const fetchMessages = useCallback(async () => {
    if (!selectedChat?._id || !user?.token) return;
    if (Date.now() - lastFetchRef.current < 1200) return;
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
          params: {
            _: Date.now(),
          },
        }
      );
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  }, [selectedChat?._id, user?.token]);

  useEffect(() => {
    if (!selectedChat?._id || !user?.token) return;

    selectedChatCompare.current = selectedChat;
    socket.emit("join chat", selectedChat._id);
    fetchMessages();

    const pollId = setInterval(fetchMessages, 2000);
    const syncOnFocus = () => fetchMessages();
    window.addEventListener("focus", syncOnFocus);
    document.addEventListener("visibilitychange", syncOnFocus);

    return () => {
      clearInterval(pollId);
      window.removeEventListener("focus", syncOnFocus);
      document.removeEventListener("visibilitychange", syncOnFocus);
    };
  }, [selectedChat, user?.token, fetchMessages]);

  /* ================= SEND MESSAGE ================= */
  const handleSend = async (text) => {
    if (!text.trim()) return false;
    if (!selectedChat?._id) {
      setSendError("Select a chat first.");
      return false;
    }
    if (!user?.token) {
      setSendError("Session expired. Please login again.");
      return false;
    }

    try {
      setSendError("");
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
      return true;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Message send failed. Check backend/token.";
      setSendError(msg);
      console.error(error);
      return false;
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
      {sendError ? (
        <div style={{ color: "#ff6b6b", fontSize: "12px", padding: "6px 10px" }}>
          {sendError}
        </div>
      ) : null}
      <ChatHistory messages={messages} />
      <MessageBar onSend={handleSend} />
    </div>
  );
}

export default ChatWindow;
