import React, { useState, useEffect } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const EditBook = () => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [publishYear, setPublishYear] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		setLoading(true)
		axios
			.get(`http://localhost:8069/books/${id}`)
			.then((response) => {
				setTitle(response.data.title)
				setAuthor(response.data.author)
				setPublishYear(response.data.publishYear)
				setLoading(false)
			})
			.catch((error) => {
				setLoading(false)
				alert("An error happened. Please Check console")
				console.log(error)
			})
	}, [])

	const handleEditBook = () => {
		const data = {
			title,
			author,
			publishYear,
		}
		setLoading(true)
		axios
			.put(`http://localhost:8069/books/${id}`, data)
			.then(() => {
				setLoading(false)
				navigate("/")
			})
			.catch((error) => {
				setLoading(false)
				alert("An error happened. Please check console")
				console.log(error)
			})
	}

	return (
		<div>
			<BackButton />
			<h1 className="text-3xl font-bold mb-6 text-center">Edit Book</h1>
			{loading ? <Spinner /> : ""}
			<form className="w-full max-w-sm mx-auto mt-10">
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">Book Name :</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="w-full rounded text-black border-2 dark:border-transparent border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							placeholder="Jane Doe"
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">Author Name :</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="w-full rounded text-black border-2 dark:border-transparent border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							type="text"
							placeholder="Jane Doe"
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">Publish Year :</label>
					</div>
					<div className="md:w-2/3">
						<input
							type="number"
							name="name"
							value={publishYear}
							onChange={(e) => setPublishYear(e.target.value)}
							className="w-full rounded text-black border-2 dark:border-transparent border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							placeholder="2003"
							required
						/>
					</div>
				</div>
				<div className="md:flex md:items-center">
					<button onClick={handleEditBook} className="w-full p-2 bg-sky-400 hover:bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500 font-semibold text-lg" type="button">
						Edit Book
					</button>
				</div>
			</form>
		</div>
	)
}

export default EditBook
