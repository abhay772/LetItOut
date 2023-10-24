import React, {useEffect, useRef, useState} from "react";
import DOMPurify from "dompurify";
import './CSS/JournalPage.css';
import sqlDao from "./DAL/SqlDao";

const JournalPage = ({username, journalDate, onSave}) => {

    const [content, setContent] = useState('');

    const clearEntry = () => {
      const affectedRows = sqlDao.deleteJournalEntry(username, journalDate);
      if (affectedRows != 1) {
        setContent('');
      } else {
        console.log("Entry not found");
      }
    }

    // Function to save the content

    const save = () => {
        const sanitizedContent = DOMPurify.sanitize(content, {
            FORBID_TAGS: ['a'], // Remove <a> tags
        });

        const affectedRows = sqlDao.updateJournalEntry(username, journalDate, content);

        if (affectedRows != 1)
        {
          affectedRows = sqlDao.createJournalEntry(username, journalDate, content);
        }

        // Call the onSave callback after saving
        if (onSave) {
          onSave();
        }
      };

    useEffect(() => {
        
        // Loading the saved journal
        const savedText = localStorage.getItem(localStorageKey);

        if (savedText) {
            setContent(savedText);
        };
    }, [journalDate, localStorageKey]);

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
