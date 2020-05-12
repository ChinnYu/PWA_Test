<template>
    <div>第二頁
        <router-link to="/">index</router-link>
        <p>當前按鈕點了{{$store.state.button.count}} 下</p>
        <button @click="clickButton">點我</button>
    </div>

</template>

<script>
    export default {
        methods:{
            clickButton(){
                this.$store.dispatch('button/click');
            }
        }
    }
</script>
