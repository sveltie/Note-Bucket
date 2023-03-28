import { Flex, Text, Box, useToast } from "@chakra-ui/react";
import { MdOutlineAddBox, MdSearch, MdLabelOutline } from "react-icons/md";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { Accordion } from "@chakra-ui/react";
import { GrStatusGoodSmall } from "react-icons/gr";

import { ISidebarProps } from "../../interfaces";
import SidebarItem from "./SidebarItem";
import SidebarAccordion from "./SidebarAccordion";
import SidebarNote from "./SidebarNote";

import { Avatar, AvatarBadge, AvatarGroup, Stack } from "@chakra-ui/react";

const Sidebar = (props: ISidebarProps) => {
    const { addNewNote, currentNote } = props;
    const toast = useToast();

    return (
        <Flex className="sidebar" width="200px" flexDirection="column">
            <Flex padding="15px 15px">
                <Text fontSize="1.25rem" fontWeight="600">
                    NoteBucket
                </Text>
            </Flex>
            <SidebarItem
                icon={<MdOutlineAddBox className="icon-medium" />}
                onClick={(
                    event: React.MouseEvent<HTMLDivElement, MouseEvent>
                ) => {
                    addNewNote(event);
                    toast({
                        position: "bottom-right",
                        duration: 4000,
                        render: () => (
                            <Box
                                className="alert-blue"
                                padding="15px 20px"
                                color="white"
                                borderRadius="7px"
                            >
                                Added New Note!
                            </Box>
                        ),
                    });
                }}
                text={"Add Note"}
            />
            <SidebarItem
                icon={<MdSearch className="icon-medium" />}
                text={"Search Note"}
            />
            <Accordion allowMultiple>
                <SidebarAccordion
                    text={"All Notes"}
                    component={<SidebarNote {...props} />}
                />
            </Accordion>
            <Flex
                marginTop="auto"
                padding="10px"
                bg="gray.50"
                alignItems="center"
            >
                <Stack direction="row" spacing={4}>
                    <Avatar
                        width="2rem"
                        height="2rem"
                        src="https://cdn.discordapp.com/attachments/874641868846149722/1064195611970256966/FmTh0eSWAAERtmX_1.png"
                    >
                        <AvatarBadge boxSize="1rem" bg="green.500" />
                    </Avatar>
                </Stack>
                <Flex marginLeft="10px" flexDir="column">
                    <Text fontSize="0.85rem" fontWeight="500">
                        Minttu
                    </Text>
                    <Text fontSize="0.7rem">#0001</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Sidebar;
