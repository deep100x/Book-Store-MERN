import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"

const ShowBook = () => {
	const [book, setBook] = useState({})
	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		setLoading(true)
		axios
			.get(`http://localhost:8069/books/${id}`)
			.then((response) => {
				setBook(response.data)
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
			})
	}, [id])

	return (
		<>
			<BackButton />
			<h1 className="text-3xl font-bold mb-6 text-center">Show {book.title}</h1>
			{loading ? (
				<Spinner />
			) : (
				<>
					<section className="container mx-auto p-10 md:p-20 antialiased ">
						<article className=" flex flex-wrap md:flex-nowrap border-2 dark:border-gray-500 rounded-lg overflow-hidden shadow-lg mx-auto max-w-3xl group cursor-pointer transform duration-500 hover:-translate-y-1">
							<img className="w-full min-h-full object-cover md:w-56" src="https://thumbs.dreamstime.com/b/funny-face-baby-27701492.jpg" alt="" />
							<div className="">
								<div className="p-5 pb-10">
									<h1 className="text-2xl font-semibold mt-4">{book.title}</h1>
									<p className="text-xl text-gray-500 mt-2 leading-relaxed">
										{book.description || "Located in Rajshahi Division, Bogra is one of the oldest and most fascinating towns in Bangladesh"}
									</p>
								</div>
								<div className=" p-5">
									<div className="sm:flex sm:justify-between">
										<div>
											<div className="text-lg">
												<span className="font-bold">{book.author}</span> Published in Year <span className="text-purple-700 fontsem">{book.publishYear}</span>
											</div>
											<div className="flex items-center">
												<div className="flex">⭐⭐⭐⭐⭐</div>
												<div className="text-gray-500 ml-2 text-sm md:text-base mt-1">16 reviews</div>
											</div>
										</div>
										<a
											href="https://github.com/deepk2891"
											target="_blank"
											className="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-purple-700 hover:bg-purple-600 font-bold text-white md:text-lg rounded-lg shadow-md"
										>
											Deep Kothari
										</a>
									</div>
									<div className="mt-3 text-gray-500 text-sm md:text-sm">
										<p>
											<span className="text-purple-600 font-medium">Created At</span> {new Date(book.createdAt).toString()}
										</p>
										<p>
											<span className="text-purple-600 font-medium">Last Updated At</span> {new Date(book.updatedAt).toString()}
										</p>
									</div>
								</div>
							</div>
						</article>
					</section>
				</>
			)}
		</>
	)
}

export default ShowBook
