const express = require("express");
const app = express();
const api = require("./api");
const route = require("./route");
const path = require("path");

const staticDir = process.env.NODE_ENV === "prodution" ? "./" : "../";
app.use("/static", express.static(path.join(__dirname, staticDir, "dist/")));
app.use("/", route);
app.use("/api", api);

const custom_port = process.env.BLOCKLET_PORT || process.env.APP_PORT;
const port = parseInt(custom_port, 10) || 3000;

app.listen(port, err => {
  if (err) throw err;
  console.log(`> app ready on ${port}`);
});
