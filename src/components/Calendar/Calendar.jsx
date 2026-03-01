import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import "./TeamsCalendar.css"; // Custom dark theme styles
import { useMeetings } from "../../context/MeetingContext";
import MeetSideCard from "../MeetSideCard";
import MeetSideCard2 from "../MeetSideCard2";

const localizer = momentLocalizer(moment);

export default function SimpleCalendar() {
  const [toogleMeet, setToogleMeet] = useState(false);
  const [toogleCreate, setToogleCreate] = useState(false);
  const navigate = useNavigate();
  // const [events, setEvents] = useState([
  //   // {
  //   //   title: "Team Meeting",
  //   //   start: new Date(2025, 5, 14, 10, 0),
  //   //   end: new Date(2025, 5, 14, 11, 0),
  //   // },
  // ]);

  const { events } = useMeetings();
  console.log(events);

  // const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  const handleAddEvent = () => {
    //   if (!newEvent.title || !newEvent.start || !newEvent.end) {
    //     alert("Please fill out all fields");
    //     return;
    //   }

    //   const start = new Date(newEvent.start);
    //   const end = new Date(newEvent.end);

    //   if (start >= end) {
    //     alert("End time must be after start time");
    //     return;
    //   }
    navigate("/calendar/new");
    //   setEvents([...events, { title: newEvent.title, start, end }]);
    //   setNewEvent({ title: "", start: "", end: "" });
  };

  //Handle slot click to redirect to meeting description page
  const handleSlotSelect = (slotInfo) => {
    const selectedStart = slotInfo.start.toISOString();
    const selectedEnd = slotInfo.end.toISOString();
    navigate(`/calendar/new?start=${selectedStart}&end=${selectedEnd}`);
  };

  const handleEventClick = (event) => {
    console.log(event);
  };
  //Display Card on clicking an button in header section
  const handleClickBtn1 = () => {
    setToogleCreate(!toogleCreate);
    setToogleMeet((prev)=>{if(prev){prev=!prev}})
    return toogleCreate;
  };
  //Display a card on clicking a button in header section
  const handleClickBtn2 = () => {
    setToogleMeet(!toogleMeet);
    setToogleCreate((prev)=>{if(prev){prev=!prev}})
    return toogleMeet;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div style={{ display: "flex", gap: "10px" }}>
          <i className="icons fa-solid fa-calendar-days"></i>
          <h2>Calendar</h2>
        </div>
        <div className="calendar-header-btn">
          <button onClick={handleClickBtn2}># Join with an ID</button>
          {toogleMeet && <MeetSideCard2 handleClick={handleClickBtn2}/>}
          <button onClick={handleClickBtn1}>
            <i
              className="icons fa-solid fa-video"
              style={{ padding: "0", margin: "0", display: "inline" }}
            ></i>
            &nbsp;Meet now
          </button>
          {toogleCreate && <MeetSideCard handleClick={handleClickBtn1}/>}
          <button onClick={handleAddEvent} style={{backgroundColor:"#4f52b2"}}>
            + New Meeting
          </button>
        </div>
      </div>

      <div className="calendar-wrapper">
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSlotSelect}
          style={{ height: "75vh",padding:".8rem 1rem",minWidth:"0",minHeight:"0",flexShrink:0 }}
          step={60}
          timeslots={1}
          defaultView="week"
          onSelectEvent={(event) => handleEventClick(event)}
        />
      </div>
    </div>
  );
}
