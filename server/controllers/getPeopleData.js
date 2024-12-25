const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

async function getPeopleData(req, res) {
    // try{
    const { location, desig, company } = req.body;

    const browser = await puppeteer.launch({
        headless: false,
        args: ["--start-maximized"],
    });

    const page = await browser.newPage();

    // remove the default connection time out time
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

    await page.goto("https://www.linkedin.com/jobs/");

    await sleep(1000 * 3);

    // clicking the svg first to focus on input element
    await page
        .locator(
            'svg[class="jobs-search-box__search-icon--custom"][data-test-icon="search-small"]'
        )
        .click();

    // Entering the value in input field
    await page.type(
        'input[aria-label="Search by title, skill, or company"][aria-hidden="true"][aria-required="false"]',
        desig
    );

    await sleep(3000);

    // selecting the Job Profile from dropdown menu
    await page.waitForSelector(
        "ul.jobs-search-box__typeahead-results-list > li:first-child button",
        { visible: true }
    );
    const firstLiButton = await page.$(
        "ul.jobs-search-box__typeahead-results-list > li:first-child button"
    ); // Re-select the button
    await firstLiButton.click();

    // select people by clicking job dropdown menu to select people
    await page
        .locator(
            'button[aria-label="Filter by: Jobs"][id="navigational-filter_resultType"]'
        )
        .click();

    await sleep(2000);
    // click on people which is second element;
    await page.waitForSelector(
        'div.artdeco-dropdown__content-inner ul.list-style-none > li:nth-child(2) div[role="button"]',
        { visible: true }
    );
    await page.click(
        'div.artdeco-dropdown__content-inner ul.list-style-none > li:nth-child(2) div[role="button"]'
    );

    // select location
    await page.waitForSelector('button[id="searchFilter_geoUrn"]', {
        visible: true,
    });
    await page.click('button[id="searchFilter_geoUrn"]');

    // enter location to location field
    await page.type(
        'input[aria-label="Add a location"][role="combobox"]',
        location
    );

    await sleep(3000);
    // selecting the location
    await page.waitForSelector(
        'div[role="listbox"].basic-typeahead__triggered-content > div > div:first-child',
        { visible: true }
    );
    await page.click(
        'div[role="listbox"].basic-typeahead__triggered-content > div > div:first-child'
    );

    // click show result
    // await page.locator('button[aria-label="Apply current filter to show results"]').click()


    // }catch(error){
    //     console.log("Error", error.message);
    // }
}

module.exports = getPeopleData;
