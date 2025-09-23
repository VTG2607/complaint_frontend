import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import api from "../services/api.jsx";
import {Comments} from "./Comments.jsx";
export function ComplaintDetail(){
     const [complaint, setComplaints] = useState(null);
     const [error, setError] = useState(null);
     const {id} = useParams();

     useEffect(() => {
             const fetchComplaintDetails = async () => {
                 try {
                 const token = localStorage.getItem("authToken");
                 const response = await api.get(`https://complaint-backend-4863a97516ff.herokuapp.com/api/complaint/${id}/`, {
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

    if (!complaint) return <p>Loading...</p>;

    return (
        <>
            <div className="w-screen min-h-screen items-center font-mono justify-self-center p-3 bg-gradient-to-b from-blue-200 to-blue-500 bg-fixed">
                <h1 className="head font-medium text-center text-5xl p-4">Complaints</h1>
                <div className="complaint-list flex flex-col" key={complaint.id}>
                    <h2 className="complaint-title text-3xl pl-5 col-end-4 text-red-900">{complaint.title}</h2>
                    <p className="complaint-body col-span-full pl-5 ">{complaint.body}</p>
                    <div className="other grid grid-cols-4 gap-4">
                        <span className="author row-span-3"><span className="text-amber-200">Author:</span> {complaint.created_by}</span>
                        <span className="category row-span-3"><span className="text-cyan-400">Category:</span> {complaint.category}</span>
                        <span className="priority row-span-3"><span className="text-red-300">Priority:</span> {complaint.priority}</span>
                        <span className="priority row-span-4"><span className="text-green-300">Status:</span> {complaint.status}</span>
                    </div>
                </div>
                <Comments complaintId={complaint.id}/>
            </div>
        </>
    )
}