import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMeetings } from "../../context/MeetingContext";

export default function NewMeeting() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const {addMeeting}=useMeetings();

  // Read URL params and convert to local datetime format
  const startParam = params.get("start");
  const endParam = params.get("end");

  // Convert to 'YYYY-MM-DDTHH:mm' format for input fields
  const toInputDate = (iso) => iso?.slice(0, 16);

  const [formData,setFormData]=useState({
    title:"",
    start:toInputDate(startParam),
    end:toInputDate(endParam),
    description:""
  });

  //Handle the submission of form data provided by user for meeting and send data for context api and then navigate back to calendars page
  const handleSubmit = (event) => {
    if (!formData.title || !formData.start || !formData.end) {
      alert("Please fill out all fields.");
      return;
    }
    event.preventDefault();

    addMeeting({
      title:formData.title,
      description:formData.description,
      start: new Date(formData.start),
      end: new Date(formData.end),
    });


    if (formData.startDate >= formData.endDate) {
      alert("End must be after start.");
      return;
    } 

    // You can later send this to backend or global state
    //alert(`Meeting saved:\nTitle: ${title}\nFrom: ${start}\nTo: ${end}`);
    navigate("/calendar");
    setFormData({
      title:"",
      start:"",
      end:"",
      description:"",
    })
  };

  const handleInputChange=(event)=>{
      setFormData((currData) => {
            return { ...currData, [event.target.name]: event.target.value };
        });
  }

  

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>New Meeting</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title"><i className="fa-solid fa-pen"></i></label>&nbsp;
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Meeting title"
            value={formData.title}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <br /><br />
          <label><i className="fa-regular fa-clock"></i></label>&nbsp;
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={formData.start}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          &nbsp;&nbsp;
          <label><i className="fa-solid fa-arrow-right"></i></label>&nbsp;
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={formData.end}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <br /><br />
          <i className="fa-solid fa-align-right"></i>
          <br /><br />
          <textarea
            placeholder="Description"
            rows={10}
            cols={100}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={styles.textarea}
            required
          /> <br /> <br />
            <button style={styles.saveBtn}>
              Save
            </button>
        </form>
      </div>
    </div>
  );
}

// Basic inline styles (you can extract to CSS later)
const styles = {
  page: {
    height: "90%",
    width:"93%",
    backgroundColor: "#1e1e1e",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    placeContent:"center",
    position:"absolute",
    top:"4rem",
    left:"5.5%"
  },
  card: {
    display:"flex",
    flexDirection:"column",
    backgroundColor: "#2b2b2b",
    padding: "30px",
    borderRadius: "8px",
    height:"90%",
    width: "100%",
    boxShadow: "0 0 10px rgba(0,0,0,0.6)",
    justifyContent:"center",
  },
  heading: {
    marginBottom: "20px",
  },
  input: {
    
    color:"whitesmoke",
    backgroundColor:"#1e1e1e",
    padding: "10px",
    margin: "8px 0 15px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "none",
  },
  textarea: {
    width: "70%",
    color:"whitesmoke",
    backgroundColor:"#1e1e1e",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "none",
    marginBottom: "20px",
    resize: "none",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  saveBtn: {
    backgroundColor: "#4f46e5",
    padding: "10px 16px",
    borderRadius: "4px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#555",
    padding: "10px 16px",
    borderRadius: "4px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};
