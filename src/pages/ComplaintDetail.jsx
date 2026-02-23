import {Link, useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import api from "../services/api.jsx";
import {Comments} from "./Comments.jsx";
import {CommentsCreate} from "./CommentsCreate.jsx";
export function ComplaintDetail(){
     const [complaint, setComplaints] = useState(null);
     const [currentUser, setCurrentUser] = useState(null);
     const [error, setError] = useState(null);
     const [deleteModal, setDeleteModal] = useState(false);
     const [isDeleting, setIsDeleting] = useState(false);
     const [deleteError, setDeleteError] = useState(null);
     const navigate = useNavigate();
     const {id} = useParams();

     const handleDelete = async () => {
         setIsDeleting(true);
         setDeleteError(null);
         try {
             const token = localStorage.getItem("authToken");
             await api.delete(`api/complaint/${id}/`, {
                 headers: {
                     Authorization: `Bearer ${token}`,
                 }
             });
             navigate("/complaint/me");

         } catch(error) {
             setIsDeleting(false);
             const errorMessage = error.response?.data?.detail || error.response?.data || error.message || "Failed to delete complaint";
             setDeleteError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
             console.error("Delete failed:", error);
         }
     }

     useEffect(() => {
             const fetchComplaintDetails = async () => {
                 try {
                 const token = localStorage.getItem("authToken");
                 const response = await api.get(`api/complaint/${id}/`, {
                     headers: {
                     Authorization: `Bearer ${token}`,
                     }
                 });
                 console.log("Complaint data:", response.data)
                 setComplaints(response.data)
             }  catch(error)
                 {
                     if(error.response && error.response.data){
                         setError(error.response.data);
                     }else{
                         setError(error.message)
                     }

                 }
         }

         fetchComplaintDetails();

     }, [id]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) return;
                
                const response = await api.get(`api/me/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("User data:", response.data)
                setCurrentUser(response.data.username)
            } catch(error)
            {
                console.error("Failed to fetch user:", error);
            }
        }
        fetchCurrentUser();

    }, [])

    const isAuthor = currentUser && complaint?.created_by === currentUser;
    if (!complaint) return <p>Loading...</p>;
    return (
        <>
            <div className="w-screen min-h-screen items-center justify-self-center p-3 bg-gradient-to-b from-blue-100 to-blue-400 bg-fixed font-merriweather">
                <h1 className="head font-medium text-center text-5xl p-4">Complaints</h1>
                <div className="complaint-list flex flex-col" key={complaint.id}>
                    <h2 className="complaint-title text-3xl pl-5 col-end-4 text-red-900 m-5 ml-0">{complaint.title}</h2>
                    <p className="complaint-body col-span-full pl-5 ">{complaint.body}</p>
                    <div className="other grid grid-cols-4 gap-4 pl-5">
                        <span className="author row-span-3"><span className="text-amber-200">Author:</span> {complaint.created_by}</span>
                        <span className="category row-span-3"><span className="text-blue-700">Category:</span> {complaint.category_name}</span>
                        <span className="priority row-span-3"><span className="text-red-300">Priority:</span> {complaint.priority}</span>
                        <span className="priority row-span-4"><span className="text-green-300">Status:</span> {complaint.status}</span>
                    </div>
                </div>
                {isAuthor && (
                    <div className="flex gap-4 mt-6 pl-5">
                        <button  className='px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition' onClick={() => setDeleteModal(true)}> Delete </button>
                    </div> )}
                {deleteModal &&(
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                                <h2 className="text-2xl font-bold text-red-600 mb-4">
                                    Delete Complaint?
                                </h2>
                                <p className="text-gray-700 mb-6">
                                    Are you sure you want to delete "{complaint.title}"?
                                    This action cannot be undone.
                                </p>

                                {deleteError && (
                                    <p className="text-red-500 mb-4">{deleteError}</p>
                                )}

                                <div className="flex gap-4 justify-end">
                                    <button
                                        onClick={() => setDeleteModal(false)}
                                        disabled={isDeleting}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition disabled:opacity-50">Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50">
                                        {isDeleting ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                <Comments complaintId={complaint.id}/>
                <CommentsCreate complaintId={complaint.id}/>
            </div>
        </>
    )
}