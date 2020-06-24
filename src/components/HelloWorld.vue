<template>
  <div class="hello">
    <div class="input-box">
      请输入：
      <Input v-model="value" placeholder="Enter something..." class="input" />
      <Button type="success" @click="handleSearch">确定</Button>
    </div>

    <div>
      <Table :columns="columns1" :data="list"></Table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      value: "",
      list: [],
      columns1: [
        {
          title: "chain",
          key: "chain",
        },
        {
          title: "type",
          key: "type",
        },
        {
          title: "des",
          key: "des",
        },
      ],
    };
  },
  methods: {
    async handleSearch() {
      try {
        const res = await axios.get(`/api/search?condition=${this.value}`);

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
.input {
  width: 400px;
  margin-right: 10px;
}

.input-box {
  margin-bottom: 50px;
}
</style>
