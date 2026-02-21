import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import api from "../services/api.jsx";
import {SortingBar} from "../components/SortingBar.jsx";
import {PaginationComponent} from "../components/Pagination.jsx";

export function Complaints(){
    const [complaints, setComplaints] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);


    const priorityMap = {HIGH: 1, MEDIUM: 2, LOW: 3};

    useEffect(() => {
        const fetchComplaints = async (categoryId = "") => {
            try {
                setLoading(true);
                // Token from login
                const token = localStorage.getItem("authToken");
                if(!token){
                    setLoggedIn(false)
                    setLoading(false);
                    return;
                }
                setLoggedIn(true);
                const url = categoryId ? `api/complaint/category/${categoryId}` : "https://complaint-backend-4863a97516ff.herokuapp.com/api/complaint/";

                const response = await api.get(url, {
                    headers: {
                        Authorization: `Token ${token}`, // <- important for authenticated requests
                    },
                    params: {
                        page: currentPage,
                        page_size: 15
                    }
                });
                
                // Handle paginated response
                let filtered = response.data.results || response.data;
                
                // Set pagination metadata
                if (response.data.count) {
                    setTotalCount(response.data.count);
                    setTotalPages(Math.ceil(response.data.count / 15));
                }

                if (selectedStatus){
                    filtered = filtered.filter(c => c.status === selectedStatus);
                }

                filtered = filtered.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
                setComplaints(filtered);
                setLoading(false);

            } catch (error)
            {
                setLoading(false);
                if (error.response && error.response.data) {
                    setError(JSON.stringify(error.response.data));
                } else {
                    setError(error.message);
                }
            }
        };

        fetchComplaints(selectedCategory);
    }, [selectedCategory, selectedStatus, currentPage])  // re-triggers on page change

    if (!loggedIn) {
        return (
            <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-400 font-merriweather">
                <div className="text-center bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-semibold text-blue-900 mb-4">Please log in</h2>
                    <p className="text-blue-800 mb-6">You need to log in to view complaints.</p>
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="w-screen min-h-screen bg-gradient-to-b font-merriweather from-blue-100 to-blue-400 bg-fixed flex flex-col flex-shrink-none items-center justify-self-center">
                <h1 className="head font-medium text-center text-5xl p-4">Complaints</h1>
                <SortingBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                            selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
                
                {loading && (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
                        <p className="mt-4 text-blue-800">Loading complaints...</p>
                    </div>
                )}
                
                {!loading && (
                    <>
                        <div className="complaint-list w-full max-w-screen-2xl mx-auto grid  grid-cols-2 ">
                            {complaints.map((complaint) => (
                                <div className=" flex flex-col rounded-2xl bg-blue-500/30 bg-blend-multiply backdrop-blur-sm shadow-lg shadow-blue-900 gap-2 p-4 m-5" key={complaint.id}>
                                    <h2 className="complaint-title text-2xl col-end-4 text-red-900">{complaint.title}</h2>
                                    <div className="other grid grid-cols-[auto,auto,auto,auto] gap-x-4 gap-y-2">
                                        <span className="author"><span className="text-amber-200">Author:</span> {complaint.created_by}</span>
                                        <span className="category"><span className="text-blue-700">Category:</span> {complaint.category_name}</span>
                                        <span className="priority"><span className="text-red-300">Priority:</span> {complaint.priority}</span>
                                        <span className="priority"><span className="text-green-300">Status:</span> {complaint.status}</span>
                                        <Link className="w-fit p-3 btn rounded border-2 bg-red-400" to={`/complaint/${complaint.id}`}>
                                            <button>See more</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalCount={totalCount}
                            pageSize={15}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </>
    )
}