import {Link} from "react-router-dom";
import {UserIcon} from "../components/UserIcon.jsx";

export function Home(){
    return (
        <>

            <div className="bg-gradient-to-b font-merriweather w-screen min-h-screen from-blue-100 to-blue-500 flex  flex-col justify-center items-center">
                <UserIcon className="text-2xl"/>
                <h1 className="title text-7xl font-bold">Homepage</h1>
                <div className="grid gap-4 justify-self-center items-center text-5xl m-20 ">
                        <Link className=" p-4 col-span-4 login-link bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-center rounded-xl border-gray-600 block" to="/complaint">Complaints</Link>
                        <Link className=" p-4 col-span-4 login-link bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-center rounded-xl border-gray-600 block" to="/complaint/me">My Complaints</Link>
                        <Link className=" p-4 col-span-4 login-link bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-center rounded-xl border-gray-600 block" to="/login">Login</Link>
                </div>
            </div>

        </>
    )
}

