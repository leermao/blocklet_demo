const ForgeSDK = require("@arcblock/forge-sdk");

ForgeSDK.connect(`https://playground.network.arcblockio.cn/api`, {
  name: "playground",
});

(async () => {
  try {
    const res = await ForgeSDK.getAssetState(
      { address: "zNKZUiDdX9WZFjfUHLED97Sc9kt4n4Q1rJcX" },
      { conn: "playground" }
    );

    console.log(res);
  } catch (error) {
    console.log(error);
  }
})();
