<template>
  <v-app>
    <router-view name="NavBar"></router-view>
    <router-view name="StudioNavBar"></router-view>
<!--    <router-view name="SideBar"></router-view>-->
    <v-content
      :class="{
        'content-bg': ![
                'Home',
          'SignIn',
          'SignUp',
          'Dashboard',
          'Video',
          'Detail'
        ].includes(this.$route.name)
          ? true
          : false
      }"
    >
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.content-bg {
  background-color: #f9f9f9;
  /*background-color: #89f9f9;*/
}
.card {
  background: #f9f9f9 !important;
}
</style>
