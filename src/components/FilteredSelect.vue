<template>
  <div class="select">
    <label class="select__wrapper">
      <h3 v-if="title" class="select__title">
        {{ title }}
      </h3>
      <div class="select__row">
        <input
          ref="input"
          type="text"
          class="select__input"
          @input="onInput"
          @blur="onBlur"
        >
        <transition name="fade">
          <button
            v-if="show"
            aria-label="close"
            class="select__close"
            @click="close"
          >
            <slot name="close">
              <span>x</span>
            </slot>
          </button>
        </transition>

        <transition name="fade">
          <ul v-if="!wasSelected && show" class="select-menu">
            <li
              v-for="(item, i) in items"
              :key="i"
              class="select-menu__item"
              @click="updateOption(item)"
            >
              <slot v-bind="item" name="selectItem" />
            </li>
          </ul>
        </transition>
      </div>
    </label>
  </div>
</template>

<script>

  export default {
    name: 'FilteredSelect',

    props: { 
      title: String,

      value: {
        type: String,
        default: ''
      },

      getItems: {
        type: Function,
        required: true
      }
    },

    data () {
      return {
        items: [],

        wasSelected: false
      }
    },

    computed: {
      show () {
        return this.items.length > 0
      }
    },

    watch: {
      async value (v) {
        this.items = await this.getItems(v)
        
        if (!this.items) {
          this.items = []
        }
      }
    },

    methods: {
      onInput (e) {
        this.wasSelected = false
        this.$emit('input', e.target.value)
      },

      onBlur () {
        if (!this.wasSelected) {
          this.clearInput()
        }
        this.$emit('blur')
      },

      clearInput () {
        this.$refs.input.value = ''
        this.$emit('input', '')
      },

      setInput (val) {
        this.$refs.input.value = val
        this.$emit('input', val)
      },

      close () {
        this.clearInput()
      },

      updateOption (item) {
        this.wasSelected = true
        this.setInput(item.name)
      }
    }
  }
</script>

<style lang="scss">
  .select {
    position: relative;
    padding: 30px 20px;
    margin: 10px 0;
    background-color: $c-grey;
    border-radius: $base-border-radius;

    &__title {
      margin-bottom: 20px;
      font-size: 18px;
    }

    &__row {
      position: relative;
    }

    &__close {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      min-width: 40px;
      cursor: pointer;

      span {
        font-size: 20px;
      }
    }

    &__input {
      font-size: 16px;
      line-height: 1.5;
      min-width: 100%;
      border: 0;
      border-radius: 5px;
      padding: 7px 15px 6px;
    }
  }

  .select-menu {
    min-width: 100%;
    position: absolute;
    top: 102%;
    left: 0;
    right: 0;
    background-color: $c-white;
    border-radius: 5px;
    border: 1px solid $c-grey-dark;
    max-height: 300px;
    overflow-y: auto;

    &__item {
      padding: 12px 15px 10px;
      cursor: pointer;

      @include transition(0.2);

      &:hover {
        background-color: $c-grey-dark;
      }
    }
  }
</style>
