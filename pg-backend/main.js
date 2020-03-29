"use strict";
require("dotenv").config();
const Koa = require("koa");
const KoaRouter = require("koa-router");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const cors = require("@koa/cors");
const koaBody = require("koa-body");

const app = new Koa();
const router = new KoaRouter();

app.use(logger());
app.use(helmet());
app.use(cors());
app.use(koaBody());

app.use(require("./routes/spotifyLogin").routes());
app.use(require("./routes/spotifyCallback").routes());
app.use(require("./routes/spotifyCreatePlaylist").routes());

app.use(async ctx => {
  ctx.body = "Hello World";
});

app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});
