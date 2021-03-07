<template>
  <div class="result-card">
    <img :src="img" class="img" />
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: "Option",
  props: {
    name: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: false,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.result-card {
  display: flex;
  flex-direction: row;
  margin: 5px auto;
  background-color: #fcfcfc;
  height: 60px;
  padding: 5px 20px;
  width: 300px;
  color: black;
  border-radius: 5px;

  .img {
    max-width: 54px;
    max-height: 54px;
    border-radius: 50px;
    border: solid 1px #000;
    margin-right: 10px;
  }

  &:hover {
    background-color: #dde1e5;
  }
}
</style>
