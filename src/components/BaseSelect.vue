<template>
  <div class="base-select__container">
    <input
      v-model.trim="search"
      type="search"
      class="base-select"
      placeholder="Search"
      @input="handleInput"
    />
    <ul v-show="isItems" class="base-select__list">
      <li
        v-for="item in filteredItems"
        :key="item.uuid"
        class="base-select__item"
        @click="handleClickOption(item.text)"
      >
        <slot :item="item"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
import { logger } from '../helpers/services/logger';

export default {
  name: 'BaseSelect',

  props: {
    value: {
      type: String,
      default: '',
    },
    getItems: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      search: this.value,
      filteredItems: [],
      isOpenSelect: false,
    };
  },

  computed: {
    isItems() {
      return this.filteredItems.length !== 0 && this.isOpenSelect;
    },
  },

  watch: {
    search(newVal) {
      this.$emit('input', newVal);

      if (!newVal) {
        this.$emit('update:value', this.search);
        this.filteredItems = [];
      }
    },
  },

  mounted() {
    window.addEventListener('click', this.handleClickOutside);
  },

  destroyed() {
    window.removeEventListener('click', this.handleClickOutside);
  },

  methods: {
    async handleInput() {
      try {
        let res = await this.getItems(this.search).resolve();
        if (res && this.search) {
          this.filteredItems = res;
          this.isOpenSelect = true;
        }
      } catch (e) {
        logger(e);
      }
    },

    handleClickOption(text) {
      this.isOpenSelect = false;
      this.search = text;
      this.$emit('update:value', text);
    },

    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpenSelect = false;
        this.search = this.value;
      }
    },
  },
};
</script>

<style lang="scss">
.base-select {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 0.875rem;
  background: transparent;

  &__container {
    width: 15rem;
    height: 2.5rem;
    position: relative;
    border-radius: 0.25rem;
    border: 1px solid var(--light-gray-color);
    padding: 0.2rem 1rem;
    &:focus {
      outline: none;
    }
  }

  &__list {
    position: absolute;
    z-index: 1;
    min-height: 2.5rem;
    max-height: 5rem;
    margin: 0;
    left: -1px;
    right: -0.5px;
    border-radius: 0 0 0.25rem 0.25rem;
    border: 1px solid var(--light-gray-color);
    overflow-y: auto;
    background: white;
    padding: 0;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }

    &::-webkit-scrollbar-track {
      width: 0.25rem;
      background: var(--light-gray-color);
    }

    &::-webkit-scrollbar-thumb {
      width: 0.25rem;
      background: var(--dark-gray-color);
      border-radius: 2px;
    }
  }

  &__item {
    transition: background 0.3s ease;
    cursor: pointer;
    height: 2.5rem;
    display: flex;
    align-items: center;
    padding: 0 0.25rem;
    font-size: 0.875rem;

    &:hover {
      background: var(--light-gray-color);
    }
  }
}
</style>
