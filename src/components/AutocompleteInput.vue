<template>
  <div class="autocomplete">
    <span class="autocomplete_title">
      {{ title }}
    </span>

    <div v-click-outside="onClickOutside">
      <input type="search" class="autocomplete_input" @input="onInput" @focus="focused = true" v-model="searchText" />

      <ul v-if="focused && showDropDown" class="autocomplete-dropdown">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="autocomplete-dropdown_item"
          @click="onItemSelected(item)"
        >
          <img v-if="item.img" :src="item.img" :alt="item.value" />
          <span>{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  name: 'AutocompleteInput',

  directives: {
    clickOutside: vClickOutside.directive
  },

  props: {
    title: String,
    value: String,
    getItems: Function
  },

  data() {
    return {
      items: [],
      searchText: this.value,
      showDropDown: false,
      focused: false,
      itemWasSelected: false,
      currentRequest: null
    }
  },

  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      this.itemWasSelected = false
    },
    onClickOutside() {
      if (!this.itemWasSelected) {
        this.clear()
      }
    },
    clear() {
      this.$emit('input', '')
      this.searchText = ''
    },
    onItemSelected(item) {
      this.$emit('input', item.value)
      this.searchText = item.value
      this.focused = false
      this.itemWasSelected = true
    }
  },

  watch: {
    async value(v) {
      if (this.currentRequest) {
        this.currentRequest.abort()
      }
      this.currentRequest = this.getItems(v)
      try {
        this.items = await this.currentRequest.getItems(v)
        this.currentRequest = null
      } catch (error) {
        this.items = []
        console.error(error)
      }
    },
    items(v) {
      this.items.length > 0 ? (this.showDropDown = true) : (this.showDropDown = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  margin: 0 80px;
  background-color: $bg-grey;
  border-radius: 6px;
  font-family: Arial, Helvetica, sans-serif;

  &_title {
    font-weight: 400;
    color: $text-light-grey;
  }

  &_input {
    width: 100%;
    height: 40px;
    border: 1px solid $selection-grey;
    font-size: 16px;
    padding: 0px 12px;
    margin-top: 12px;
    font-family: Arial, Helvetica, sans-serif;
    -webkit-appearance: none;
  }
  .autocomplete-dropdown {
    position: absolute;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 30%;
    min-width: 200px;
    max-height: 320px;
    font-size: 16px;
    background-color: $bg-white;
    border: 1px solid $selection-grey;
    overflow-y: auto;
    &_item {
      padding: 12px 16px 10px;
      cursor: pointer;
      &:hover {
        background-color: $selection-grey;
      }
      img: {
        width: 30px;
      }
    }
  }
}
</style>
