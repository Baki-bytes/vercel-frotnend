import { useContext,createContext,useState } from "react";

const MeetingContext=createContext();

export  function MeetingProvider({children}){
    const [events,setEvents]=useState([{
        title:"",
        start: new Date(2025, 5, 14, 10, 0),
        end: new Date(2025, 5, 14, 11, 0),
}])
    const addMeeting=(meeting)=>{
        setEvents((prev)=>[...prev,meeting]);
    }
    return(
        <MeetingContext.Provider value={{events,addMeeting}}>
            {children}
        </MeetingContext.Provider>
    );

}

export function useMeetings(){
    return useContext(MeetingContext);
}