import { Flex } from "@chakra-ui/react";
import Sidebar from "./components/sidebar/Sidebar";
import Editor from "./components/editor/Editor";
import "./styles/App.scss";

import useNotes from "./hooks/useNotes";
import useDarkTheme from "./hooks/useDarkTheme";

const App = () => {
    const {
        notes,
        currentNoteId,
        addNewNote,
        setCurrentNoteId,
        getCurrentNote,
        deleteNote,
        updateNote,
        updateNoteTitle,
    } = useNotes();
    const { darkTheme, toggleDarkTheme } = useDarkTheme();
    

    return (
        <Flex className="App light">
            <Sidebar
                darkTheme={darkTheme}
                notes={notes}
                addNewNote={addNewNote}
                currentNote={getCurrentNote()}
                setCurrentNoteId={setCurrentNoteId}
                deleteNote={deleteNote}
            />
            {currentNoteId && notes.length > 0 && (
                <Editor
                    currentNote={getCurrentNote()}
                    notes={notes}
                    updateNote={updateNote}
                    updateNoteTitle={updateNoteTitle}
                />
            )}
        </Flex>
    );
};

export default App;
