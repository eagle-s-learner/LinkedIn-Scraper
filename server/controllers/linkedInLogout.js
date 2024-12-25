const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

async function Logout(req, res) {
    const cookieString = await fs.readFile('./cookies.json');
    if(cookieString.length == 0){
        res.status(200).send("Logout success!!");
        return;
    }
    try {
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

        await sleep(2000);

        // fetching the cookie from cookie.json and setting it to browser instance
        const cookieString = await fs.readFile("./cookies.json");
        const cookies = JSON.parse(cookieString);

        await browser.setCookie(...cookies);

        await page.goto("https://www.linkedin.com/feed/");

        await sleep(1000 * 20);

        // clicking the 6th item from nav list to get sign out option
        const navItems = await page.$$(".global-nav__primary-items li");
        await navItems[5].click();

        await sleep(2000);

        // Selecting the sign out option from dropdown
        await page.locator('a[href="/m/logout/"]').click();
        
        await browser.close();

        await fs.writeFile('./cookies.json', '')
        res.status(200).send("Logout success!!");
    } catch (error) {
        console.log("Error", error.message );
    }
}

module.exports = Logout;
