import {useState} from "react";
import api from "../services/api.jsx";
import {useNavigate} from "react-router-dom";

export function ComplaintCreate(){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const[priority, setPriority] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {title, body, category, priority};
        try {
            const response = await api.post("https://complaint-backend-4863a97516ff.herokuapp.com/api/complaint/", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },

            });
            console.log(response);
        } catch(error) {
            console.error(error);
            if (error.response && error.response.data) {
                setError(JSON.stringify(error.response.data));
            } else {
                setError(error.message || "Unknown error");
            }
        }
        navigate("/complaint/me");
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b font-mono from-blue-200 to-blue-500">
                <h1 className="head col-span-12 align-middle text-center text-5xl p-3 mb-24">SUBMIT A COMPLAINT</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                    <div className="form-group flex flex-col gap-4 m-3">
                        <label htmlFor="title" className="title-label">Title</label>
                        <input className="title p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                               type="text"
                               placeholder="The title"
                               value={title}
                               onChange={event => {setTitle(event.target.value)}}></input>
                        <label htmlFor="body" className="body-label">Body</label>
                        <textarea className="body min-h p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                               placeholder="The body"
                               value={body}
                               onChange={event => {setBody(event.target.value)}}></textarea>
                        <label htmlFor="category" className="category-label">Category</label>
                        <select className="category p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                                value={category}
                                onChange={event => {setCategory(event.target.value)}}>
                            <option value="">Select a category</option>
                            <option value="HR">HR</option>
                            <option value="Work Environment">Work Environment</option>
                            <option value="Colleague">Colleague</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                        <label htmlFor="priority" className="priority-label">Priority</label>
                        <select className="priority p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                                value={priority}
                                onChange={event => {setPriority(event.target.value)}}>
                            <option value="">Select a priority</option>
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}