var express = require("express");
var router = express.Router();
const results = require("./result");

router.get("/search", async (req, res) => {
  try {
    const resultsData = await Promise.all(
      new results(req.query.keyword.trim())
    );

    res.json({ error: 0, data: resultsData.filter(_ => _), msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: -1, data: [], msg: error.message });
  }
});

module.exports = router;
