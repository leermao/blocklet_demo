const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const results = require("./result");

app.use(express.static(path.join(__dirname, "../dist/")));

app.get("/", (req, res) => {
  const htmlPath = path.resolve(__dirname, "../dist/index.html");
  const html = fs.readFileSync(htmlPath, "utf-8");
  res.send(html);
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

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
