import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MeetSideCard from "../MeetSideCard";
import  MeetSideCard2  from "../MeetSideCard2";

export default function MeetLinks() {
  const navigate = useNavigate();
  const [toogleMeet, setToogleMeet] = useState(false);
  const [toogleCreate, setToogleCreate] = useState(false);
  const handleClick2 = () => {
    navigate("/calendar/new");
  };

  const handleClickBtn1 = () => {
    setToogleCreate(!toogleCreate);
    return toogleCreate;
  };

  const handleClickBtn3 = () => {
    setToogleMeet(!toogleMeet);
    return toogleMeet;
  };

  return (
    <div className="meet-links">
      <button
        className="link-btn"
        style={{ backgroundColor: "#4f52b2", color: "whitesmoke" }}
        onClick={handleClickBtn1}
      >
        <i className="fa-solid fa-link"></i>&nbsp;&nbsp;&nbsp;Create meeting
        link
      </button>
      {toogleCreate && <MeetSideCard handleClick={handleClickBtn1} />}
      <button
        className="link-btn"
        style={{ backgroundColor: "#292929", color: "whitesmoke" }}
        onClick={handleClick2}
      >
        <i
          className="fa-solid fa-calendar-days"
          style={{ color: "violet" }}
        ></i>
        &nbsp;&nbsp;&nbsp;Schedule a meeting
      </button>
      <button
        className="link-btn"
        style={{ backgroundColor: "#292929", color: "whitesmoke" }}
        onClick={handleClickBtn3}
      >
        <i className="fa-solid fa-id-card" style={{ color: "#7f85f5" }}></i>{" "}
        &nbsp;&nbsp;&nbsp;Join with a meeting ID
      </button>
      {toogleMeet && <MeetSideCard2 handleClick={handleClickBtn3}/>}
    </div>
  );
}
