"use strict";
const puppeteer = require("puppeteer");

/**
 * Intercepts the response from a festicket website search
 * @param userInput: string - User input to search for a music festival
 * @returns A promise that if successful resolves to an array of objects, each representing a different music festival
 */
function getFestival(userInput) {
  return new Promise(async (resolve, reject) => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    page.on("response", async (response) => {
      if (response.url().includes("algolia")) {
        try {
          let search = await response.json();
          let searchResults = search.results[0].hits;
          resolve(searchResults);
        } catch (error) {
          reject(error);
        }
      }
    });

    await page.goto("https://www.festicket.com/festival-finder/");
    await page.waitForSelector("input[data-cy='navbar-search-input']");
    await page.type("input[data-cy='navbar-search-input']", userInput);
  });
}

getFestival("nos alive").then((x) => {
  let data = x[0].artists[0].facet;

  const a = x[0].artists.map((x) => {
    let data = JSON.parse(x.facet);
    return data[1];
  });

  console.log(a[4]);

  // console.log(data);
  // let format = JSON.parse(data);
  // console.log(format);
});

module.exports = {
  getFestival,
};
