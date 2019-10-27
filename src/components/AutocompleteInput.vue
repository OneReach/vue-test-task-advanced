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
        <button v-if="searchText.length > 0" @click="clearInputText" class="input-control-btn">
          <svg
            style="width: 20px; height: 20px; margin-top: 5px;"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
            class="svg-inline--fa fa-times fa-w-11 fa-lg"
          >
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              class
            />
          </svg>
        </button>
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
        this.isFocused = true;
      } else {
        this.showSuggestions();
      }

      this.loadSuggestions(val);
    }
  },
  methods: {
    loadSuggestions(val) {
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
    },
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
  cursor: pointer;
  outline: none;
  border: none;
  opacity: 0.5;
  padding: 0 10px;
  background: transparent;

  &:hover {
    opacity: 1;
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