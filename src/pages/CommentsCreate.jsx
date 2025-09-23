import { useState } from "react";
import api from "../services/api.jsx";

export function CommentsCreate({ complaintId }) {
    const [commentBody, setCommentBody] = useState("");
    const [error, setError] = useState(null);

    const handleComment = async (e) => {
        e.preventDefault();
        const data = { comment_body: commentBody }; // match serializer field

        try {
            const token = localStorage.getItem("authToken");
            const response = await api.post(
                `http://127.0.0.1:8000/api/complaint/${complaintId}/comments/`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 'Bearer'
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Comment created:", response.data);
            setCommentBody(""); // clear textarea
            setError(null); // clear previous errors if any
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <div className="fixed bottom-4 left-4 w-96 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Add a Comment</h2>
            <form onSubmit={handleComment} className="flex flex-col gap-2">
        <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Write your comment..."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={4}
        />
                {error && <p className="text-red-500">{JSON.stringify(error)}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
                >
                    Post Comment
                </button>
            </form>
        </div>
    );
}
