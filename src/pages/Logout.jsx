import {useNavigate} from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
            localStorage.removeItem("authToken")
            navigate("/login");
    }

    return (
        <>
            <div className="warn max-w-full min-h-screen bg-gradient-to-b font-merriweather from-blue-100 to-blue-400 text-center">
            <h1 className="text-5xl text-red-900">Are you sure you want to log out?</h1>
            <button className="logout p-4 m-3 max-w-md max-h-24 text-3xl rounded-xl bg-blue-400" onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}