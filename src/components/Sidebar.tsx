import { ISidebarProps } from "../interfaces";
import {
    MdNotes,
    MdSearch,
    MdAdd,
    MdArrowDropDown,
    MdSettings,
} from "react-icons/md";

const Sidebar = ({
    darkTheme,
    notes,
    addNewNote,
    currentNote,
    setCurrentNoteId,
    deleteNote,
}: ISidebarProps) => {
    const sideBarItemMap = notes.map((note) => {
        const noteBody = note.body
            .split("\n")
            .slice(0, 6)
            .map((s) => s.replace(/[^A-Za-z0-9']/g, " "));
        const noteBodyClean = noteBody.filter((s) => s != "");
        return (
            <div
                onClick={() => setCurrentNoteId(note.id)}
                key={note.id}
                className={`sidebar-note ${
                    note.id === currentNote.id ? "selected-note" : ""
                }`}
            >
                <small>
                    <p className="sidebar-note-date">{note.dateCreated}</p>
                </small>
                {note.title.length > 0 ? (
                    <p className="sidebar-note-title">{note.title}</p>
                ) : (
                    <p
                        style={{ color: "transparent" }}
                        className="sidebar-note-title"
                    >
                        "a"
                    </p>
                )}
                <div className="sidebar-note-label">
                    <ul>
                        <li>Markdown</li>
                    </ul>
                </div>
                <p className="sidebar-note-description">{noteBodyClean}</p>
                <button
                    onClick={(event) => deleteNote(event, note.id)}
                    className="sidebar-note-delete"
                >
                    Delete
                </button>
            </div>
        );
    });
    return (
        <div className={darkTheme ? "sidebar dark" : "sidebar light"}>
            <div className="sidebar-header">
                <MdNotes className="sidebar-logo" />
                <p>NoteBucket</p>
            </div>
            <div onClick={addNewNote} className="sidebar-section">
                <MdAdd className="sidebar-ico" />
                <p>Add Note</p>
            </div>
            <div className="sidebar-section">
                <MdSearch className="sidebar-ico" />
                <p>Search Note</p>
            </div>
            <div className="sidebar-section selected">
                <MdArrowDropDown className="sidebar-ico" />
                <p>All Notes</p>
            </div>
            {notes.length > 0 ? (
                sideBarItemMap
            ) : (
                <p className="no-note">No Notes...</p>
            )}
            <div className="user-account">
                <img src="https://cdn.discordapp.com/attachments/874641868846149722/1064195611970256966/FmTh0eSWAAERtmX_1.png" />
                <div>
                    <p>Minttu</p>
                    <p style={{ fontSize: "0.75rem", opacity: "0.7" }}>#0001</p>
                </div>
                <MdSettings className="account-ico" />
            </div>
        </div>
    );
};

export default Sidebar;
