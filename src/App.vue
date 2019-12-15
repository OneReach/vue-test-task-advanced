<template>
  <div id="app">
    <BaseSelect :value.sync="value" :get-items="getItems">
      <template v-slot:default="{ item }">
        <img v-if="item.img" :src="item.img" :alt="item.text" class="base-select__item-img" />
        <span class="base-select__item-descr">{{ item.text }}</span>
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
  display: flex;
  align-items: center;
  justify-content: center;
}

* {
  box-sizing: border-box;
}

.base-select__item {
  &-img {
    width: 1.5rem;
    object-fit: contain;
    height: auto;
    border-radius: 50%;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }

  &-descr {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &:first-child {
      margin-left: 2rem;
    }
  }
}
</style>
