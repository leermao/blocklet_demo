const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const ForgeSDK = require("@arcblock/forge-sdk");

const chains = require("./chains");

// Connect to multi endpoints
chains.map(item => {
  ForgeSDK.connect(`${item.endpoint}/api`, { name: item.name });
});

const getConnResByChainName = async (input, chain) => {
  try {
    const recordMap = {
      0: "account",
      1: "transaction",
      2: "state",
    };

    const res = await Promise.all([
      ForgeSDK.getAccountState({ address: input }, { conn: chain.name }),
      ForgeSDK.getTx({ hash: input }, { conn: chain.name }),
      // ForgeSDK.getAssetState({ address: input }, { conn: chain }),
    ]);

    const hasResIndex = res.findIndex(item => item.state || item.info);

    if (hasResIndex === -1) {
      return null;
    }

    return {
      type: recordMap[hasResIndex],
      chain: chain.endpoint,
      des: res[hasResIndex].state || res[hasResIndex].info || null,
    };
  } catch (error) {
    return null;
  }
};

app.use(express.static(path.join(__dirname, "../dist/")));

app.get("/", (req, res) => {
  const htmlPath = path.resolve(__dirname, "../dist/index.html");
  const html = fs.readFileSync(htmlPath, "utf-8");
  res.send(html);
});

app.get("/api/search", async (req, res) => {
  const results = chains.map(item => {
    return getConnResByChainName(req.query.condition, item);
  });

  try {
    const resultsData = await Promise.all(results);

    res.json({ error: 0, data: resultsData.filter(_ => _), msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: -1, data: [], msg: error.message });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
