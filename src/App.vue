<template>
  <div id="app">
    <BaseSelect :value.sync="value" :get-items="getItems">
      <template v-slot:default="{ item }">
        <img v-if="item.img" :src="item.img" :alt="item.text" />
        <span>{{ item.text }}</span>
      </template>
    </BaseSelect>
  </div>
</template>

<script>
import BaseSelect from './components/BaseSelect.vue';
import { getItems } from './helpers/actions/getItems';

export default {
  name: 'App',
  components: {
    BaseSelect,
  },
  data() {
    return {
      getItems,
      value: '',
    };
  },
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  width: 100%;
  padding: 2rem;
}

* {
  box-sizing: border-box;
}
</style>
