import React from "react"

const Spinner = () => {
	return (
		<>
			<div className="flex">
				<div className="relative">
					<div className="size-10 rounded-full absolute border-[10px] border-dashed border-red-500"></div>
					<div className="size-10 rounded-full animate-spin absolute border-[10px] border-dashed border-blue-500"></div>
				</div>
			</div>
		</>
	)
}

export default Spinner
