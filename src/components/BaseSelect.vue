<template>
  <div class="base-input__container">
    <div class="base-input__wrap">
      <input
        v-model.trim="search"
        type="search"
        class="base-input"
        placeholder="Search"
        @input="handleInput"
      />
    </div>
    <ul v-show="isItems" class="base-input__list">
      <li
        v-for="item in filteredItems"
        :key="item.uuid"
        class="base-input__item"
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
        if (res && !!this.search) {
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
.base-input {
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

    &:focus {
      outline: none;
    }
  }

  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 1rem;
    height: inherit;
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
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      width: 4px;
      background: var(--light-gray-color);
    }

    &::-webkit-scrollbar-thumb {
      width: 4px;
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

    img {
      width: 1.5rem;
      object-fit: contain;
      height: auto;
      border-radius: 50%;
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }

    span {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &:first-child {
        margin-left: 2rem;
      }
    }
  }
}
</style>
