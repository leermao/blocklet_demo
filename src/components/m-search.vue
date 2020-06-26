<template>
  <div class="hello">
    <div class="input-box">
      <Input v-model="keyword" placeholder="请输入查询内容：" class="input" />
      <Button type="success" @click="handleSearch">确定</Button>
    </div>

    <div class="search-box">
      <div v-for="(item, index) in list" :key="index" style="width:100%">
        <Card class="card-box" v-if="item.type === 1">
          <div slot="title">
            <div class="title-item">
              <Icon type="ios-bookmark" />
              <span class="name">来源：</span> {{ item.chain }}
            </div>
            <div class="title-item">
              <Icon type="ios-link" />
              <span class="name">类型：</span> {{ item.typeName }}
            </div>
          </div>

          <ul class="card-info">
            <li>
              <span class="name">Moniker:</span>
              <p>{{ item.des.moniker }}</p>
            </li>

            <li>
              <span class="name">Address:</span>
              <p>{{ item.des.address }}</p>
            </li>

            <li>
              <span class="name">Balance:</span>
              <p>{{ item.des.balance }}</p>
            </li>

            <li>
              <span class="name">NumAssets:</span>
              <p>{{ item.des.numAssets }}</p>
            </li>
          </ul>
        </Card>

        <Card class="card-box" v-if="item.type === 2">
          <div slot="title">
            <div class="title-item">
              <Icon type="ios-bookmark" />
              <span class="name">来源：</span> {{ item.chain }}
            </div>
            <div class="title-item">
              <Icon type="ios-link" />
              <span class="name">类型：</span> {{ item.typeName }}
            </div>
          </div>

          <ul class="card-info">
            <li>
              <span class="name">Transaction Hash:</span>
              <p>{{ item.des.hash }}</p>
            </li>

            <li>
              <span class="name">Block Height:</span>
              <p>{{ item.des.height }}</p>
            </li>

            <li>
              <span class="name">Time:</span>
              <p>{{ item.des.time }}</p>
            </li>

            <li>
              <span class="name">Sender:</span>
              <p>{{ item.des.tx.from }}</p>
            </li>

            <li>
              <span class="name">Receiver:</span>
              <p>{{ item.des.tx.itx.to }}</p>
            </li>

            <li>
              <span class="name">Moniker:</span>
              <p>{{ item.des.tx.itx.moniker }}</p>
            </li>
          </ul>
        </Card>

        <Card class="card-box" v-if="item.type === 3">
          <div slot="title">
            <div class="title-item">
              <Icon type="ios-bookmark" />
              <span class="name">来源：</span> {{ item.chain }}
            </div>
            <div class="title-item">
              <Icon type="ios-link" />
              <span class="name">类型：</span> {{ item.typeName }}
            </div>
          </div>

          <ul class="card-info">
            <li>
              <span class="name">Address:</span>
              <p>{{ item.des.address }}</p>
            </li>

            <li>
              <span class="name">Moniker:</span>
              <p>{{ item.des.moniker }}</p>
            </li>

            <li>
              <span class="name">Issuer:</span>
              <p>{{ item.des.issuer }}</p>
            </li>

            <li>
              <span class="name">Owner:</span>
              <p>{{ item.des.owner }}</p>
            </li>

            <li>
              <span class="name">Transferable:</span>
              <p>{{ item.des.transferrable ? "YES" : "NO" }}</p>
            </li>

            <li>
              <span class="name">Readonly:</span>
              <p>{{ item.des.readonly ? "YES" : "NO" }}</p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      keyword: "",
      list: [],
    };
  },
  methods: {
    async handleSearch() {
      try {
        const res = await axios.get(`/api/search?keyword=${this.keyword}`);

        this.list =
          res.status === 200 && res.data.error === 0 ? res.data.data : [];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.hello {
  padding: 20px;
  box-sizing: border-box;
}

.input {
  margin-right: 10px;
}

.input-box {
  display: flex;
  margin-bottom: 50px;
}

.search-box {
  display: flex;
  flex-wrap: wrap;
}

.card-box {
  text-align: left;
  width: 100%;
  margin-bottom: 10px;
}

.card-info {
  list-style: none;
}
.title-item {
  padding: 10px 0;
}

.name {
  font-weight: bold;
  display: inline-block;
}

li {
  margin-bottom: 10px;
}
</style>
