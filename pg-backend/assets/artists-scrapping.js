"use strict";
const osmosis = require("osmosis");

/**
 * Web Scrapping - By passing a festicket festival url, it retrieves the artists playing at the said music festival
 * @param url: string - Festicket festival url
 * @returns A promise that if successful resolves to an array containing all the confirmed artists for the music festival
 */
function getArtists(url) {
  return new Promise(function(resolve, reject) {
    let savedData = [];
    osmosis
      .get(url)
      .find("#lineup div")
      .select("li")
      .set({ artist: "span" })
      .then((a, b) => {
        if (savedData.indexOf(b.artist) === -1) savedData.push(b.artist);
      })
      .done(() => {
        if (savedData) resolve(savedData);
        reject(
          "Something happened! Scrapping artists names could not be done."
        );
      });
  });
}

module.exports = {
  getArtists
};
