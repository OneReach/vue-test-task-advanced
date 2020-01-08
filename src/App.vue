<template>
  <div id="app">
      <div class="question">
        <span>Favorite month</span>
        <input
            type="text"
            v-model="answer"
            @focus="isFocused = true"
            @blur="isFocused = false"
        />
        <Autocomplete
            :value="answer"
            :get-items="getItems"
            @input="(value) => { answer = value; isFocused = false }"
            :is-focused="isFocused"
        />
      </div>
  </div>
</template>

<script>
import Autocomplete from './components/Autocomplete.vue'

export default {
    name: 'app',
    components: {
        Autocomplete
    },
    data () {
        return {
            answer: '',
            isFocused: false,
            avaliableItems: [{
                id: 1,
                value: 'January',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Snow_flake.svg/989px-Snow_flake.svg.png'
            },{
                id: 2,
                value: 'July',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyplOGUz-21AC2uz7DWUrA2VoZCODGEW4Be6Kkj16MuJnSNW3rA&s'
            },{
                id: 3,
                value: 'June',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyplOGUz-21AC2uz7DWUrA2VoZCODGEW4Be6Kkj16MuJnSNW3rA&s'
            },{
                id: 4,
                value: 'August',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyplOGUz-21AC2uz7DWUrA2VoZCODGEW4Be6Kkj16MuJnSNW3rA&s'
            },{
                id: 5,
                value: 'April',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Snow_flake.svg/989px-Snow_flake.svg.png'
            }],
            filteredItems: []
        }
    },
    methods: {
        getItems(text) {
            return new Promise((resolve, reject) => {
                if (!text.length) reject();
                let filteredItems = this.avaliableItems.filter(item => {
                    return item.value.toLowerCase().indexOf(text.toLowerCase()) === 0;
                });
                resolve({
                    items: filteredItems,
                    abort() {
                        console.log('aborted')
                    }
                });
            });
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    justify-content: center;
}
.question {
    border-radius: 20px;
    background: #f4f5fa;
    width: 500px;
    padding: 20px;
    span {
        display: block;
        color: #999;
        font-size: 14px;
        margin-bottom: 10px;
    }
    input {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        font-size: 16px;
    }
}
</style>
