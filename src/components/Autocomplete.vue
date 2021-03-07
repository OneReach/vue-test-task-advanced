<template>
  <div>
    <div class="input-container">
      <input
        name="input"
        type="text"
        autocomplete="off"
        v-model="inputValue"
        v-click-outside="hide"
        @focus="focused = true"
        @input="onInputHandler"
      />
      <button @click="onClearClickHandler">X</button>
    </div>
    <div v-for="(item, index) of items" :key="index">
      <div v-if="focused" @click="onItemClickHandler(index)">
        <slot name="option" :item="item">
          {{ item.text }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  name: "Autocomplete",

  data: () => {
    return {
      focused: false,
      items: [],
      inputValue: "",
    };
  },
  props: {
    getItems: {
      type: Function,
      default: () => () => Promise.resolve([]),
    },
    value: {
      type: Object,
      default: () => null,
    },
  },
  watch: {
    value(newValue) {
      if (newValue === null) {
        this.inputValue = "";
        return;
      }

      this.inputValue = newValue.text;
    },
  },
  methods: {
    async onInputHandler() {
      this.items = await this.getItems(this.inputValue);
    },
    hide() {
      this.focused = false;
    },
    onItemClickHandler(index) {
      const item = this.items[index];
      this.items = [item]; // after selecting item should be only one available
      this.inputValue = item.text;
      this.$emit("input", item);
      this.$emit("select", item);
    },
    onClearClickHandler() {
      // set initial state
      this.focused = false;
      this.items = [];
      this.inputValue = "";
      this.$emit("input", null);
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: row;
  border: 1px solid grey;
  padding: 2px;
  input {
    flex-grow: 2;
    border: none;
    height: 25px;
    &:focus {
      outline: none;
    }
  }
  button {
    border: none;
    background: #ffff;
    color: #000;
    outline: none;
  }
}
</style>
