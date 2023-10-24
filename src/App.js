import React, { useEffect, useState } from "react";
import JournalPage from "./JournalPage";
import "./CSS/App.css"

const currentDate = new Date();

const  App = () => {

  // State to keep track of the currently selected date
  const [selectedDate, setSelectedDate] = useState(currentDate.toLocaleDateString());
  
  // State to store the list of dates with journals in the local storage
  const [journalDate, setJournalDates] = useState([]);

  const refreshJournalDate = () => {
    let dates = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith("journalText-")) {
        dates.push(localStorage.key(i).replace("journalText-",""));
      }
    }
  
    setJournalDates(dates.reverse());
  };

  // useEffect hook to populate journalDate from local storage when component mounts
  useEffect(() => {

    let dates = [];
    for(let i=0; i < localStorage.length; i++) {

      // Check if a key in local storage starts with "journalText-"
      if (localStorage.key(i).startsWith("journalText-")) {

        // If it does, add the date part of the key to the dates array
        dates.push(localStorage.key(i).replace("journalText-",""));
      }
    }
    // Update the state with fetched dates
    setJournalDates(dates.reverse())
  }, [])


  return (
    <div>
      <div className="header">
        <h1> Let It Out</h1>
      </div>

      {/* Sidebar displaying dates with journals */}
      <div className="sidebar">
        {journalDate.map(date => (
          // When a date is clicked, update the selectedDate state 
          // to load the corresponding journal
          <p key={date} onClick={() => setSelectedDate(date)}>
            {date}
          </p>
        ))}
      </div>

      {/* Main content area to display the journal of the selected date */}
      <div className="main-content">      
        <h1>{currentDate.toLocaleDateString()} - Journal</h1>
        <JournalPage journalDate={selectedDate} onSave={() => refreshJournalDate()}/>
      </div>

    </div>
  );
};

export default App;