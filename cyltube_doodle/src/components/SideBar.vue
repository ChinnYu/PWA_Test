<template>
  <v-navigation-drawer v-model="drawer" app :clipped="$route.name !== 'Watch'" :temporary="$route.name === 'Watch'" id="nav">
<!--    <div>{{$route.name + "Sied"}}</div>-->
    <div tag="div" class="v-navigation-drawer__content" v-bar>
      <v-list dense nav class="py-0" tag="div">
        <v-list-item :class="{'hidden-lg-and-up': $route.name === 'Watch' ? false : true}">
          <v-app-bar-nav-icon @click="drwClick" class="mr-5"></v-app-bar-nav-icon>
          <v-toolbar-title class="font-weight-bold">CYLTube</v-toolbar-title>
        </v-list-item>
        <v-divider class="hidden-lg-and-up "></v-divider>
        <div class="mb-3"></div>
        <div v-for="parentItem in items" :key="parentItem.header">
          <v-subheader v-if="parentItem.header" class="pl-3 py-0 subtitle-1 font-weight-bold text-uppercase">
            {{ parentItem.header }}
          </v-subheader>
          <v-list-item v-for="(item, i) in parentItem.header === 'Subscriptions'? items[2].pages.slice(0, channelLength): parentItem.pages" :key="item.title" class="mb-0" :to="parentItem.header === 'Subscriptions'? '/channels/' + item.channelId._id: item.link" exact active-class="active-item">
            <v-list-item-icon v-if="parentItem.header !== 'Subscriptions'">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-avatar v-else class="mr-5">
              {{ i }}
              <v-avatar v-if="item.channelId.photoUrl !== 'no-photo.jpg' && item.channelId">
                <img :src="`${getUrl}/uploads/avatars/${item.channelId.photoUrl}`" :alt="`${item.channelId.channelName} avatar`"/>
              </v-avatar>
              <template v-else>
                <v-avatar color="red">
                    <span class="white--text headline ">
                      {{item.channelId.channelName.split('')[0].toUpperCase()}}
                    </span>
                </v-avatar>
              </template>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class=" font-weight-medium subtitle-2">
                {{parentItem.header === 'Subscriptions' ? item.channelId.channelName : item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-btn id="showBtn" @click="moreChannels" v-if="parentItem.header === 'Subscriptions' && isAuthenticated && items[2].length > 0" block text class="text-none">
            <v-icon>
              {{channelLength === 3 ? 'mdi-chevron-down' : 'mdi-chevron-up'}}
            </v-icon>
            {{channelLength === 3 ? `Show ${items[2].pages.length - 3} more ` : 'Show less' }}
          </v-btn>

          <v-divider v-if="parentItem.header !== false" class="mt-2 mb-2"></v-divider>
        </div>

<!--        <span v-for="link in links" :key="link.text">-->
<!--            <span v-if="link.text === 'Terms'" class="mb-2 d-block"> </span>-->
<!--            <v-btn href router :to="link.link" text class="text-capitalize px-1" small>{{ link.text + 555}}</v-btn>-->
<!--        </span>-->
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import SubscriptionService from '@/services/SubscriptionService'

export default {
  watch:{
    getDrawer(){
      this.drawer = this.getDrawer
    }
  },
  data (){
    let vm = this;
  return {
    drawer: vm.getDrawer,
    items: [
      {
        header: null,
        pages: [
          { title: '首頁', link: '/', icon: 'mdi-home' },
          { title: '探索', link: '/trending', icon: 'mdi-fire' },
          { title: '訂閱內容', link: '/subscriptions', icon: 'mdi-youtube-subscription'}
        ]
      },
      {
        header: null,
        pages: [
          { title: '媒體庫', link: '#l', icon: 'mdi-play-box-multiple'},
          { title: '觀看紀錄', link: '#history', icon: 'mdi-history'}
        ]
      },
      {
        header: 'Subscriptions',
        pages: [
        ]
      },
      {
        header: 'MORE FROM CYLTUBE',
        pages: [
          { title: 'CYLTube Premium', link: '/vp', icon: 'mdi-youtube'},
          { title: '遊戲', link: '#g', icon: 'mdi-youtube-gaming'},
          { title: '直播', link: '#li', icon: 'mdi-access-point'}
        ]
      },
      {
        header: null,
        pages: [
          { title: '設定', link: '#sg', icon: 'mdi-cog'},
          { title: '檢舉紀錄', link: '#rh', icon: 'mdi-flag'},
          { title: '說明', link: '#hp', icon: 'mdi-help-circle'},
          { title: '提供意見', link: '#f', icon: 'mdi-message-alert'}
        ]
      }
    ],
    links: [
      { text: 'About', link: '#' },
      { text: 'Press', link: '#' },
      { text: 'Copyrignt', link: '#' },
      { text: 'Contact us', link: '#' },
      { text: 'Creators', link: '#' },
      { text: 'Advertise', link: '#' },
      { text: 'Developers', link: '#' },
      { text: 'Terms', link: '#' },
      { text: 'Privacy', link: '#' },
      { text: 'Policy & Safety', link: '#' },
      { text: 'Test new features', link: '#' }
    ],
    channelLength: 0,
    searchText: ''
    // user: null
  }},
  props: ['drw'],
  computed: {
    ...mapGetters(['currentUser', 'getUrl', 'isAuthenticated','getDrawer'])
  },
  methods: {
    drawer_check(){
      console.log("消失了");
    },
    async drwClick(){
      let vm = this;
      console.log(vm.getDrawer);
      console.log("ggggg");
      // console.log(vm.flag);
      // vm.drawer = !vm.drawer;
      let temp = !vm.drawer;
      await vm.$store.dispatch('setDrawerAction',temp )
    },
    async getSubscribedChannels() {
      const channels = await SubscriptionService.getSubscribedChannels(
        this.currentUser._id
      ).catch((err) => console.log(err))
      this.items[2].pages = channels.data.data
      this.channelLength = 3
    },
    moreChannels() {
      if (this.channelLength === 3)
        this.channelLength = this.items[2].pages.length
      else this.channelLength = 3
    },
    signOut() {
      this.$store.dispatch('signOut')
      // this.$router.push('/')
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!to.query['search-query'] === '') return
      vm.searchText = to.query['search-query']
      // vm.getSearchResults(to.query['search-query'])
    })
  },
  mounted() {
    // if (this.$route.query['search-query'])
    //   this.searchText = this.$route.query['search-query']

    if (this.currentUser) this.getSubscribedChannels()
    // this.user = this.$store.getters.currentUser
    // console.log(this.user)
    this.drawer = this.$vuetify.breakpoint.mdAndDown ? false : true
    // console.log(this.$route.name)
    this.drawer = this.$route.name === 'Watch' ? false : this.drawer
  },
  created() {
    this.drawer = this.$route.name === 'Watch' ? false : this.drawer

    if (!this.isAuthenticated) {
      this.items[2].header = false
      // this.items[0].pages.pop()
    }
  }
}
</script>

<style lang="scss">
.v-list-item__avatar {
  justify-content: center !important;
}
#showBtn {
  .v-btn__content {
    justify-content: flex-start;

    i {
      margin-right: 30px;
    }
  }
}
#navbar {
  .active-item {
    .v-list-item__icon {
      color: red !important;
    }
  }
  .v-navigation-drawer__border {
    width: 0 !important;
  }

  .vuebar-element {
    height: 250px;
    width: 100%;
    max-width: 500px;
    background: #dfe9fe;
  }

  .vb > .vb-dragger {
    z-index: 5;
    width: 10px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0, 0, 0, 0);
    transform: rotate3d(0, 0, 0, 0);
    -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;
    transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;

    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .v-navigation-drawer__content:hover .vb > .vb-dragger > .vb-dragger-styler {
    width: 10px;
    background-color: #e0e0e0;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.3);
    background-color: rgba(255, 255, 255, 0.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    margin: 0px;
    width: 10px;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
  }
}
</style>
