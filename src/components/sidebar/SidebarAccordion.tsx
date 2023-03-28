import {
    Text,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
} from "@chakra-ui/react";
import { Component } from "react";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

interface ISidebarAccordion {
    text: string;
    component: JSX.Element | JSX.Element[];
}

const SidebarAccordion = (props: ISidebarAccordion) => {
    const { text, component } = props;

    return (
        <AccordionItem>
            {({ isExpanded }) => (
                <>
                    <p>
                        <AccordionButton
                            className="accordion-button sidebar-item"
                            alignItems="center"
                            bg="transparent"
                            padding="10px 15px"
                            border="none"
                        >
                            {isExpanded ? (
                                <IoMdArrowDropright className="icon-medium" />
                            ) : (
                                <IoMdArrowDropdown className="icon-medium" />
                            )}
                            <Text
                                fontSize="0.9rem"
                                fontWeight="500"
                                marginLeft="15px"
                            >
                                {text}
                            </Text>
                        </AccordionButton>
                    </p>
                    <AccordionPanel padding="0">{component}</AccordionPanel>
                </>
            )}
        </AccordionItem>
    );
};

export default SidebarAccordion;
