const express = require("express");
const puppeteer = require("puppeteer");

const router = express.Router();

const linkedin_pass = process.env.LINKEDIN_PASS;
const email = process.env.EMAIL;

router.get("/", async (req, res) => {
    const browere = await puppeteer.launch({
        headless: false,
        args: [
            "--start-maximized", // open the window in full screen
        ],
    });
    const page = await browere.newPage();
    await page.setViewport({
        width: 1366,
        height: 768,
    }); // resize the browser web page

    await page.goto("https://www.linkedin.com/login");

    // await page.type('input[id="username"][name="session_key"]', email);
    // await page.type('input[name="session_password"]', linkedin_pass);

    // await page.click('button[class="btn__primary--large from__button--floating"][aria-label="Sign in"]');

    // wait here for 30 seconds at least to ensure 2 factor authentication
    // await setTimeout(5000);
    res.status(200);
});

module.exports = router;
