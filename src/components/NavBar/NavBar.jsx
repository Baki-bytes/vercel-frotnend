import React from "react";
import "./NavBar.css";
import SearchBox from "./SearchBox";
import { ChatState } from "../../context/ChatProvider";
import { NameAvatar } from "../Avatar";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, setUser } = ChatState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // or token
    setUser(null);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <SearchBox />

      <div className="NavBar-options">
        <div style={{ color: "white", cursor: "pointer" }}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>

        {user ? (
          <>
            <NameAvatar name={user.name} />
            <button className="auth-btn logout" onClick={handleLogout}>
            <i class="fa-solid fa-right-from-bracket"></i>
            </button>
          </>
        ) : (
          <button className="auth-btn login" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
