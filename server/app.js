const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const results = require("./result");

const staticDir = process.env.NODE_ENV === "prodution" ? "./" : "../";
app.use(express.static(path.join(__dirname, staticDir, "dist/")));

app.get("/", (req, res) => {
  const htmlPath = path.resolve(__dirname, staticDir, "dist/index.html");
  const html = fs.readFileSync(htmlPath, "utf-8");
  res.send(html.toString());
});

app.get("/api/search", async (req, res) => {
  try {
    const resultsData = await Promise.all(new results(req.query.keyword));

    res.json({ error: 0, data: resultsData.filter(_ => _), msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: -1, data: [], msg: error.message });
  }
});

const port =
  parseInt(process.env.BLOCKLET_PORT || process.env.APP_PORT, 10) || 3000;

app.listen(port, err => {
  if (err) throw err;
  console.log(`> app ready on ${port}`);
});
