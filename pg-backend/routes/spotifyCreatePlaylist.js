"use strict";
const KoaRouter = require("koa-router");
const webscrapping = require("../assets/artists-scrapping");
const spotify = require("../assets/spotify-create-playlist");
const middleman = require("../assets/search-middleman");

const router = new KoaRouter();

// TODO: handle (no results / no matches) from user input
// TODO: look up get (several tracks, artists) @ spotify api
// TODO: upload festivalImage BASE64 to spotify playlist

router.get("/createplaylist", async ctx => {
  let { userInput, accessToken, tracksPerArtist } = ctx.request.query;
  ctx.body = "blank";
  let middlemanResults = (await middleman.getFestival(userInput))[0];
  let {
    name: festivalName,
    series: festivalURI,
    card: festivalImage
  } = middlemanResults;

  let artists = await webscrapping.getArtists(
    `https://www.festicket.com/festivals/${festivalURI}`
  );

  let playlistParams = {
    accessToken,
    tracksPerArtist: Number(tracksPerArtist),
    artists,
    festival: festivalName
  };
  let playlist = await spotify.createPlaylist(playlistParams);
  let lastBatch = await playlist[playlist.length - 1];
  let playlistURL = await playlist[0];
  if (lastBatch.body.snapshot_id) {
    // Do something with the newly created playlist
    ctx.redirect(playlistURL);
  } else {
    console.error("That's some bad hat Harry!");
  }
});

module.exports = router;
