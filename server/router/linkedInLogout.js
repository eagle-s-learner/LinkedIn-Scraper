const express = require("express");
const puppeteer = require("puppeteer");
const { browserWSEndpoint } = require("./linkedInLogin");
// const { browser } = require("../controllers/puppeteer");

const router = express.Router();

const linkedin_pass = process.env.LINKEDIN_PASS;
const email = process.env.EMAIL;

router.post("/logout/", async (req, res) => {
    const browser = await puppeteer.connect({
        browserWSEndpoint: browserWSEndpoint,
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setViewport({
        width: 1366,
        height: 768,
    }); // resize the browser web page

    const cookieString = await fs.readFile("./cookies.json");
    const cookies = JSON.parse(cookieString);

    await browser.setCookie(...cookies);

    await page.goto("https://www.linkedin.com");

    // here the code for logout

    res.status(200).send("Logout success!!");
});

module.exports = router;
