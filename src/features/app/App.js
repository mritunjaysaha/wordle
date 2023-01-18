import React, { useEffect, useRef, useState } from "react";

import { NavBar } from "../navbar/navbar";

import "../../styles/index.scss";
import { BsBackspace } from "react-icons/bs";

const WORD_LENGTH = 5;

const wordOfTheDay = "WIPED";

const keyboardArr = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const fetchWord = (word) => {
    return fetch(`${API_URL}/${word}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.log("err:", err));
};

const allKeys = keyboardArr.flat();

export default function App() {
    let letterIndex = useRef(0);
    let round = useRef(0);

    const [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem("isDark")) ? "dark" : "light"
    );

    const [guesses, setGuesses] = useState({
        0: Array.from({ length: WORD_LENGTH }).fill(""),
        1: Array.from({ length: WORD_LENGTH }).fill(""),
        2: Array.from({ length: WORD_LENGTH }).fill(""),
        3: Array.from({ length: WORD_LENGTH }).fill(""),
        4: Array.from({ length: WORD_LENGTH }).fill(""),
        5: Array.from({ length: WORD_LENGTH }).fill(""),
    });

    const [markers, setMarkers] = useState({
        0: Array.from({ length: WORD_LENGTH }).fill(""),
        1: Array.from({ length: WORD_LENGTH }).fill(""),
        2: Array.from({ length: WORD_LENGTH }).fill(""),
        3: Array.from({ length: WORD_LENGTH }).fill(""),
        4: Array.from({ length: WORD_LENGTH }).fill(""),
        5: Array.from({ length: WORD_LENGTH }).fill(""),
    });

    const win = () => {
        console.log("winner");
    };

    const publish = (pressedKey) => {
        const _letterIndex = letterIndex.current;
        const _round = round.current;

        if (_letterIndex < WORD_LENGTH) {
            setGuesses((prev) => {
                const newGuesses = { ...prev };
                newGuesses[_round][_letterIndex] = pressedKey.toUpperCase();
                return newGuesses;
            });

            letterIndex.current = _letterIndex + 1;
        }
    };

    const enterGuess = async (pressedKey) => {
        if (pressedKey === "ENTER" && !guesses[round.current].includes("")) {
            const validWord = await fetchWord(guesses[round.current].join(""));

            if (Array.isArray(validWord)) {
                submit();
            }
        } else if (pressedKey === "BACKSPACE") {
            erase();
        } else if (pressedKey !== "ENTER") {
            publish(pressedKey);
        }
    };

    const erase = () => {
        const _letterIndex = letterIndex.current;
        const _round = round.current;

        if (_letterIndex !== 0) {
            setGuesses((prev) => {
                const newGuesses = { ...prev };
                newGuesses[_round][_letterIndex - 1] = "";
                return newGuesses;
            });

            letterIndex.current = _letterIndex - 1;
        }
    };

    const submit = () => {
        const _round = round.current;

        const updatedMarkers = {
            ...markers,
        };

        const tempWord = wordOfTheDay.split("");

        const leftoverIndices = [];

        tempWord.forEach((letter, index) => {
            const guessedLetter = guesses[_round][index];

            if (guessedLetter === letter) {
                updatedMarkers[_round][index] = "green";
                tempWord[index] = "";
            } else {
                leftoverIndices.push(index);
            }
        });

        if (updatedMarkers[_round].every((guess) => guess === "green")) {
            setMarkers(updatedMarkers);
            win();
            return;
        }

        if (leftoverIndices.length) {
            leftoverIndices.forEach((index) => {
                const guessedLetter = guesses[_round][index];
                const correctPositionOfLetter = tempWord.indexOf(guessedLetter);

                if (
                    tempWord.includes(guessedLetter) &&
                    correctPositionOfLetter !== index
                ) {
                    updatedMarkers[_round][index] = "yellow";
                    tempWord[correctPositionOfLetter] = "";
                } else {
                    updatedMarkers[_round][index] = "grey";
                }
            });
        }

        setMarkers(updatedMarkers);
        round.current = _round + 1;
        letterIndex.current = 0;
    };
    const handleKeyDown = (e) => {
        const pressedKey = e.key.toUpperCase();
        console.log({ pressedKey });
        if (allKeys.includes(pressedKey)) {
            enterGuess(pressedKey);
        }
    };

    const handleClick = (key) => {
        console.log(key);

        if (allKeys.includes(key)) {
            enterGuess(key);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className={`app ${theme}_theme`}>
            <NavBar theme={theme} setTheme={setTheme} />

            <div className="matrix_container">
                {Object.values(guesses).map((row, index) => (
                    <div key={index} className="matrix_row">
                        {row.map((letter, i) => (
                            <div
                                key={i}
                                className={`matrix_cell ${markers[index][i]}`}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="keyboard_container" tabIndex="0">
                <div>
                    {keyboardArr[0].map((ch, index) => (
                        <button
                            key={index}
                            className="keyboard_keys"
                            onClick={() => {
                                handleClick(ch);
                            }}
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
                            onClick={() => {
                                handleClick(ch);
                            }}
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
                            onClick={() => {
                                handleClick(ch);
                            }}
                        >
                            {ch === "BACKSPACE" ? <BsBackspace /> : ch}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
