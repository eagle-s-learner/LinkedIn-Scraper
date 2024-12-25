import { useContext, useState } from "react";
import NavBar from "./NavBar";
import { LoginContext } from "../LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileDetails() {
    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState("");
    const [desig, setDesig] = useState("");

    const [receivedData, setReceivedData] = useState([]);

    const loginCtx = useContext(LoginContext);

    const navigate = useNavigate();
    if (!loginCtx.loginToLinkedIn) {
        navigate("/");
    }

    async function getPeopleData() {
        console.log("check");
        if (companyName == "" || location == "" || desig == "") {
            alert("fill all the details");
            return;
        }
        let response;
        console.log(location, desig, companyName);
        try {
            const formData = new FormData();
            formData.append("company", companyName);
            formData.append("desig", desig);
            formData.append("location", location);
            response = await axios.post(
                "http://localhost:3021/api/getpeopledata/",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status == 200) {
                setReceivedData(receivedData.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <NavBar />
            <div className="lg:w-1/3 mx-auto">
                <div className="my-2">
                    <label className="block text-sm font-medium ml-2">
                        Company Name
                    </label>
                    <input
                        className="py-2 px-3 w-full border-2 rounded-md border-black mx-1"
                        type="text"
                        value={companyName}
                        onChange={(ev) => setCompanyName(ev.target.value)}
                        placeholder="Enter Company Name..."
                    />
                </div>
                <div className="my-2">
                    <label className="block text-sm font-medium ml-2">
                        Location
                    </label>
                    <input
                        className="py-2 px-3 w-full border-2 rounded-md border-black mx-1"
                        type="text"
                        value={location}
                        onChange={(ev) => setLocation(ev.target.value)}
                        placeholder="Enter Location..."
                    />
                </div>
                <div className="my-2">
                    <label className="block text-sm font-medium ml-2">
                        Designation
                    </label>
                    <input
                        className="py-2 px-3 w-full border-2 rounded-md border-black mx-1"
                        type="text"
                        value={desig}
                        onChange={(ev) => setDesig(ev.target.value)}
                        placeholder="Enter Designation..."
                    />
                </div>
                <button
                    disabled={loginCtx.loginToLinkedIn === false}
                    className={
                        loginCtx.loginToLinkedIn === false
                            ? "w-full mx-auto py-2 px-3 font-semibold bg-cyan-700 text-white rounded-md cursor-not-allowed"
                            : "w-full mx-auto py-2 px-3 font-semibold bg-cyan-700 text-white rounded-md"
                    }
                    onClick={getPeopleData}
                >
                    Get Data
                </button>
            </div>
        </>
    );
}
