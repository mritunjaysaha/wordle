import React, { useEffect } from "react";
import { ThemeSwitch } from "../themeSwitch/themeSwitch";

import { BsGear } from "react-icons/bs";

import styles from "./navbar.module.scss";

export function NavBar({ theme, setTheme, setShowHints }) {
    return (
        <nav className={styles.navbar}>
            <h3>Wordle</h3>
            <div className={styles.buttons_container}>
                <button
                    className={styles.hints_button}
                    onClick={() => {
                        setShowHints((prev) => !prev);
                    }}
                >
                    <BsGear size={24} />
                </button>

                <ThemeSwitch theme={theme} setTheme={setTheme} />
            </div>
        </nav>
    );
}
