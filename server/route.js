var express = require("express");
var router = express.Router();
const path = require("path");

const staticDir = process.env.NODE_ENV === "prodution" ? "./" : "../";

router.get("/", (req, res) => {
  const deviceAgent = req.headers["user-agent"].toLowerCase();
  const agentID = deviceAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );

  let renderPath = path.resolve(__dirname, staticDir, "dist/index.html");
  if (agentID) {
    renderPath = path.resolve(__dirname, staticDir, "dist/mobile.html");
  }

  res.sendFile(renderPath);
});
module.exports = router;
