import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import axios from "axios";

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    // Login Context
    const loginCtx = useContext(LoginContext);

    async function handleLogoutLinkedIn() {
        let response = null;
        try {
            response = await axios.post("http://localhost:3021/api/logout/", {});
            if(response.status === 200){
                loginCtx.setLoginToLinkedIn(false);
                loginCtx.setInitalLinkedInLogoutState(false);
                navigate("/");
            }
        } catch (error) {
            console.log(error.response?.data?.error);
        }
    }

    return (
        <div className="mx-auto md:w-full lg:w-full bg-slate-300 pb-2 relative">
            <h1 className="w-fit mx-auto text-2xl font-semibold">
                LinkedIn Scraper
            </h1>

            {/* show only if it is loged IN */}
            {loginCtx.loginToLinkedIn && (
                <button
                    onClick={handleLogoutLinkedIn}
                    className="absolute right-1 top-1 bg-red-500 py-2 px-3 rounded-sm shadow-md"
                >
                    Logout LinkedIN
                </button>
            )}
            <div className="flex md:w-1/3 mx-auto justify-between items-center">
                <Link
                    to={"/job-detail"}
                    className={
                        location.pathname === `/job-detail`
                            ? "border-b-2 hover:border-blue-400 hover:border-b-2 border-blue-600 p-3"
                            : "hover:border-blue-400 hover:border-b-2 p-3"
                    }
                >
                    Job Detail
                </Link>
                <Link
                    to={"/profile-detail"}
                    className={
                        location.pathname === `/profile-detail`
                            ? "border-b-2 hover:border-blue-400 hover:border-b-2 border-blue-600 p-3"
                            : "hover:border-blue-400 hover:border-b-2 p-3"
                    }
                >
                    Profile Detail
                </Link>
            </div>
        </div>
    );
}
