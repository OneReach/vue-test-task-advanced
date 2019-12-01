<template>
  <transition name="fade">
    <div v-show="isLoading" class="base-loader">
      <div class="lds-rolling" >
        <svg 
          :style="style" 
          viewBox="0 0 100 100"
          class="lds-rolling__svg"
        >
          <circle 
            cx="50" 
            cy="50" 
            fill="none" 
            class="lds-rolling__circle"
            r="35" 
            stroke-dasharray="164.93361431346415 56.97787143782138" 
            transform="rotate(47.7194 50 50)"
          />
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Loader',

    props: {
      isLoading: {
        type: Boolean,
        default: false
      },

      width: {
        type: Number,
        default: 30
      },
      
      height: {
        type: Number,
        default: 30
      }
    },

    computed: {
      style () {
        return {
          height: `${this.height}px`,
          width: `${this.width}px`
        }
      }
    }
  }
</script>

<style lang="scss">
  .base-loader {
    @include fully();
    z-index: 999;
  }

  .lds-rolling {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    &::after {
      @include fully();
      z-index: -1;
      content: '';
      background: rgba($c-black, 0.1);
      border-radius: $base-border-radius;
    }

    &__svg {
      position: relative;
      animation: lds-rolling 1s linear infinite;
    }

    &__circle {
      stroke: $c-red;
      stroke-width: 3px;
    }
  }

  @keyframes lds-rolling {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
