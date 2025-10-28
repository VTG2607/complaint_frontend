import {useEffect, useState} from "react";
import api from "../services/api.jsx";

export function Comments({complaintId}) {
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await api.get(`api/complaint/${complaintId}/comments/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setComments(response.data);
            } catch (error) {
                if (error.response && error.response.data) {
                    setError(error.response.data);
                } else {
                    setError(error.message)
                }
            }
        }

        fetchComments();

    }, [complaintId])
    return (
        <div className="w-full justify-self-start p-3 m-3 ml-0 rounded-2xl bg-transparent font-merriweather">
            <h1 className="head font-medium text-3xl pl-5 pb-4 border-b-2 border-b-black">Comments</h1>
            {comments.map((comment) => (
                <div className="complaint-list flex flex-col p-4 bg-blue-400/60 shadow-blue-900 shadow-lg m-3 rounded-xl">
                    <p className="complaint-body col-span-full p-4 mb-2">{comment.comment_body}</p>
                    <span className="author col-span-full p-4 pb-0"><span className="text-amber-200">Commenter:</span> {comment.comment_author}</span>
                    <span className="created_at col-span-full p-4 pb-0"><span className="text-red-300">Created at:</span> {new Date(comment.created_at).toLocaleString()}</span>
                </div>))}
        </div>
    )
}