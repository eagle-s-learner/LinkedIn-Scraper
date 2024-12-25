const express = require("express");
const {setTimeout} = require("timers/promises");
require("dotenv").config();

const axios = require("axios");
const userAgent = require("user-agents");

const PORT = process.env.PORT;

const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5174/",
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// LinkedIN Login Handlers
const LoginToLinkedIn = require("./router/linkedInLogin");
app.use("/api", LoginToLinkedIn);


app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
});

// const { data } = await axios.get("https://www.linkedin.com/login/", {
//     headers: { "User-Agent": new userAgent().toString() },
// });
// console.log(data);

// res.status(200).json({ data });