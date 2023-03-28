import { useEffect, useState } from "react";

const useDarkTheme = () => {
    const [darkTheme, setDarkTheme] = useState<boolean>(
        () => JSON.parse(localStorage.getItem("theme") || "false") || false
    );

    const toggleDarkTheme = () => {
        setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    };

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(darkTheme));
    }, [darkTheme]);

    return {
        darkTheme,
        toggleDarkTheme,
    };
};

export default useDarkTheme;
