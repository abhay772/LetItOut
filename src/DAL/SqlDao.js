import { sql } from "@vercel/postgres";

const findJournalEntries = async (username) => {
    try {   
        const query = sql`SELECT JournalDate, JournalText FROM Journals WHERE Username = ${username};`;
        const {rows} = await query;
        return rows;
    } catch (error) {
        console.error("Error finding journal entries:", error);
        throw error;
    }
}

const updateJournalEntry = async (username, journalDate, journalText) => {
    try {    
        const query = sql`UPDATE Journals SET JournalText = ${journalText} WHERE Username = ${username} AND JournalDate = ${journalDate} RETURNING *;`;
        const {rows} = await query;
        return rows[0];
    } catch (error) {
        console.error("Error updating journal entry:", error);
        throw error;
    }
}

const createJournalEntry = async (username, journalDate, journalText) => {
    try {    
        const query = sql`INSERT INTO Journals (Username, JournalDate, JournalText) VALUES (${username}, ${journalDate}, ${journalText}) RETURNING *;`;
        const {rows} = await query;
        return rows[0];
    } catch (error) {
        console.error("Error creating journal entry:", error);
        throw error;
    }
}

const deleteJournalEntry = async (username, journalDate) => {
    try {    
        const query = sql`DELETE FROM Journals WHERE Username = ${username} AND JournalDate = ${journalDate} RETURNING *;`;
        const {rows} = await query;
        return rows[0];
    } catch (error) {
        console.error("Error deleting journal entry:", error);
        throw error;
    }
}

const sqlDao = {
    findJournalEntries,
    updateJournalEntry,
    createJournalEntry,
    deleteJournalEntry
};

export default sqlDao;