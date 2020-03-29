"use strict";
const KoaRouter = require("koa-router");
const qs = require("querystring");

const router = new KoaRouter();
const REDIRECT_URI = process.env.REDIRECT_URI;

router.get("/login", async ctx => {
  ctx.response.redirect(
    "https://accounts.spotify.com/authorize?" +
      qs.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: "user-read-private playlist-modify-public ugc-image-upload",
        redirect_uri: REDIRECT_URI
      })
  );
});

module.exports = router;
