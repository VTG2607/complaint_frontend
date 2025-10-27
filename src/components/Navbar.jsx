import {Link} from "react-router-dom";

export function Navbar(){
    return (
        <>
            <div className="p-4 bg-gradient-to-b bg-blue-100 text-blue-700">
                <nav className="navbar navbar-expand-lg flex gap-4 m-4 items-center">
                    <Link to="/" className="text-2xl font-extrabold tracking-wide text-blue-800 hover:text-blue-900 transition-all duration-300">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                            COMPLAINTIUM
                        </span>
                    </Link>
                    <Link to="complaint">Complaint</Link>
                    <Link to="complaint/me">My Complaints</Link>
                    <Link to="complaint/create">Submit Complaints</Link>
                    <Link to="login">Login</Link>
                    <Link to="register">Register</Link>
                    <Link to="logout">Logout</Link>
                </nav>
            </div>
            <div className=" w-screen h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full absolute"></div>
        </>
    )
}