export function SortingBar({selectedCategory, setSelectedCategory, selectedStatus,setSelectedStatus}) {

    return (
        <>
            <div className=" w-full max-w-screen-xl flex gap-4 justify-center text-center">
                <div className="flex flex-col m-3">
                    <label htmlFor="category" className="category-label mb-3 text-blue-700">Category</label>
                    <select className="category p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2 rounded-3xl"
                            value={selectedCategory}
                            onChange={event => {setSelectedCategory(event.target.value)}}>
                        <option value="">Select a category</option>
                        <option value="1">HR</option>
                        <option value="2">Work Environment</option>
                        <option value="3">Colleague</option>
                        <option value="4">Miscellaneous</option>
                    </select>
                </div>
                <div className="flex flex-col m-3">
                    <label htmlFor="priority" className="priority-label mb-3 text-red-300">Status</label>
                    <select className="category p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2 rounded-3xl"
                            value={selectedStatus}
                            onChange={event => {setSelectedStatus(event.target.value)}}>
                        <option value="">Select a status</option>
                        <option value="SUBMITTED">Submitted</option>
                        <option value="IN_PROGRESS">In_Progress</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            </div>
        </>
    )
}