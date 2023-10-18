import React, {useEffect, useRef, useState} from "react";
import DOMPurify from "dompurify";
import './CSS/JournalPage.css';




const JournalPage = ({journalDate, onSave}) => {

    const localStorageKey = 'journalText-'+journalDate;
    const [content, setContent] = useState('');

    const clearStorage = () => {
      localStorage.removeItem(localStorageKey);
    }

    // Function to save the content

    const save = () => {
        const sanitizedContent = DOMPurify.sanitize(content, {
            FORBID_TAGS: ['a'], // Remove <a> tags
            });
    
        localStorage.setItem(localStorageKey, sanitizedContent);

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

         <button onClick={clearStorage}>Clear</button>
         <button onClick={save}>Save</button>
        </div>
      );

};

export default JournalPage;
