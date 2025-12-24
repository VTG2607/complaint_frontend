import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import api from "../services/api.jsx";
import {useAuth} from "../context/AuthenticationContext.jsx";

export function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmission = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("api/dj-rest-auth/login/", {
                username: username,
                password: password,

            })

            // Save token in localStorage (you’ll use this for authenticated requests)
            login(response.data.key) // dj-rest-auth returns { "key": "..." }

            // Redirect user
            navigate("/complaint");

        } catch (error) {
            if (error.response && error.response.data) {
                setError(JSON.stringify(error.response.data));
            } else {
                setError(error.message);
            }
        }


    }


    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b font-merriweather from-blue-100 to-blue-400">
                <form onSubmit={handleSubmission} className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                    <h1 className=" col-span-12 align-middle text-center text-5xl p-3">Login</h1>
                    <div className="form-group flex flex-col gap-4 m-3">
                        <label htmlFor="username">Username</label>
                        <input className=" p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                               type="text"
                               id="username"
                               onChange={(e) => setUsername(e.target.value)}
                               placeholder="Username" />
                        <label htmlFor="password">Password</label>
                        <input className="p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                               type="password"
                               id="password"
                               onChange={e => setPassword(e.target.value)}
                               placeholder="Password" />
                        <button
                            type="submit"
                            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Sign In
                        </button>
                        <p className="mt-4 text-center text-gray-600">
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}