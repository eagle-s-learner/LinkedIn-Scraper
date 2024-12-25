const express = require("express");
const getPeopleData = require("../controllers/getPeopleData");

const router = express.Router();

router.post("/getpeopledata/", getPeopleData);

module.exports = router;