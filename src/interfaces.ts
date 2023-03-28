import { MouseEventHandler, MouseEvent } from "react";

export interface INote {
    id: string;
    title: string;
    dateCreated: string;
    description: string;
    body: string;
}

export interface INavbarProps {
    darkTheme: boolean;
    toggleDarkTheme: MouseEventHandler<HTMLDivElement>;
}

export interface ISidebarProps {
    darkTheme: boolean;
    currentNote: INote;
    notes: INote[];
    addNewNote: MouseEventHandler<HTMLDivElement>;
    setCurrentNoteId: React.Dispatch<React.SetStateAction<string>>;
    deleteNote: (event: MouseEvent<HTMLButtonElement>, noteId: string) => void;
}

export interface INoteEditorProps {
    currentNote: INote;
    notes: INote[];
    updateNote: (text: string) => void;
    updateNoteTitle: (title: string) => void;
}
