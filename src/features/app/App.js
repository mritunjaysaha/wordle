import React, { useState } from "react";

import { NavBar } from "../navbar/navbar";

import "../../styles/index.scss";
import { BsBackspace } from "react-icons/bs";

function Matrix({ rows, columns }) {
    const matrix = Array(rows)
        .fill(null)
        .map(() => Array(columns).fill(null));

    return (
        <div className="matrix_container">
            {matrix.map((row, i) => (
                <div key={i} className="matrix_row">
                    {row.map((col, j) => (
                        <div key={j} className="matrix_cell"></div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function Keyboard() {
    const keyboardArr = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", <BsBackspace size={20} />],
    ];

    const handleClick = (e) => {
        const key = e.target.innerText;

        console.log({ key });
    };

    const handleKeyDown = (e) => {
        const key = e.key;

        console.log("handle key down", { key });
    };

    return (
        <div
            className="keyboard_container"
            onKeyDown={handleKeyDown}
            tabIndex="0"
        >
            <div>
                {keyboardArr[0].map((ch, index) => (
                    <button
                        key={index}
                        className="keyboard_keys"
                        onClick={handleClick}
                    >
                        {ch}
                    </button>
                ))}
            </div>
            <div>
                {keyboardArr[1].map((ch, index) => (
                    <button
                        key={index}
                        className="keyboard_keys"
                        onClick={handleClick}
                    >
                        {ch}
                    </button>
                ))}
            </div>
            <div>
                {keyboardArr[2].map((ch, index) => (
                    <button
                        key={index}
                        className="keyboard_keys"
                        onClick={handleClick}
                    >
                        {ch}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function App() {
    const [theme, setTheme] = useState("dark");

    return (
        <div className={`app ${theme}_theme`}>
            <NavBar />
            <Matrix rows={6} columns={5} />
            <Keyboard />
        </div>
    );
}
