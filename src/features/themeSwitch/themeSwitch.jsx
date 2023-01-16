import React, { useState } from "react";

import styles from "./theme.module.scss";

export function ThemeSwitch({ theme, setTheme }) {
    console.log("[ThemeSwitch]", { theme });
    const [isDark, setIsDark] = useState(
        !theme || theme === "dark" ? true : false
    );

    return (
        <div className={styles.theme_switch}>
            <input
                id="checkbox"
                type="checkbox"
                checked={isDark}
                className={styles.checkbox}
                onChange={() => {
                    setIsDark(!isDark);
                    localStorage.setItem("isDark", JSON.stringify(!isDark));

                    setTheme(!isDark ? "dark" : "light");
                }}
            />
            <label htmlFor="checkbox" className={styles.label}>
                <div
                    className={`${styles.ball} ${
                        isDark === true ? styles.ball_dark : styles.ball_light
                    }`}
                ></div>
            </label>
        </div>
    );
}
