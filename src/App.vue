<template>
  <div id="app">
    <div class="container">
      <AutocompleteInput v-model="searchValue" :title="title" :getItems="getItems" />
    </div>
  </div>
</template>

<script>
import AutocompleteInput from './components/AutocompleteInput'
import { MonthsList } from './mockData'

export default {
  name: 'App',

  components: {
    AutocompleteInput
  },

  data() {
    return {
      title: MonthsList.name,
      searchValue: ''
    }
  },

  methods: {
    getItems(searchValue) {
      var aborted = false
      return {
        abort: () => {
          aborted = true
          console.log('abort')
        },
        getItems: () =>
          new Promise((resolve, reject) => {
            let items = searchValue.length
              ? MonthsList.list.filter(item => {
                  return item.value.toLowerCase().indexOf(searchValue.toLowerCase()) === 0
                })
              : []

            //Server response delay simulation (to test abort)
            setTimeout(() => {
              !aborted && resolve(items)
            }, 500)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
