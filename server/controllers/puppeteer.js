const puppeteer = require("puppeteer");

let browser = null;
let page = null;

const linkedin_pass = process.env.LINKEDIN_PASS;
const email = process.env.EMAIL;

// Function to initialize Puppeteer, browser, and page
async function initBrowser() {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: false, // Change to true in production
            args: ["--start-maximized"], // Maximize the window
        });
    }

    if (!page) {
        page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
    }
}

module.exports = {
    initBrowser,
    browser,
    page
}