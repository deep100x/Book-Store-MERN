import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ShowBook from "./pages/ShowBook"
import DeleteBook from "./pages/DeleteBook"
import CreateBook from "./pages/CreateBook"
import EditBook from "./pages/EditBook"

import { FiSun, FiMoon } from "react-icons/fi"

const App = () => {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
		localStorage.setItem("theme", theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
	}

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white pt-10 transition-all">
			<button onClick={toggleTheme} className="bg-blue-500 text-white p-2 rounded fixed right-2 top-2">
				{theme === "dark" ? <FiMoon className="size-5" /> : <FiSun className="size-5" />}
			</button>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/books/details/:id" element={<ShowBook />} />
				<Route path="/books/delete/:id" element={<DeleteBook />} />
				<Route path="/books/create" element={<CreateBook />} />
				<Route path="/books/edit/:id" element={<EditBook />} />
			</Routes>
		</div>
	)
}

export default App
