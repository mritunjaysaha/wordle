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
            <Helmet>
                <meta charSet="utf-8" />
                <title>Wordle</title>
                <meta property="og:title" content="Wordle" />
                <meta
                    property="og:description"
                    content="Guess a 5 letter word in 6 tries"
                />
                <meta
                    property="og:image"
                    content="https://static.tnn.in/thumb/msid-96634355,imgsize-491555,width-450,height-250,false/96634355.jpg"
                />
                <meta
                    property="og:url"
                    content="https://wordle-eta.vercel.app/"
                />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="Wordle | Mritunjay" />
            </Helmet>
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
