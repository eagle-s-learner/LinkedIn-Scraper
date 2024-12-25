const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;

const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5174",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LinkedIN Login Handlers
const { router: LoginToLinkedIn } = require("./router/linkedInLogin");
app.use("/api", LoginToLinkedIn);

// LinkedIN Logout Handler
const LogoutLinkedIn = require("./router/linkedInLogout");
app.use("/api", LogoutLinkedIn);

// Fetch Profile based on designation location company
const getPeopleData = require("./router/getPeopleData");
app.use("/api", getPeopleData);

app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
});

// const { data } = await axios.get("https://www.linkedin.com/login/", {
//     headers: { "User-Agent": new userAgent().toString() },
// });
// console.log(data);

// res.status(200).json({ data });
