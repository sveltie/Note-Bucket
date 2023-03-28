import { useEffect, ChangeEvent } from "react";
import { Box, Flex, Text, Textarea, Input } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import Showdown from "showdown";
import { FiEdit } from "react-icons/fi";
import useAutoScroll from "../../hooks/useAutoScroll";
import Clock from "../Clock";
import countWords from "../../utils/countWords";
import { INoteEditorProps } from "../../interfaces";

const Editor = (props: INoteEditorProps) => {
    const { currentNote, updateNote, updateNoteTitle } = props;
    const autoScrollRef = useAutoScroll(currentNote.body);
    const sanitizer = DOMPurify.sanitize;
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

    const handleTitle = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        updateNoteTitle(event.target.value);
    };

    return (
        <Flex className="editor" flex="1" flexDirection="column" padding="10px">
            <Flex
                height="50px"
                alignItems="center"
                marginRight="5px"
                marginBottom="10px"
            >
                <Flex flex="1" alignItems="center" marginRight="5px">
                    <FiEdit fontSize="1.75rem" className="title-icon" />
                    <textarea
                        onChange={handleTitle}
                        value={currentNote.title}
                        maxLength={30}
                        className="title-edit"
                    ></textarea>
                </Flex>
                <Flex flex="1" marginLeft="5px"></Flex>
            </Flex>
            <Flex flex="1" height="0%">
                {/* <Textarea
                    border="none"
                    borderRadius="5px"
                    className="text-editor"
                    height="100%"
                    flex="1"
                    padding="10px"
                    marginRight="5px"
                    value={currentNote.body}
                    onChange={handleTextArea}
                /> */}
                <textarea
                    className="text-editor"
                    value={currentNote.body}
                    onChange={handleTextArea}
                ></textarea>
                <Box
                    ref={autoScrollRef}
                    flex="1"
                    borderRadius="5px"
                    padding="10px"
                    marginLeft="5px"
                    overflowX="hidden"
                    overflowY="scroll"
                    className="editor-preview"
                    dangerouslySetInnerHTML={{
                        __html: noteBodySanitized,
                    }}
                ></Box>
            </Flex>
            <Flex marginTop="8px" padding="2px" fontWeight="500">
                <Flex flex="1" alignItems="center" marginRight="5px">
                    <Text fontSize="0.75rem">Editing • (Auto Save)</Text>
                    <Text fontSize="0.75rem" marginLeft="auto">
                        {`${countWords(currentNote.body)} words / ${
                            currentNote.body.length
                        } characters`}
                    </Text>
                </Flex>
                <Flex flex="1" marginLeft="5px">
                    <Text fontSize="0.75rem">Preview • (Live)</Text>
                    <Clock />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Editor;
