import React, { useState } from "react";
import "./Meet/Meet.css";

export default function MeetSideCard({ handleClick }) {
  return (
    <>
      <div className="meet-sideCard" style={{ height: "9rem", left: "12rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "2rem",
          }}
        >
          <div>
            <h4>Give your meeting a title</h4>
          </div>
          <div type="button" onClick={handleClick}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div>
          <form>
            <input type="text" name="meet-title" placeholder="Meeting title" />
            <br />
            <br />
            <button>Create and copy link</button>
          </form>
        </div>
      </div>
    </>
  );
}
