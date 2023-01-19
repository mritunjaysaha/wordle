import React, { useState, useEffect, useRef } from "react";

import { BsBackspace } from "react-icons/bs";

import "../../styles/index.scss";

const WORD_LENGTH = 5;

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

const wordList = [
    "WIPER",
    "WIPED",
    "RIDER",
    "RACER",
    "ENTER",
    "LINUX",
    "STEAM",
    "LUCKY",
    "CHAMP",
    "SILKY",
    "STICK",
    "CHURN",
    "CHEAT",
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function ResultModal({ text }) {
    return <div className="result_modal">{text}</div>
}

export function Wordle() {
    let letterIndex = useRef(0);
    let round = useRef(0);

    const [isWinner, setIsWinner] = useState(false)
    const [isLost, setIsLost] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleModal = (type) => {

        switch (type) {
            case "win":
                setIsWinner(true)
                setTimeout(() => {
                    setIsWinner(false)
                }, 2000)
                return;
            case "lost":
                setIsLost(true)
                setTimeout(() => {
                    setIsLost(false)
                }, 2000)
                return;

            case "error":
                setIsError(true);
                setTimeout(() => {
                    setIsError(false)
                }, 2000)
        }
    }

    const [wordOfTheDay, setWordOfTheDay] = useState("");

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

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        setWordOfTheDay(wordList[getRandomInt(wordList.length)]);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    console.log("wordle mounted", { wordOfTheDay });

    const win = () => {
        handleModal("win")
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
            } else {
                handleModal("error")
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

        if (round.current >= 6) {
            loss();
        }
    };

    const loss = () => {
        handleModal("lost")
    };

    const handleKeyDown = (e) => {
        const pressedKey = e.key.toUpperCase();
        if (allKeys.includes(pressedKey)) {
            console.log({ pressedKey });
            enterGuess(pressedKey);
        }
    };

    const handleClick = (key) => {
        console.log(key);

        if (allKeys.includes(key)) {
            enterGuess(key);
        }
    };

    return (
        <div>
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

            {isWinner && <ResultModal info="Congratulations!!!" />}
            {isLost && <ResultModal text={wordOfTheDay} />}
            {isError && <ResultModal text="Not a word" />}
        </div>
    );
}
