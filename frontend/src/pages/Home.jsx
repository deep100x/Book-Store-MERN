import React, { useEffect, useState } from "react"
import axios from "axios"
import Spinner from "../components/Spinner"
import { Link } from "react-router-dom"
import { AiOutlineEdit } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md"

const Home = () => {
	const [books, setBooks] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		axios
			.get("http://localhost:8069/books")
			.then((response) => {
				setBooks(response.data.data)
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
			})
	}, [])

	return (
		<div className="p-4">
			<div className="flex justify-center items-center gap-x-4">
				<button className="bg-sky-300 hover:bg-sky-400 dark:bg-sky-800 dark:hover:bg-sky-500 px-4 py-1 rounded-lg">Table</button>
				<button className="bg-sky-300 hover:bg-sky-400 dark:bg-sky-800 dark:hover:bg-sky-500 px-4 py-1 rounded-lg">Card</button>
			</div>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl my-8">Books List</h1>
				<Link to="/books/create">
					<MdOutlineAddBox className="text-sky-800 text-4xl" />
				</Link>
			</div>
			<div className="overflow-auto">
				{loading ? (
					<Spinner />
				) : (
					<table className="table-auto w-full min-w-[1000px] border-separate border-spacing-2">
						<thead>
							<th className="w-1/6 border border-gray-500 p-2">No</th>
							<th className="w-1/6 border border-gray-500 p-2">Title</th>
							<th className="w-1/6 border border-gray-500 p-2">Author</th>
							<th className="w-1/6 border border-gray-500 p-2">Publish Year</th>
							<th className="w-1/6 border border-gray-500 p-2">Actions</th>
						</thead>
						<tbody>
							{books.map((book, index) => (
								<tr key={book._id}>
									<td className="w-1/6 border border-gray-500 p-2">{index + 1}</td>
									<td className="w-1/6 border border-gray-500 p-2">{book.title}</td>
									<td className="w-1/6 border border-gray-500 p-2">{book.author}</td>
									<td className="w-1/6 border border-gray-500 p-2">{book.publishYear}</td>
									<td className="w-1/6 border border-gray-500 p-2">
										<div className="flex justify-center">
											<Link
												to={`books/details/${book._id}`}
												className="border-2 border-green-500 text-2xl transition-all p-2 bg-green-600 text-white hover:bg-white hover:border-green-500 hover:text-green-400"
											>
												<BsInfoCircle />
											</Link>
											<Link
												to={`books/edit/${book._id}`}
												className="border-2 border-blue-500 text-2xl transition-all p-2 bg-blue-600 text-white hover:bg-white hover:border-blue-500 hover:text-blue-400"
											>
												<AiOutlineEdit />
											</Link>
											<Link
												to={`books/delete/${book._id}`}
												className="border-2 border-red-500 text-2xl transition-all p-2 bg-red-600 text-white hover:bg-white hover:text-red-400"
											>
												<MdOutlineDelete />
											</Link>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
}

export default Home
