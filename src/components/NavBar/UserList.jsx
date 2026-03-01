import React from "react";
import Avatar from "@mui/material/Avatar";
import { NameAvatar } from "..//Avatar";
import "./NavBar.css"

export default function UserList({ user, handleFunction }) {
  return (
    <div
      type="button"
      onClick={handleFunction}
      className="search-result"
      style={{
        
      }}
    >
      <NameAvatar name={user.name}/>
      <div>
        <div style={{ fontWeight: "bold" }}>{user.name}</div>
        <div style={{ fontSize: "0.85rem", color: "#555" }}>{user.email}</div>
      </div>
    </div>
  );
}
