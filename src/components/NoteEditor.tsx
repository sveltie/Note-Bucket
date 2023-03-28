import { useEffect, ChangeEvent } from "react";
import useAutoScroll from "../hooks/useAutoScroll";
import Clock from "./Clock";
import countWords from "../utils/countWords";
import { INoteEditorProps } from "../interfaces";
import Showdown from "showdown";
import DOMPurify from "dompurify";
import { FaRegEdit } from "react-icons/fa";
import { MdLabelOutline } from "react-icons/md";

const NoteEditor = ({
    currentNote,
    updateNote,
    updateNoteTitle,
}: INoteEditorProps) => {
    const sanitizer = DOMPurify.sanitize;
    const previewRef = useAutoScroll(currentNote.body);
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
        smoothLivePreview: true,
        simpleLineBreaks: true,
        parseImgDimensions: true,
        openLinksInNewWindow: true,
        ghCodeBlocks: true,
        emoji: true,
        metadata: true,
    });
    const noteBodyHTML = converter.makeHtml(currentNote.body);
    const noteBodySanitized = sanitizer(noteBodyHTML);

    useEffect(() => {
        DOMPurify.addHook("afterSanitizeAttributes", function (node) {
            // set all elements owning target to target=_blank
            if ("target" in node) {
                node.setAttribute("target", "_blank");
                node.setAttribute("rel", "noopener");
            }
        });
    }, []);

    const handleTextArea = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        updateNote(event.target.value);
    };

    const handeTitle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        updateNoteTitle(event.target.value);
    };

    return (
        <div className="editor">
            <div className="editor-menu">
                <FaRegEdit className="editor-ico" />
                <form className="title-form">
                    <textarea
                        className="editor-title"
                        value={currentNote.title}
                        onChange={handeTitle}
                        maxLength={1}
                        placeholder="Enter Note Title"
                    ></textarea>
                </form>
                <div className="editor-note-label">
                    <MdLabelOutline className="label-ico" />
                    <ul>
                        <li>Markdown</li>
                    </ul>
                </div>
            </div>
            <div className="editor-text">
                <form className="editor-text-form">
                    <div className="counter">
                        Editing |{" "}
                        {`${countWords(currentNote.body)} words / ${
                            currentNote.body.length
                        } characters`}
                    </div>
                    <textarea
                        value={currentNote.body}
                        onChange={handleTextArea}
                        className="editor-textarea"
                    ></textarea>
                </form>
                <div ref={previewRef} className="editor-edit-preview">
                    <Clock />
                    <div
                        className="editor-preview"
                        dangerouslySetInnerHTML={{
                            __html: noteBodySanitized,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
