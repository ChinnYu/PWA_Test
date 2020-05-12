<template>
    <div class="page-index">
        <h2>Hello LAVAS</h2>
        <h4>[ˈlɑ:vəz]</h4>
        <router-link to="/second">second</router-link>
        <p>當前按鈕點了{{$store.state.button.count}} 下</p>
        <button @click="clickButton">點我</button>
        <img :src="img">
<!--        assets 不是路徑，會重製-->
        <img src="assets/android-chrome-192x192.png">
        <img src="static/img/icons/android-chrome-192x192.png">
    </div>
</template>

<script>
    import img from '@/assets/android-chrome-192x192.png';
    import axios from 'axios';
function setState(store) {}

export default {
    name: 'index',
    metaInfo: {
        title: 'Home',
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    },
    async asyncData({store, route}) {
        //通常從後端獲取初始數據
        // let count = await axios('path/to/count',{method:'get'});
        store.state.button.count = 100;
        setState(store);
    },
    data(){
        return{
            img
        }
    },
    methods:{
        clickButton(){
            this.$store.dispatch('button/click');
        }
    }
};
</script>

<style lang="stylus" scoped>

.page-index
    display flex
    justify-content center
    align-items center
    flex-direction column

    h2
        font-size 46px
        font-weight 500
        margin-bottom 0

</style>
