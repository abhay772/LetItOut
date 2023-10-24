import React, { useEffect, useState } from "react";
import JournalPage from "./JournalPage";
import sqlDao from "./DAL/SqlDao";  // Import sqlDao
import "./CSS/App.css"

const currentDate = new Date();

const App = () => {

  // Assume a username for now. In a real application, you would get this from user authentication.
  const username = "user123";

  // State to keep track of the currently selected date
  const [selectedDate, setSelectedDate] = useState(currentDate.toLocaleDateString());
  
  // State to store the list of dates with journals from the database
  const [journalDates, setJournalDates] = useState([]);

  const refreshJournalDates = async () => {
    try {
      const entries = await sqlDao.findJournalEntries(username);
      const dates = entries.map(entry => entry.JournalDate);
      setJournalDates(dates.reverse());
    } catch (error) {
      console.error("Error refreshing journal dates:", error);
    }
  };

  // useEffect hook to populate journalDates from the database when component mounts
  useEffect(() => {
    refreshJournalDates();
  }, []);

  return (
    <div>
      <div className="header">
        <h1> Let It Out</h1>
      </div>

      {/* Sidebar displaying dates with journals */}
      <div className="sidebar">
        {journalDates.map(date => (
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
        <JournalPage username={username} journalDate={selectedDate} onSave={refreshJournalDates}/>
      </div>

    </div>
  );
};

export default App;


// return (
//   <div>
//     <div className="header">
//       <h1> Let It Out</h1>
//     </div>

//     {/* Sidebar displaying dates with journals */}
//     <div className="sidebar">
//       {journalDate.map(date => (
//         // When a date is clicked, update the selectedDate state 
//         // to load the corresponding journal
//         <p key={date} onClick={() => setSelectedDate(date)}>
//           {date}
//         </p>
//       ))}
//     </div>

//     {/* Main content area to display the journal of the selected date */}
//     <div className="main-content">      
//       <h1>{currentDate.toLocaleDateString()} - Journal</h1>
//       <JournalPage journalDate={selectedDate} onSave={() => refreshJournalDate()}/>
//     </div>

//   </div>
// );