const express = require("express");
const app = express();
const ForgeSDK = require("@arcblock/forge-sdk");

const chains = require("./chains");

// Connect to multi endpoints
chains.map(item => {
  ForgeSDK.connect(`${item.endpoint}/api`, { name: item.name });
});

const getOneConnectRes = async (input, chain) => {
  try {
    const res = await Promise.all([
      ForgeSDK.getAssetState({ address: input }, { conn: chain }),
      ForgeSDK.getTx({ hash: input }, { conn: chain }),
      ForgeSDK.getAssetState({ address: input }, { conn: chain }),
    ]);

    return res.filter(item => item.code === "OK");
  } catch (error) {
    return [];
  }
};

app.get("/api/search", async (req, res) => {
  const results = chains.map(item => {
    return getOneConnectRes(req.query.condition, item.name);
  });

  try {
    const resData = await Promise.all(results);
    const data = resData
      .reduce((pre, cur) => {
        return [...pre, ...cur];
      }, [])
      .filter(item => item.state || item.info);

    res.json({ error: 0, data, msg: "success" });
  } catch (error) {
    res.status(500);
    res.json({ error: -1, data: [], msg: error });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
