import {Link, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {Complaints} from "./pages/Complaints.jsx";
import {ComplaintDetail} from "./pages/ComplaintDetail.jsx";
import {Login} from "./pages/Login.jsx";
import {Register} from "./pages/Register.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {MyComplaints} from "./pages/MyComplaints.jsx";
import {Profile} from "./pages/Profile.jsx";
import {Logout} from "./pages/Logout.jsx";
import {ComplaintCreate} from "./pages/ComplaintCreate.jsx";

function App() {
  return (
      <>
          <Navbar/>

        <Routes>
            <Route>
                <Route path={"/complaint"} element={<h1 className="bg-lime-100">ComplaintsList</h1>}></Route>
            </Route>

            {/*Main Pages*/}
            <Route path="/" element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="logout" element={<Logout />}></Route>
            {/*Complaints*/}
            <Route path="/complaint">
                <Route index element={<Complaints />} />             {/* for the original complaints route*/}
                <Route path=":id" element={<ComplaintDetail />} />
                <Route path="me" element={<MyComplaints />} />
                <Route path="create" element={<ComplaintCreate />} />
            </Route>

            {/*User Profile*/}
            <Route path={"/me-profile"} element={<Profile />} />
            <Route path="*" element= {<Home />} />
        </Routes>
      </>
  )
}

export default App
