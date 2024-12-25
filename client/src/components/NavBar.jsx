import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NavBar() {
    const location = useLocation();
    const [loginToLinkedIn, setLoginToLinkedIn] = useState(false);

    useEffect(() => {
        const login = async () => {
            try {
                if (!loginToLinkedIn) {
                    const response = await axios.get(
                        "http://localhost:3021/api/"
                    );
                    if (response.status == 200) {
                        setLoginToLinkedIn(true);
                    }
                }
            } catch (error) {
                console.error("Login Error:", error);
            }
        };

        login();
    }, [loginToLinkedIn]);
    // console.log(loginToLinkedIn)
    return (
        <div className="mx-auto bg-slate-300 pb-2 relative">
            <h1 className="w-fit mx-auto text-2xl font-semibold">
                LinkedIn Scraper
            </h1>

            {/* show only if it is loged IN */}
            {loginToLinkedIn && (
                <button className="absolute right-1 top-1 bg-red-500 py-2 px-3 rounded-sm shadow-md">
                    Logout LinkedIN
                </button>
            )}
            <div className="flex w-1/3 mx-auto justify-between">
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
