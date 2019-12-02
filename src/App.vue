<template>
  <div id="app">
    <div class="container">
      <FilteredSelect 
        v-model="value"
        title="Search your country:"
        :getItems="getItems"
      >
        <template #selectItem="{ flag, name, region, nativeName }">
          <div class="country-item">
            <img
              :src="flag"
              :alt="name"
              :title="name"
              class="country-item__img"
            >
            <p class="country-item__name">
              {{ name }} - {{ region }} ({{ nativeName }})
            </p>
          </div>
        </template>
      </FilteredSelect>
    </div>
  </div>
</template>

<script>
  import FilteredSelect from './components/FilteredSelect'
  import getItems from './assets/js/helpers/get-items'
  

  export default {
    name: 'App',

    components: {
      FilteredSelect
    },

    data () {
      return {
        value: ''
      }
    },

    beforeCreate () {
      this.getItems = getItems
    }
  }
</script>

<style lang="scss">
  @import 'assets/styles/main.scss';

  .country-item {
    display: flex;
    align-items: center;

    &__img {
      width: 30px;
      height: 20px;
      margin-right: 10px;
    }
  }
</style>
