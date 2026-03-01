import React, { useState } from "react";
import "./Meet/Meet.css";

export default function MeetSideCard2({ handleClick }) {
  return (
    <>
      <div className="meet-sideCard">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "2rem",
          }}
        >
          <div>
            <h4>Join a meeting with an ID</h4>
          </div>
          <div type="button" onClick={handleClick}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div>
          <form>
            <label htmlFor="meetId" style={{ fontSize: "12px" }}>
              Meeting ID
            </label>
            <br />
            <input
              type="text"
              name="meetId"
              placeholder="Type a meeting ID"
              required
            />
            <br />
            <br />
            <label htmlFor="meetpasscode" style={{ fontSize: "12px" }}>
              Type a meeting passcode
            </label>
            <br />
            <input
              type="text"
              name="meetpasscode"
              placeholder="Type a meeting passcode"
            />{" "}
            <br /> <br />
            <button>Join meeting</button>
          </form>
        </div>
      </div>
    </>
  );
}
