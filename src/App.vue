<template>
  <div>
    <div class="box">
      <div class="autocomplete-label">Your favourite Simpsons character:</div>
      <AutocompleteInput :value="inputValue" :getItems="getItems" v-model="inputValue">
        <template v-slot:suggestion="{ suggestion }">
          <div class="search-result__img">
            <img :src="suggestion.img" />
          </div>
          <div class="search-result__label">{{ suggestion.name }}</div>
        </template>
      </AutocompleteInput>
    </div>
  </div>
</template>

<script>
import AutocompleteInput from "./components/AutocompleteInput";

export default {
  name: "Autocomplete-app",
  components: {
    AutocompleteInput
  },
  data() {
    return {
      inputValue: "",
      data: [
        {
          id: 1,
          name: "Barney Gumble",
          img:
            "https://www.image-illustration.net/wp-content/uploads/2017/11/sunrise-background-wallpaper-vector.jpg"
        },
        {
          id: 2,
          name: "Bart Simpson",
          img:
            "https://www.image-illustration.net/wp-content/uploads/2017/11/sunrise-background-wallpaper-vector.jpg"
        },
        {
          id: 3,
          name: "Clancy Wiggam",
          img:
            "https://www.image-illustration.net/wp-content/uploads/2017/11/sunrise-background-wallpaper-vector.jpg"
        },
        {
          id: 4,
          name: "Homer Simpson",
          img:
            "https://www.image-illustration.net/wp-content/uploads/2017/11/sunrise-background-wallpaper-vector.jpg"
        },
        {
          id: 5,
          name: "Lisa Simpson",
          img:
            "https://www.image-illustration.net/wp-content/uploads/2017/11/sunrise-background-wallpaper-vector.jpg"
        },
        {
          id: 6,
          name: "Maggie Simpson",
          img:
            "https://www.image-illustration.net/wp-content/uploads/2017/11/sunrise-background-wallpaper-vector.jpg"
        },
        {
          id: 7,
          name: "Marge Simpson",
          img:
            "https://www.image-illustration.net/wp-content/uploads/2017/11/sunrise-background-wallpaper-vector.jpg"
        },
        {
          id: 8,
          name: "Ned Flanders",
          img:
            "https://www.image-illustration.net/wp-content/uploads/2017/11/sunrise-background-wallpaper-vector.jpg"
        },
        {
          id: 9,
          name: "Ralf Wiggam",
          img:
            "https://www.image-illustration.net/wp-content/uploads/2017/11/sunrise-background-wallpaper-vector.jpg"
        }
      ]
    };
  },
  methods: {
    async getItems(text) {
      return {
        abort: () => {
          console.log(`Abort function called with value ${text}`);
        },
        getResult: () => {
          return new Promise((resolve, reject) => {
            resolve(this.filterItems(text));
          });
        }
      };
    },
    filterItems(text) {
      return this.data.filter(
        item => item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
      );
    }
  }
};
</script>

<style lang="scss">
body {
  background: #fff;
  margin: 0;
}

* {
  box-sizing: border-box;
}

.box {
  position: relative;
  width: 600px;
  padding: 45px 20px;
  background: #f4f5fa;
  margin: 50px auto;
  border-radius: 5px;
}

.autocomplete-label {
  font-size: 13px;
  color: grey;
  margin-bottom: 15px;
}

</style>
