import { useRef } from "react";
import {
    Flex,
    Text,
    Box,
    Button,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import { ISidebarProps } from "../../interfaces";
import { FaEllipsisH } from "react-icons/fa";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";

const SidebarNote = (props: ISidebarProps) => {
    const { notes, currentNote, setCurrentNoteId, deleteNote } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const toast = useToast();

    const noteList = notes.map((note) => {
        const noteBody = note.body
            .split("\n")
            .slice(0, 6)
            .map((s) => s.replace(/[^A-Za-z0-9']/g, " "));
        const noteBodyClean = noteBody.filter((s) => s != "");

        return (
            <Box
                onClick={() => setCurrentNoteId(note.id)}
                className={`note ${
                    note.id === currentNote.id ? "selected-note" : ""
                }`}
                key={note.id}
                padding="10px 15px"
            >
                <Flex alignItems="center" height="15px">
                    <Text fontSize="0.65rem">{note.dateCreated}</Text>
                    {note.id === currentNote.id ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                margin="0"
                                marginLeft="auto"
                                height="auto"
                                padding="0"
                                border="none"
                                borderRadius="10px"
                                fontSize="1rem"
                                cursor="pointer"
                                _hover={{ bg: "unset" }}
                                _active={{ bg: "unset" }}
                                marginRight="-10px"
                            >
                                <FaEllipsisH />
                            </MenuButton>
                            <MenuList
                                className="menu-list"
                                zIndex="10"
                                fontWeight="500"
                            >
                                <MenuItem
                                    border="none"
                                    bg="none"
                                    cursor="pointer"
                                >
                                    Pin Note
                                </MenuItem>
                                <MenuItem
                                    border="none"
                                    bg="none"
                                    cursor="pointer"
                                >
                                    Create a Copy
                                </MenuItem>
                                <MenuItem
                                    border="none"
                                    bg="none"
                                    cursor="pointer"
                                    onClick={onOpen}
                                >
                                    Delete Note
                                    <AlertDialog
                                        isOpen={isOpen}
                                        leastDestructiveRef={cancelRef}
                                        onClose={onClose}
                                    >
                                        <AlertDialogOverlay>
                                            <AlertDialogContent>
                                                <AlertDialogHeader
                                                    fontSize="lg"
                                                    fontWeight="bold"
                                                >
                                                    Delete Note
                                                </AlertDialogHeader>

                                                <AlertDialogBody>
                                                    Are you sure? You can't undo
                                                    this action afterwards.
                                                </AlertDialogBody>

                                                <AlertDialogFooter>
                                                    <Button
                                                        ref={cancelRef}
                                                        onClick={onClose}
                                                        border="none"
                                                        cursor="pointer"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        colorScheme="red"
                                                        border="none"
                                                        cursor="pointer"
                                                        onClick={(event) => {
                                                            onClose();
                                                            deleteNote(
                                                                event,
                                                                note.id
                                                            );
                                                            toast({
                                                                position:
                                                                    "bottom-right",
                                                                duration: 4000,
                                                                render: () => (
                                                                    <Box
                                                                        className="alert-red"
                                                                        padding="15px 20px"
                                                                        color="white"
                                                                        borderRadius="7px"
                                                                    >
                                                                        Successfully
                                                                        Deleted{" "}
                                                                        {
                                                                            note.title
                                                                        }
                                                                        !
                                                                    </Box>
                                                                ),
                                                            });
                                                        }}
                                                        ml={3}
                                                    >
                                                        Delete
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialogOverlay>
                                    </AlertDialog>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Box fontSize="1rem" opacity="0">
                            blank
                        </Box>
                    )}
                </Flex>
                {note.title.length > 0 ? (
                    <Text
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        fontSize="0.9rem"
                    >
                        {note.title}
                    </Text>
                ) : (
                    <Text opacity="0" fontSize="0.9rem">
                        Blank
                    </Text>
                )}
                <Flex>
                    <Box
                        className="note-label"
                        margin="7px 0"
                        fontSize="0.6rem"
                        padding="2px 7px"
                        borderRadius="20px"
                    >
                        Markdown
                    </Box>
                </Flex>
                <Box
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    fontSize="0.8rem"
                >
                    {noteBodyClean}
                </Box>
            </Box>
        );
    });

    return <>{noteList}</>;
};

export default SidebarNote;
