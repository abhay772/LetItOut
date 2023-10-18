import React, {useState} from "react";

const EntryComponent = ({ addEntry }) => {
    const [text, setText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        addEntry(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Write your journal entry here..."
            />

            <button type="submit">Add Entry</button>
        </form>
    );
};

export default EntryComponent;