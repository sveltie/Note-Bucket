import { MouseEventHandler } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

interface ISidebarItem {
    icon: any;
    onClick?: MouseEventHandler<HTMLDivElement>;
    text: string;
}

const SidebarItem = (props: ISidebarItem) => {
    const { icon, onClick, text } = props;

    return (
        <Flex className="sidebar-item" alignItems="center" padding="10px 15px">
            <>{icon}</>
            <Text
                onClick={onClick}
                fontSize="0.9rem"
                fontWeight="500"
                marginLeft="15px"
            >
                {text}
            </Text>
        </Flex>
    );
};

export default SidebarItem;
