import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import api from "../services/api.jsx";

export function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            await api.post("api/dj-rest-auth/registration/", {
                username: username,
                email: email,
                password1: password,  // Changed from 'password' to 'password1'
                password2: password

            });
            alert("Registration successful! Please check your email to verify your account.");

            navigate("/login");
        } catch (error) {
            if (error.response) {
                console.error("Backend response:", error.response.data);
                setError(JSON.stringify(error.response.data, null, 2));
            } else {
                setError(error.message);
            }
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b font-merriweather from-blue-100 to-blue-400">
            <form  onSubmit={handleRegistration} className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h1 className=" col-span-12 align-middle text-center text-5xl p-3">Register</h1>
                <div className="form-group flex flex-col gap-4 m-3">
                    <label htmlFor="Username">Username</label>
                    <input className=" p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                           type="text"
                           id="Username"
                           onChange={(e) => setUsername(e.target.value)}
                           placeholder="Username" />
                    <label htmlFor="Email">Email</label>
                    <input className=" p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                           type="text"
                           id="email"
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Email" />
                    <label htmlFor="password">Password</label>
                    <input className="p-3 bg-sky-100 border-3 border-gray-600 rounded-s focus:outline-none focus:ring-2"
                           type="password"
                           id="password"
                           onChange={e =>setPassword(e.target.value)}
                           placeholder="Password" />
                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Register
                    </button>
                    <p className="mt-4 text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}