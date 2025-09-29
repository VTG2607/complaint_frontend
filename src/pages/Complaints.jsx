import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import api from "../services/api.jsx";
import {SortingBar} from "../components/SortingBar.jsx";
export function Complaints(){
    const [complaints, setComplaints] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [error, setError] = useState(null);


    const priorityMap = {HIGH: 1, MEDIUM: 2, LOW: 3};

    useEffect(() => {
        const fetchComplaints = async (categoryId = "") => {
            try {
                // Token from login
                const token = localStorage.getItem("authToken");
                const url = categoryId ? `https://complaint-backend-4863a97516ff.herokuapp.com/api/complaint/category/${categoryId}` : "https://complaint-backend-4863a97516ff.herokuapp.com/api/complaint/";

                const response = await api.get(url, {
                    headers: {
                        Authorization: `Token ${token}`, // <- important for authenticated requests
                    },
                });
                let filtered = response.data;

                if (selectedStatus){
                    filtered = filtered.filter(c => c.status === selectedStatus);
                }

                filtered = filtered.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
                setComplaints(filtered);

            } catch (error)
            {
                if (error.response && error.response.data) {
                    setError(JSON.stringify(error.response.data));
                } else {
                    setError(error.message);
                }
            }
        };

        fetchComplaints(selectedCategory);
    }, [selectedCategory,selectedStatus])  // re-triggers on selected Category change
    return (
        <>
            <div className="w-screen min-h-screen bg-gradient-to-b font-merriweather from-blue-100 to-blue-400 bg-fixed flex flex-col flex-shrink-none items-center justify-self-center">
                <h1 className="head font-medium text-center text-5xl p-4">Complaints</h1>
                <SortingBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                            selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
                <div className="complaint-list w-full max-w-screen-2xl mx-auto grid  grid-cols-2 ">
                    {complaints.map((complaint) => (
                        <div className=" flex flex-col rounded-2xl bg-blue-500/30 bg-blend-multiply backdrop-blur-sm shadow-lg shadow-blue-900 gap-2 p-4 m-5" key={complaint.id}>
                            <h2 className="complaint-title text-2xl col-end-4 text-red-900">{complaint.title}</h2>
                            <div className="other grid grid-cols-[auto,auto,auto,auto] gap-x-4 gap-y-2">
                                <span className="author"><span className="text-amber-200">Author:</span> {complaint.created_by}</span>
                                <span className="category"><span className="text-cyan-400">Category:</span> {complaint.category_name}</span>
                                <span className="priority"><span className="text-red-300">Priority:</span> {complaint.priority}</span>
                                <span className="priority"><span className="text-green-300">Status:</span> {complaint.status}</span>
                                <Link className="w-fit p-3 btn rounded border-2 bg-red-400" to={`/complaint/${complaint.id}`}>
                                    <button>See more</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}