"use strict";
require("dotenv").config();
const Koa = require("koa");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const serve = require("koa-static");

const app = new Koa();
app.use(serve("dist"));

app.use(logger());
app.use(helmet());
app.use(cors());
app.use(koaBody());

app.use(require("./routes/spotifyLogin").routes());
app.use(require("./routes/spotifyCallback").routes());
app.use(require("./routes/spotifyCreatePlaylist").routes());

app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});
