const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const router = express.Router();

const linkedin_pass = process.env.LINKEDIN_PASS;
const email = process.env.EMAIL;


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

router.get("/", async (req, res) => {
    // Check if cookie is avialable 
    const cookieString = await fs.readFile('./cookies.json');
    let cookies = JSON.parse(cookieString);
    if(cookies.length > 0){
        res.status(200).send("Login success!!");
        return;
    }

    // launching browser, creating page
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            "--start-maximized", // open the window in full screen
        ],
    });
    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(0);

    await page.setViewport({
        width: 1366,
        height: 768,
    }); // resize the browser web page

    await page.goto("https://www.linkedin.com/login");



    // linkedin credentials filling
    await page.type('input[id="username"][name="session_key"]', email);
    await sleep(10000)

    await page.type('input[name="session_password"]', linkedin_pass);


    // click sign in button
    await page.click('button[class="btn__primary--large from__button--floating"][aria-label="Sign in"]');

    // wait here for 30 seconds at least to ensure 2 factor authentication
    await sleep(1000 * 30);

    cookies = await browser.cookies();
    fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2))

    await browser.close();
    res.status(200).send("Login success!!");
});


module.exports = { router };
