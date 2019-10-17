<template>
  <div :class="['autocomplete', {'autocomplete--has-value': text}]">
    <label class="autocomplete__wrapper">
      <label
        class="autocomplete__label"
        @blur="clearItems"
      >
        <div class="autocomplete__value">
          {{ value ? value.label : '' }}
        </div>
        <!--input field-->
        <input
          ref="input"
          type="text"
          v-model="text"
          class="autocomplete__input"

          @input="checkItems"
          @focus="showList"
        >
        <!--clear button-->
        <button
          v-if="text"
          class="autocomplete__clear"
          @click="clearAll"
        >
          <slot name="clear">
            <svg viewBox="0 0 241.171 241.171">
              <path d="M138.138,120.754l99.118-98.576c4.752-4.704,4.752-12.319,0-17.011c-4.74-4.704-12.439-4.704-17.179,0
          l-99.033,98.492L21.095,3.699c-4.74-4.752-12.439-4.752-17.179,0c-4.74,4.764-4.74,12.475,0,17.227l99.876,99.888L3.555,220.497
          c-4.74,4.704-4.74,12.319,0,17.011c4.74,4.704,12.439,4.704,17.179,0l100.152-99.599l99.551,99.563
          c4.74,4.752,12.439,4.752,17.179,0c4.74-4.764,4.74-12.475,0-17.227L138.138,120.754z"/>
            </svg>
          </slot>
        </button>
      </label>
      <div v-show="isShown" class="autocomplete__body">
        <!--list-->
        <slot name="list">
          <ul v-if="list && list.length">
            <li
              v-for="(item, id) in list"
              :key="id"
              class="autocomplete__item"
              @click="emitItem(item)"
            >
              <slot
                name="item"
                :item="item"
              />
            </li>
          </ul>
        </slot>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Autocomplete',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    getItems: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      list: [],
      text: '',
      isShown: false,
      cancel: () => {}
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onExternalClick);
  },
  mounted() {
    document.addEventListener('click', this.onExternalClick);
  },
  methods: {
    checkItems (evt) {
      let text = evt ? evt.target.value : ''
      this.cancel()
      const helpPromise = new Promise(resolve => this.cancel = resolve)
      const race = Promise.race([helpPromise, this.getItems(text)])
      race.then(results => {
        this.list = results
      })
    },
    clearItems () {
      this.text = ''
    },
    showList (evt) {
      if (this.isShown) {
        this.hideList()
        this.$refs.input.blur()
        return
      }
      this.list = []
      this.checkItems(evt)
      this.isShown = true
    },
    clearAll () {
      this.text = ''
      this.$emit('input', null)
      this.isShown = false
      this.checkItems()
    },
    emitItem (item) {
      this.clearItems()
      this.$emit('input', item)
      this.$refs.input.blur()
    },
    onExternalClick(e) {
      if (!this.$el.contains(e.target) && this.isShown) {
        this.clearItems()
        this.hideList()
      }
    },
    hideList () {
      this.isShown = false
    }
  }
}
</script>
<style lang="scss">
  $autocomplete: autocomplete;
  /* colors */
  $c-background: #f4f5fa;
  $c-background-item: #fff;
  $c-border: #ccc;
  $c-border--active: #61add4;
  $c-focus: #e5e5e5;
  /* font */
  $f-primary: 'Helvetica Neue';
  /* paddings */
  $padding-left: 10px;
  $padding-right: 15px;

  /* title font styles */
  %field-style {
    padding: 0 $padding-right 0 $padding-left;
    font-family: $f-primary;
    font-size: 12px;
    line-height: 40px;
  }


  .#{$autocomplete} {
    display: inline-block;
    padding: 30px 15px;
    border-radius: 10px;
    background-color: $c-background;

    &__wrapper {
      display: block;
      position: relative;
    }

    &__label {
      position: relative;
      display: block;
      overflow: hidden;
    }

    &--has-value {
      .#{$autocomplete}__value {
        opacity: 0;
      }
    }

    &__value {
      position: absolute;
      top: 50%;
      left: $padding-left;
      transform: translateY(-50%);
    }

    &__input {
      width: 100%;
      border: 1px solid $c-border;
      border-radius: 5px;
      background-color: $c-background-item;
      outline: none;

      @extend %field-style;
    }

    &__body {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      max-height: 150px;
      overflow: auto;
    }

    &__item {
      display: block;
      background-color: $c-background-item;

      @extend %field-style;

      &:hover {
        background-color: $c-focus;
      }
    }

    &__clear {
      position: absolute;
      right: 8px;
      top: 50%;
      width: 12px;
      height: 12px;
      transform: translateY(-50%);
    }
  }
</style>
