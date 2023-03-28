import { useEffect, useState, MouseEvent } from "react";
import { INote } from "../interfaces";
import { nanoid } from "nanoid";

const useNotes = () => {
    const [notes, setNotes] = useState<INote[]>(
        () => JSON.parse(localStorage.getItem("notes") || "") || []
    );

    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    );

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNewNote = (): void => {
        const date = new Date();
        const currentDate = date.toLocaleDateString();
        const newNote = {
            id: nanoid(),
            title: "Untitled Note",
            dateCreated: currentDate,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales sem a vestibulum facilisis.",
            body: `# Untitled Note\n___\n\n[Markdown guide](https://www.markdownguide.org/)\n\n>${"`(you can delete this template.)`"}`,
        } satisfies INote;
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    };

    const getCurrentNote = (): INote => {
        return (
            notes.find((note) => {
                return note.id === currentNoteId;
            }) || notes[0]
        );
    };

    const deleteNote = (
        event: MouseEvent<HTMLButtonElement>,
        noteId: string
    ): void => {
        event.stopPropagation();
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    };

    const updateNote = (text: string): void => {
        // re-arange the recently update note to be at the top.
        setNotes((prevNotes) => {
            const newNotes = [];
            for (let i = 0; i < prevNotes.length; i++) {
                const prevNote = prevNotes[i];
                if (prevNote.id === currentNoteId) {
                    newNotes.unshift({ ...prevNote, body: text });
                } else {
                    newNotes.push(prevNote);
                }
            }
            return newNotes;
        });
    };

    const updateNoteTitle = (title: string): void => {
        // re-arange the recently update note to be at the top.
        setNotes((prevNotes) => {
            const newNotes = [];
            for (let i = 0; i < prevNotes.length; i++) {
                const prevNote = prevNotes[i];
                if (prevNote.id === currentNoteId) {
                    newNotes.unshift({ ...prevNote, title: title });
                } else {
                    newNotes.push(prevNote);
                }
            }
            return newNotes;
        });
    };

    return {
        notes,
        currentNoteId,
        addNewNote,
        setCurrentNoteId,
        getCurrentNote,
        deleteNote,
        updateNote,
        updateNoteTitle,
    };
};

export default useNotes;
