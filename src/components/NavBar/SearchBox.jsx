import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import UserList from "./UserList";
import API_CONFIG from "../../config/api";
import "./NavBar.css";
export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [showResult, setShowResult] = useState(false);
  const { user, setSelectedChat, chats, setChats } = ChatState();
  //console.log(user)
  //Searches user based on the query string
  const handleSend = async () => {
    if (search.trim() !== "") {
      console.log("Send:", search);
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.USER.SEARCH)}?search=${search}`,
        config
      );
      setSearchResult(data);
      console.log(searchResult);
      setShowResult(true);
    } catch (error) {
      console.log(error);
    }
  };

  //Access a particular chat after clicking on it
  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.CHAT.CREATE),
        { userId },
        config
      );
      //console.log(data);
      if (!chats || !Array.isArray(chats)) {
        setChats([data]);
      } else if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setShowResult(false);
      setSearch("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setShowResult((prev)=>!prev);
  };

  return (
    <div>
      <div className="search-bar">
        <span
          style={{
            background: "transparent",
            paddingRight: "12px",
            marginRight: "12px",
            alignContent: "center",
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="text"
          name="search"
          id="search-box"
          placeholder="Search"
          value={search}
          onChange={(e) =>{ setSearch(e.target.value);handleSend()}}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          onClick={handleClick}
        />
      </div>
      {showResult && (
        <div
        className="user-list"
        >
          < div style={{alignSelf:"end"}} onClick={handleClick}><i className="fa-solid fa-xmark"></i></div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <b style={{ fontSize: "16px" }}>{search}</b>
            <p>Press enter to view results</p>
          </div>
          <div>
            {searchResult?.map((user) => (
              <UserList
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
