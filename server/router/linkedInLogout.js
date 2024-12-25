const express = require("express");
const Logout = require("../controllers/linkedInLogout");

const router = express.Router();


router.post("/logout/", Logout);

module.exports = router;

// await page
//     .locator(
//         'ul[class="global-nav__primary-items]'
//     ).click();