import React, { useState } from "react"

import "../../styles/index.scss"

export default function App() {

    const [theme, setTheme] = useState("dark")

    return <div className={`app ${theme}_theme`}>App</div>
}