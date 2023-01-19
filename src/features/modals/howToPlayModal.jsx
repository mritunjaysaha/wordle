import React from "react";

import styles from "./howToPlayModal.module.scss";

export function HowToPlayModal({ setShowHints }) {
    const isDarkTheme = JSON.parse(localStorage.getItem("isDark"));

    return (
        <section
            className={`${styles.modal_container} ${
                isDarkTheme ? styles.modal_dark : styles.modal_light
            }`}
            onClick={(e) => {
                setShowHints(false);
            }}
        >
            <div
                className={styles.modal}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <button
                    className={styles.modal_close}
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowHints(false);
                    }}
                >
                    &times;
                </button>
                <header>
                    <h3>How To Play</h3>
                    <h4>Guess the Wordle in 6 tries</h4>
                </header>

                <ul>
                    <li>Each guess must be a valid 5-letter word.</li>
                    <li>
                        The color of the tiles will change to show how close
                        your guess was to the word.
                    </li>
                </ul>

                <div className={styles.modal_examples}>
                    <p className={styles.modal_examples_bold}>Examples</p>

                    <div className={styles.modal_individual_examples}>
                        <div className={styles.modal_row}>
                            {["w", "e", "a", "r", "y"].map((ch, index) => (
                                <div
                                    key={index}
                                    className={`${styles.modal_cell} ${
                                        index === 0 ? styles.modal_green : ""
                                    }`}
                                >
                                    {ch.toUpperCase()}
                                </div>
                            ))}
                        </div>
                        <p>
                            <span>W</span> is in the word and in the correct
                            spot.
                        </p>
                    </div>

                    <div className={styles.modal_individual_examples}>
                        <div className={styles.modal_row}>
                            {["p", "i", "l", "l", "s"].map((ch, index) => (
                                <div
                                    key={index}
                                    className={`${styles.modal_cell} ${
                                        index === 1 ? styles.modal_yellow : ""
                                    }`}
                                >
                                    {ch.toUpperCase()}
                                </div>
                            ))}
                        </div>
                        <p>
                            <span>I</span> is in the word but in the wrong spot.
                        </p>
                    </div>

                    <div className={styles.modal_individual_examples}>
                        <div className={styles.modal_row}>
                            {["v", "g", "a", "u", "e"].map((ch, index) => (
                                <div
                                    className={`${styles.modal_cell} ${
                                        index === 3 ? styles.modal_grey : ""
                                    }`}
                                >
                                    {ch.toUpperCase()}
                                </div>
                            ))}
                        </div>
                        <p>
                            <span>U</span> is not in the word in any spot
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
