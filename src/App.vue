<template>
  <div id="app">
    <div class="autocomplete-box">
      <p>Favorite movie</p>
      <Autocomplete
        class="autocomplete"
        v-model="value"
        :getItems="getItems"
        @select="onSelectHandler"
      >
        <template #option="{ item }">
          <Option :name="item.text" :img="item.img" />
        </template>
      </Autocomplete>
    </div>
  </div>
</template>

<script>
import Autocomplete from "./components/Autocomplete";
import movies from "./assets/data.js";
import Option from "./components/Option.vue";
export default {
  name: "App",
  components: {
    Autocomplete,
    Option,
  },
  data: function() {
    return {
      value: null,
    };
  },
  methods: {
    // HTTP call emulation
    // btw, I guess it's better to keep component stateless, without any business logic
    // it should be on VUEX actions or on a App component level for example
    async getItems(text) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = movies.filter((x) =>
            x.text.toLowerCase().includes(text.toLowerCase())
          );
          resolve(result);
        }, 200);
      }).then((res) => res);
    },
    // custom on select event, but v-model also works well
    onSelectHandler(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .autocomplete-box {
    max-width: 350px;
    margin: 5px auto;
    background-color: #e4eaf7;
    border-style: none;
    border-radius: 5px;
    p {
      text-align: left;
      margin: 0;
      padding: 0 5px;
      color: #969696;
    }
    .autocomplete {
      display: flex;
      flex-direction: column;
      padding: 5px;
    }
  }
}
</style>
