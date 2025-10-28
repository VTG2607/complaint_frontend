import {useEffect, useState} from "react";
import api from "../services/api.jsx";
import {Link, useNavigate} from "react-router-dom";

export function ComplaintCreate(){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]); // store fetched categories
    const[priority, setPriority] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // fetching categories
    useEffect(() => {
        api.get("https://complaint-backend-4863a97516ff.herokuapp.com/api/categories/")
            .then((response) => { console.log(response.data); setCategories(response.data)})
            .catch((error) => {console.log(error)})

    },[])

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setLoggedIn(!!token);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {title, body, category, priority};
        if (!category) {
            setError("Please select a category");
            return;
        }
        try {
            const response = await api.post("api/complaint/", data, {
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
    if (!loggedIn) {
        return (
            <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-400 font-merriweather">
                <div className="text-center bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-semibold text-blue-900 mb-4">Please log in</h2>
                    <p className="text-blue-800 mb-6">You need to log in to submit complaints.</p>
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
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-400 font-merriweather">
                <h1 className="head col-span-12 align-middle text-center text-5xl p-3 mb-24">SUBMIT A COMPLAINT</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-screen-xl bg-white shadow-lg rounded-lg p-8">
                    <div className="form-group flex flex-col gap-4 m-3">
                        <label htmlFor="title" className="title-label">Title</label>
                        <input className="title p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                               type="text"
                               placeholder="The title"
                               value={title}
                               onChange={event => {setTitle(event.target.value)}}></input>
                        <label htmlFor="body" className="body-label">Body</label>
                        <textarea className="body p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                               placeholder="The body"
                                  rows={6}
                               value={body}
                               onChange={event => {setBody(event.target.value)}}></textarea>
                        <label htmlFor="category" className="category-label">Category</label>
                        <select className="category p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                                value={category}
                                onChange={event => {setCategory(event.target.value)}}>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
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