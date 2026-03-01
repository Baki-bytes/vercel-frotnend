import React from "react";
import MeetLinks from "../components/Meet/MeetLinks";
import MeetingLinks from "../components/Meet/MeetingLinks";
import ScheduledMeetings from "../components/Meet/ScheduledMeetings";
import "../components/Meet/Meet.css"

export default function Meet() {
  return (
    <div className="meet">
      <div style={{width:"70%"}}><h2>Meet</h2></div>
      <MeetLinks />
      <MeetingLinks />
      <ScheduledMeetings />
    </div>
  );
}
