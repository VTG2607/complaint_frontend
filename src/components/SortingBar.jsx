export function SortingBar({selectedCategory, setSelectedCategory, selectedStatus,setSelectedStatus}) {

    return (
        <>
            <label htmlFor="category" className="category-label">Category</label>
            <select className="category p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                    value={selectedCategory}
                    onChange={event => {setSelectedCategory(event.target.value)}}>
                <option value="">Select a category</option>
                <option value="1">HR</option>
                <option value="2">Work Environment</option>
                <option value="3">Colleague</option>
                <option value="4">Miscellaneous</option>
            </select>
            <label htmlFor="priority" className="priority-label">Status</label>
            <select className="category p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                    value={selectedStatus}
                    onChange={event => {setSelectedStatus(event.target.value)}}>
                <option value="">Select a status</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="IN_PROGRESS">In_Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
            </select>
        </>
    )
}