import React, { useEffect } from "react";
import { ThemeSwitch } from "../themeSwitch/themeSwitch";

import styles from "./navbar.module.scss";

export function NavBar({ theme, setTheme }) {
    return (
        <nav className={styles.navbar}>
            <h3>Wordle</h3>
            <ThemeSwitch theme={theme} setTheme={setTheme} />
        </nav>
    );
}
