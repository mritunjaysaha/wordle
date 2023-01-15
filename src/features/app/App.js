import React, { useState } from "react"

import { NavBar } from "../navbar/navbar"

import "../../styles/index.scss"


function Matrix({ rows, columns }) {
    const matrix = Array(rows).fill(null).map(() => Array(columns).fill(null))

    return <div className="matrix_container">
        {matrix.map((row, i) => (
            <div key={i} className="matrix_row">
                {row.map((col, j) => (
                    <div key={j} className="matrix_cell"></div>
                )
                )}
            </div>
        ))}
    </div >
}

export default function App() {

    const [theme, setTheme] = useState("dark")

    return <div className={`app ${theme}_theme`}>
        <NavBar />
        <Matrix rows={6} columns={5} />
    </div>
}