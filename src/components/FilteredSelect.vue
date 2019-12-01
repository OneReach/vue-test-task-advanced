<template>
  <div class="select">
    <h3 v-if="title">{{ title }}</h3>

    <Loader :isLoading="isLoading"/>
    
    <input 
      type="text"
      @input="onInput"
      @blur="onBlur"
    >
  </div>
</template>

<script>
import Loader from './Loader'

export default {
  name: 'FilteredSelect',

  components: {
    Loader
  },

  props: { 
    title: String,

    isLoading: {
      type: Boolean,
      default: false
    },

    value: {
      type: String,
      default: ''
    },

    getItems: {
      type: Function,
      required: true
    }
  },

  mounted() {
    this.getItems()
  },

  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    },

    onBlur () {
      this.$emit('blur')
    }
  }
}
</script>

<style lang="scss">
  .select {
    position: relative;
    padding: 30px 15px;
    margin: 10px 0;
    background-color: $c-grey;
    border-radius: $base-border-radius;
  }
</style>