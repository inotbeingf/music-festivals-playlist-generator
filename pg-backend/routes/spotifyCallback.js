"use strict";
const KoaRouter = require("koa-router");
const router = new KoaRouter();
const axios = require("axios");
const qs = require("querystring");

const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

router.get("/callback", async ctx => {
  let code = ctx.request.query.code || null;
  let url = "https://accounts.spotify.com/api/token";

  let options = {
    code,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code"
  };
  let data = qs.stringify(options);

  try {
    let tokens = (
      await axios({
        method: "post",
        url,
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        },
        data,
        json: true
      })
    ).data;

    let { access_token, refresh_token } = tokens;
    let uri = process.env.FRONTEND_URI;
    let redirectFrontEnd = `${uri}/?access_token=${access_token}&refresh_token=${refresh_token}`;
    ctx.redirect(redirectFrontEnd);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
