import {Link} from "react-router-dom";

export function Navbar(){
    return (
        <>
            <div className="p-4 bg-gradient-to-b from-white to-blue-200 border-b-blue-300 text-blue-700">
                <nav className="navbar navbar-expand-lg flex gap-4">
                    <Link to="/">Home</Link>
                    <Link to="complaint">Complaint</Link>
                    <Link to="complaint/me">My Complaints</Link>
                    <Link to="complaint/create">Submit Complaints</Link>
                    <Link to="login">Login</Link>
                    <Link to="logout">Logout</Link>
                </nav>
            </div>
        </>
    )
}