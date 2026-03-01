import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import MyChats from "../Chats/MyChats";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button - Mobile Only */}
      <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle navigation">
        <span className={`hamburger-line ${isOpen ? "active" : ""}`}></span>
        <span className={`hamburger-line ${isOpen ? "active" : ""}`}></span>
        <span className={`hamburger-line ${isOpen ? "active" : ""}`}></span>
      </button>

      {/* Overlay - Mobile Only */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`sideBar ${isOpen ? "open" : ""}`}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ESQjRXbHvnHbwtlqKUNDzUFDAG8tDWZFAw&s" />
        <div className="sidebar-icons">
          <Link to="/chats" className="sidebar-link" onClick={closeSidebar}>
            <i className="icons fa-solid fa-comment"></i>
            <p>&nbsp; Chats</p>
          </Link>
        </div>

        <div className="sidebar-icons">
          <Link to="/meet" className="sidebar-link" onClick={closeSidebar}>
            <i className="icons fa-solid fa-video"></i>
            <p>&nbsp;&nbsp;Meet</p>
          </Link>
        </div>
        <div className="sidebar-icons">
          <i className="icons fa-solid fa-people-group"></i>
          <p>Community</p>
        </div>
        <div className="sidebar-icons">
          <Link to="/calendar" className="sidebar-link" onClick={closeSidebar}>
            <i className="icons fa-solid fa-calendar-days"></i>              
            <p>Calendar</p>
          </Link>
        </div>

        <div style={{fontSize:"clamp(1rem, 1vw, 1.5rem)"}} className="sidebar-icons">
          <Link to="/dashboard" className="sidebar-link" onClick={closeSidebar}>
          <i className="fa-solid fa-bell"></i>
          <p>Activity</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideBar;
