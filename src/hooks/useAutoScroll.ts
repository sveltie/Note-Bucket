import { useEffect, useRef } from "react";

const useAutoScroll = (depedency: any) => {
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const domNode = previewRef.current;

        if (domNode) {
            domNode.scrollTop = domNode.scrollHeight;
        }
    }, [depedency]);

    return previewRef;
};

export default useAutoScroll;
