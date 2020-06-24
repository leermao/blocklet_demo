const ForgeSDK = require("@arcblock/forge-sdk");
const chains = require("./chains");

// Connect to multi endpoints
chains.map(item => {
  ForgeSDK.connect(`${item.endpoint}/api`, { name: item.name });
});

class result {
  constructor(keyword) {
    this.keyword = keyword;
    return this.getAlllRes(keyword);
  }

  async _getAccountStateRes(input, chain) {
    try {
      const res = await ForgeSDK.getAccountState(
        { address: input },
        { conn: chain.name }
      );

      if (res.code === "OK" && res.state) {
        return {
          type: "账户（Account）",
          chain: chain.endpoint,
          des: res.state,
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async _getTxRes(input, chain) {
    try {
      const res = await ForgeSDK.getTx({ hash: input }, { conn: chain.name });
      if (res.code === "OK" && res.info) {
        return {
          type: "交易（Transaction）",
          chain: chain.endpoint,
          des: res.info,
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async _getAssetStateRes(input, chain) {
    try {
      const res = await ForgeSDK.getAssetState(
        { address: input },
        { conn: chain.name }
      );
      if (res.code === "OK" && res.state) {
        return {
          type: "资产（Asset）",
          chain: chain.endpoint,
          des: res.state,
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async getConnResByChainName(input, chain) {
    const result = [
      this._getAccountStateRes(input, chain),
      this._getTxRes(input, chain),
      this._getAssetStateRes(input, chain),
    ];

    try {
      const res = await Promise.all(result);

      if (res.every(item => item === null)) {
        return null;
      }

      return res.find(item => item !== null);
    } catch (error) {
      return null;
    }
  }

  getAlllRes(keyword) {
    return chains.map(item => {
      return this.getConnResByChainName(keyword, item);
    });
  }
}

module.exports = result;
