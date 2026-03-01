import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, chats, selectedChat } = ChatState();

  // Calculate dashboard stats
  const stats = useMemo(() => {
    const activeChats = chats?.length || 0;
    const meetings = 3;
    const teamOnline = 8;
    const pendingTasks = 5;

    return {
      chats: activeChats,
      meetings,
      teamOnline,
      tasks: pendingTasks,
    };
  }, [chats]);

  // Handle button actions
  const handleNewChat = () => {
    navigate("/chats");
  };

  const handleStartMeet = () => {
    navigate("/meet");
  };

  const handleSchedule = () => {
    navigate("/calendar/new");
  };

  // Get recent chats (last 4)
  const recentChats = useMemo(() => {
    return chats?.slice(-4).reverse() || [];
  }, [chats]);

  // Mock meetings data
  const todaysMeetings = [
    { time: "10:00 AM", title: "Standup" },
    { time: "2:00 PM", title: "Client Call" },
    { time: "5:30 PM", title: "Review" },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>
          Good evening, <span>{user?.name || "User"}</span> 👋
        </h1>
        <p>Here’s what’s happening today</p>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>💬 Chats</h3>
          <p>{stats.chats} Active</p>
        </div>
        <div className="stat-card">
          <h3>📅 Meetings</h3>
          <p>{stats.meetings} Today</p>
        </div>
        <div className="stat-card">
          <h3>👥 Team</h3>
          <p>{stats.teamOnline} Online</p>
        </div>
        <div className="stat-card">
          <h3>⚡ Tasks</h3>
          <p>{stats.tasks} Pending</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Recent Chats */}
        <div className="dashboard-card">
          <h2>Recent Chats</h2>
          <ul className="list">
            {recentChats.length > 0 ? (
              recentChats.map((chat) => (
                <li key={chat._id} className={selectedChat?._id === chat._id ? "active" : ""}>
                  {chat.chatName || "Unnamed Chat"}
                </li>
              ))
            ) : (
              <li className="empty-state">No chats yet</li>
            )}
          </ul>
        </div>

        {/* Meetings */}
        <div className="dashboard-card">
          <h2>Today’s Meetings</h2>
          <ul className="list">
            {todaysMeetings.map((meeting, idx) => (
              <li key={idx}>
                {meeting.time} – {meeting.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="actions">
            <button onClick={handleNewChat} className="action-btn">
              ➕ New Chat
            </button>
            <button onClick={handleStartMeet} className="action-btn">
              📞 Start Meet
            </button>
            <button onClick={handleSchedule} className="action-btn">
              📅 Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
