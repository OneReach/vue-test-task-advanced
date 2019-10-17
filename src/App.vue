<template>
  <div id="app">
    <div class="content">
      <Autocomplete
        v-model="value"
        :getItems="filterByLabel"
        class="content__autocomplete"
      >
        <template v-slot:item="{ item }">
          {{ item.label }}
        </template>
      </Autocomplete>
      <div class="content__value">
        Result:
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script>

import Autocomplete from './components/Autocomplete'
export default {
  name: 'app',
  components: { Autocomplete },
  data () {
    return {
      value: null,
      lastPromiseSuccess: true,
      items: [
        {
          label: "sample",
          id: 1
        },
        {
          label: "test",
          id: 2
        },
        {
          label: "Lorem",
          id: 5
        },
        {
          label: "test",
          id: 2
        },
        {
          label: "Lorem",
          id: 5
        }
      ]
    }
  },
  methods: {
    /* sample */
    filterByLabel (text = '') {
      return new Promise(resolve => {
        /* if (!this.lastPromiseSuccess) {
          const abortObj = {
            abort: (prevPromise) => {
              prevPromise.resolve()
              this.lastPromiseSuccess = true
            }
          }
          resolve(abortObj)
        } */

        const filtered = this.items.filter(el => el.label.toLowerCase().includes(text.toLowerCase()))

        setTimeout(() => {
          resolve(filtered)
        }, 100)
        /* this.lastPromiseSuccess = false */

      }).then(filteredItems => {
       /* this.lastPromiseSuccess = true */
        return filteredItems
      })
    }
  }
}
</script>
<style lang="scss">
  @import './assets/styles/index.scss';

  .content {
    background-color: #333;
    padding: 100px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__autocomplete {
      width: 300px;
    }

    &__value {
      width: 300px;
      padding: 40px;
      border-radius: 10px;
      background-color: yellowgreen;
      text-align: center;
    }
  }
</style>
