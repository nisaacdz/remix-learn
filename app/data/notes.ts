import * as fs from 'fs/promises';
import { Note, Notebook } from '~/types/alltypes';

const dataFilePath = './saved.json';


const writeDataToFile = async (data: Notebook) => {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

async function fetchNotebook(): Promise<Notebook> {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading notebook data:', error);
        return { entries: [] };
    }
}

async function createNote(title: string, content: string): Promise<void> {
    const notebook = await fetchNotebook();
    const newNote: Note = {
        id: Date.now().toString(),
        title: title,
        content: content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    notebook.entries.push(newNote);
    await writeDataToFile(notebook);
}

async function updateNote(noteId: string, title: string, content: string): Promise<void> {
    const notebook = await fetchNotebook();
    const noteIndex = notebook.entries.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
        notebook.entries[noteIndex] = {
            ...notebook.entries[noteIndex],
            title,
            content,
            updatedAt: new Date().toISOString(),
        };
        await writeDataToFile(notebook);
    }
}


async function deleteNote(noteId: string): Promise<boolean> {
    const notebook = await fetchNotebook();
    const noteIndex = notebook.entries.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
        notebook.entries.splice(noteIndex, 1);
        await writeDataToFile(notebook);
        return true;
    }
    return false;
}

async function getNote(noteId: string): Promise<Note | null> {
    const notebook = await fetchNotebook();
    const noteIndex = notebook.entries.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
        return notebook.entries[noteIndex];
    }
    return null;
}

export { createNote, updateNote, deleteNote, fetchNotebook, getNote };
