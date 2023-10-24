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
        const query = sql`update Journals set JournalText = $(journalText) where Username = $(username) and JournalDate = $(journalDate) returning *;`;
        const {affectedRows} = await query;
        return affectedRows[0];

    } catch (error) {

        console.error("Error finding journal entries:", error);
        throw error;
    }
}

const createJournalEntry = async (username, journalDate, journalText) => {

    try {    
        const query = sql`insert into Journals (Username, JournalDate, JournalText) values ($(username), $(journalDate), $(journalText)) returning *;`;
        const {affectedRows} = await query;
        return affectedRows[0];

    } catch (error) {
        
        console.error("Error finding journal entries:", error);
        throw error;
    }
}

const deleteJournalEntry = async (username, journalDate) => {

    try {    
        const query = sql`delete Journals where Username = $(username) and JournalDate = $(journalDate) returning *;`;
        const {affectedRows} = await query;
        return affectedRows[0];

    } catch (error) {
        
        console.error("Error finding journal entries:", error);
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