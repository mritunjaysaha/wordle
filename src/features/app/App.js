import React, { useState } from "react"

import { NavBar } from "../navbar/navbar"

import "../../styles/index.scss"

export default function App() {

    const [theme, setTheme] = useState("dark")

    return <div className={`app ${theme}_theme`}>
        <NavBar />
    </div>
}