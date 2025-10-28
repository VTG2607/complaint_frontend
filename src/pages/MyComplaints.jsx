import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import api from "../services/api.jsx";
import {SortingBar} from "../components/SortingBar.jsx";
export function MyComplaints(){
    const [complaints, setComplaints] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchMyComplaints = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if(!token){
                    setLoggedIn(false);
                    return;
                }
                setLoggedIn(true);
                const response = await api.get(`api/complaint/me/`, {
                    headers: {
                        Authorization: `Bearer ${token}` }
                })

                setComplaints(response.data);

            }catch(error){
                if(error.response && error.response.data){
                    setError(error.data.message)
                } else {
                    console.log(error.constructor)
                }
            }
        }
        fetchMyComplaints();
    })

    if (!loggedIn) {
        return (
            <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-400 font-merriweather">
                <div className="text-center bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-semibold text-blue-900 mb-4">Please log in</h2>
                    <p className="text-blue-800 mb-6">You need to log in to view your own complaints.</p>
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
            <div className="w-screen min-h-screen bg-gradient-to-b font-merriweather from-blue-100 to-blue-400 bg-fixed flex flex-col items-center">
                <h1 className="head font-medium text-center text-5xl p-4">My Complaints</h1>
                <div className="complaint-list w-full max-w-6xl mx-auto">
                    {complaints.map((complaint) => (
                        <div className="flex flex-col p-5 rounded-2xl bg-blue-500/30 bg-blend-multiply backdrop-blur-sm shadow-lg shadow-blue-900 gap-2 m-20" key={complaint.id}>
                            <h2 className="complaint-title text-3xl col-end-4 text-red-900">{complaint.title}</h2>
                            <p className="complaint-body col-span-full">{complaint.body}</p>
                            <div className="other grid grid-cols-4 gap-4">
                                <span className="author row-span-3"><span className="text-amber-200">Author:</span> {complaint.created_by}</span>
                                <span className="category row-span-3"><span className="text-blue-700">Category:</span> {complaint.category_name}</span>
                                <span className="priority row-span-3"><span className="text-red-300">Priority:</span> {complaint.priority}</span>
                                <span className="status row-span-3"><span className="text-green-300">Status</span> {complaint.status}</span>
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