<template>
  <div>
    <div class="inputBox" :class="{'inputBox--focused' : isFocused}">

      <div class="inputBox__input">
        <input
          ref="inputElem"
          @blur="hideSuggestions"
          @focus="showSuggestions"
          v-model="searchText"
          type="text"
        />
      </div>

      <div class="inputBox__controls">
        <button @click="clearInputText" class="input-control-btn">X</button>
      </div>

      <div v-if="suggestionsVisibility" class="inputBox__suggestiongs">
        <div v-if="suggestions.length === 0" class="no-results">Nothing found</div>

        <div :key="suggestion.id" v-for="suggestion in suggestions" class="search-result">
          <slot name="suggestion" :suggestion="suggestion" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Autocomplete-input",
  props: {
    value: {
      type: String,
      default: ""
    },
    getItems: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      searchText: this.value,
      suggestions: [],
      suggestionsVisibility: false,
      prevPromise: null,
      isFocused: false
    };
  },
  watch: {
    searchText(val) {
      this.$emit("input", val);

      if (val.length === 0) {
        this.hideSuggestions();
      } else {
        this.showSuggestions();
      }

      if (this.prevPromise !== null) {
        this.prevPromise.abort();
      }

      this.getItems(val)
        .then(result => {
          this.prevPromise = result;
          return result.getResult();
        })
        .then(result => {
          this.suggestions = result;
          this.prevPromise = null;
        });
    }
  },
  methods: {
    hideSuggestions() {
      this.isFocused = false;

      this.suggestionsVisibility = false;
    },
    showSuggestions() {
      this.isFocused = true;
      
      if (this.searchText.length > 0) {
        this.suggestionsVisibility = true;
      }
    },
    clearInputText() {
      this.searchText = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox {
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background: #f5f5f5;
  cursor: text;

  &--focused {
    border: 1px solid #c2e3f2;
    background: #fff;
  }

  &__input {
    width: 100%;
    input {
      padding: 15px;
      border: none;
      width: 100%;
      outline: none;
      background: transparent;
    }
  }

  &__controls {
    display: flex;
  }

  &__suggestiongs {
    position: absolute;
    top: calc(100% + 1px);
    width: 100%;
    border-radius: 3px;
    background: #fff;
    overflow: hidden;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
}

.input-control-btn {
  padding: 15px;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;

  &:hover {
    background: #f2f2f2;
  }
}

.search-result {
  display: flex;
  align-items: center;
  padding: 10px;

  &:hover {
    background: #e6e6e6;
    cursor: pointer;
  }

  &__img {
    margin-right: 15px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1.5px solid red;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.no-results {
  text-align: center;
  padding: 25px 0;
  color: grey;
}
</style>