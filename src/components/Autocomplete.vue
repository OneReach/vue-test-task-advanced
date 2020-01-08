<template>
    <div class="container" :class="{ 'hidden': !isFocused }">
        <ul v-if="items && items.length">
            <li
                v-for="item of items"
                :key="item.id"
                @click="$emit('input', item.value)"
            >
                <img :src="item.img" :alt="item.name">
                {{ item.value }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Autocomplete',
    props: {
        value: String,
        getItems: Function,
        isFocused: Boolean
    },
    data () {
        return {
            some: 'sdfsf',
            items: [],
            promiseObj: {},
        }
    },
    async mounted () {
        try {
            this.items = await this.getItems(this.value);
        } catch (error) {
            this.items = [];
            console.log(error);
        }
    },
    watch: {
        value: async function () {
            try {
                // check if previos promise didn't resoleve - call 'abort'
                if (this.promiseObj.abort) this.promiseObj.abort();
                this.promiseObj = await this.getItems(this.value);
                // promise has resolved delete 'abort' method
                delete this.promiseObj.abort;
                this.items = this.promiseObj.items;
            } catch (error) {
                this.items = [];
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
    position: relative;
    &.hidden {
        opacity: 0;
    }
}
ul {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    list-style-type: none;
    background: #fff;
    border: 1px solid #999;
    li {
        display: flex;
        align-items: center;
        padding: 15px;
        font-size: 18px;
        &:hover {
            background: #999;
            cursor: pointer;
        }
        img {
            width: 22px;
            margin-right: 10px;
        }
    }
}
</style>
