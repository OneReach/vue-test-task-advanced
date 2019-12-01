<template>
  <div id="app">
    <div class="container">
      <FilteredSelect 
        v-model="value"
        :getItems="getItems"
      />

      <div>
        Value is: {{ value }}
      </div>
    </div>
  </div>
</template>

<script>
import FilteredSelect from './components/FilteredSelect'

export default {
  name: 'app',

  components: {
    FilteredSelect
  },

  data () {
    return {
      value: ''
    }
  },

  methods: {
    getItems () {
      console.log('yo')
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/main.scss';
</style>
