import React, { useState } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const DeleteBook = () => {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()
	const handleDeleteBook = () => {
		setLoading(true)
		axios
			.delete(`http://localhost:8069/books/${id}`)
			.then(() => {
				setLoading(false)
				navigate("/")
			})
			.catch((error) => {
				setLoading(false)
				alert("An error happened. Please check console.")
				console.log(error)
			})
	}

	return (
		<>
			<BackButton />
			<h1 className="text-3xl font-bold mb-6 text-center">Delete Book</h1>
			{loading ? <Spinner /> : ""}
			<div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
				<h3 className="text-2xl">Are you Sure You want to delete this book?</h3>
				<button onClick={handleDeleteBook} className="p-4 text-2xl bg-red-600 m-8 w-full text-white">
					Yes, Delete it
				</button>
			</div>
		</>
	)
}

export default DeleteBook
