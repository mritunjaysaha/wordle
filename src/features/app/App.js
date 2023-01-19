import React, { useEffect, useState } from "react";

import { NavBar } from "../navbar/navbar";

import "../../styles/index.scss";

import { HowToPlayModal } from "../modals/howToPlayModal";
import { Wordle } from "../wordle/wordle";
import { Helmet } from "react-helmet";

export default function App() {
    const [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem("isDark")) ? "dark" : "light"
    );

    const [showHints, setShowHints] = useState(false);

    useEffect(() => {
        console.log({ showHints });
    }, [showHints]);

    return (
        <div className={`app ${theme}_theme`}>
            <Helmet></Helmet>
            <NavBar
                theme={theme}
                setTheme={setTheme}
                setShowHints={setShowHints}
            />

            <Wordle />

            {showHints && <HowToPlayModal setShowHints={setShowHints} />}
        </div>
    );
}
