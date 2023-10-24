import React, {useEffect, useRef, useState} from "react";
import DOMPurify from "dompurify";
import './CSS/JournalPage.css';
import sqlDao from "./DAL/SqlDao";

const JournalPage = ({username, journalDate, onSave}) => {

    const [content, setContent] = useState('');

    const clearEntry = async () => {
      try {
          const affectedRows = await sqlDao.deleteJournalEntry(username, journalDate);
          if (affectedRows != 1) {
              setContent('');
          } else {
              console.log("Entry not found");
          }
      } catch (error) {
          console.error("Error clearing entry:", error);
      }
    };

    // Function to save the content

    const save = async () => {
      try {
        const sanitizedContent = DOMPurify.sanitize(content, {
            FORBID_TAGS: ['a'], // Remove <a> tags
        });

        let affectedRows = await sqlDao.updateJournalEntry(username, journalDate, sanitizedContent);

        if (affectedRows != 1) {
            affectedRows = await sqlDao.createJournalEntry(username, journalDate, sanitizedContent);
        }

        // Call the onSave callback after saving
        if (onSave) {
            onSave();
        }
      } catch (error) {
          console.error("Error saving entry:", error);
      }
    };

    useEffect(() => {

      const loadEntry = async () => {
        try {
            const entries = await sqlDao.findJournalEntries(username);
            const entry = entries.find(entry => entry.JournalDate === journalDate);
            if (entry) {
                setContent(entry.JournalText);
            }
        } catch (error) {
            console.error("Error loading entry:", error);
        }
    };

      loadEntry();
    }, [journalDate, username]);

    return (
        <div className="MainTextArea">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="editable-textarea"
          ></textarea>

         <button onClick={clearEntry}>Clear</button>
         <button onClick={save}>Save</button>
        </div>
      );

};

export default JournalPage;
