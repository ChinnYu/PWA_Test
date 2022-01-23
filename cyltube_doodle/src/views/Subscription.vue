<template>
  <div id="home" class="pa-4">
    <div v-if="isAuth">
      <v-container fluid>
        <v-alert prominent type="error" v-if="errored">
          <v-row align="center">
            <v-col class="grow">
              <div class="title">Error</div>
              <div>
                Something wrong!
              </div>
            </v-col>
            <v-col class="shrink">
              <v-btn @click="getVideos">ReLoad</v-btn>
            </v-col>
          </v-row>
        </v-alert>

        <main v-else>
          <v-row>
            <v-col cols="12">
              <h3 class="headline font-weight-medium mt-5">本周</h3>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3" v-for="(video, i) in loading ? 12 : videos" :key="i" class="mx-xs-auto">
              <v-skeleton-loader type="card-avatar" :loading="loading">
                <video-card :card="{ maxWidth: 350 }" :video="video" :channel="video.userId"></video-card>
              </v-skeleton-loader>
            </v-col>
            <v-col class="text-center" v-if="videos.length === 0 && !loading">
              <p>You haven't subscribed to any channel yet</p>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="12">
              <infinite-loading @infinite="getVideos">
                <div slot="spinner">
                  <v-progress-circular indeterminate color="red"></v-progress-circular>
                </div>
                <div slot="no-results"></div>
                <span slot="no-more"></span>
                <div slot="error" slot-scope="{ trigger }">
                  <v-alert prominent type="error">
                    <v-row align="center">
                      <v-col class="grow">
                        <div class="title">Error!</div>
                        <div>
                          Something went wrong
                        </div>
                      </v-col>
                      <v-col class="shrink">
                        <v-btn @click="trigger">ReLoad</v-btn>
                      </v-col>
                    </v-row>
                  </v-alert>
                </div>
              </infinite-loading>
            </v-col>
          </v-row>
        </main>
      </v-container>
    </div>
    <div v-else>
      <v-container fluid>
        <main>
          <v-row align="center" justify="center">
            <v-col cols="12" class="fill-height d-flex flex-column justify-center align-center">
              <v-icon size="20vh">mdi-youtube-subscription</v-icon>
            </v-col>
            <v-col cols="12" class="fill-height d-flex flex-column justify-center align-center">
              <span style="font-size: 3vh">別錯過新推出的影片</span>
            </v-col>
            <v-col cols="12" class="fill-height d-flex flex-column justify-center align-center">
              <span style="font-size: 1vh">登入後即可查看你最喜愛的 YouTube 頻道的最新動態</span>
            </v-col>
            <v-col cols="12" class="fill-height d-flex flex-column justify-center align-center">
              <v-btn tile outlined color="blue" class="font-weight-bold" v-if="!$store.getters.isAuthenticated" router to="/signin">
                <v-icon left size="26">mdi-account-circle</v-icon>
                Sign in
              </v-btn>
            </v-col>
          </v-row>
        </main>
      </v-container>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import moment from 'moment'

import VideoCard from '@/components/VideoCard'
import SubscriptionService from '@/services/SubscriptionService'
import {mapGetters} from "vuex";

export default {
  name: 'Subscription',
  watch:{
    getIsAuth(){
      this.isAuth = this.isAuthenticated
    }
  },
  data (){
    let vm = this;
    return {
      loading: false,
      loaded: false,
      errored: false,
      videos: [],
      page: 1,
      isAuth: vm.isAuthenticated
    }
  },
  methods: {
    async getVideos($state) {
      if (!this.loaded) {
        this.loading = true
      }

      const videos = await SubscriptionService.getSubscribedVideos(this.page)
        .catch((err) => {
          console.log(err)
          this.errored = true
        })
        .finally(() => {
          this.loading = false
        })

      if (typeof videos === 'undefined') return

      if (videos.data.data.length) {
        this.page += 1
        this.videos.push(...videos.data.data)
        $state.loaded()
        this.loaded = true
      } else {
        $state.complete()
      }
    },
    dateFormatter(date) {
      return moment(date).fromNow()
    }
  },
  components: {
    ...mapGetters(['isAuthenticated']),
    VideoCard,
    InfiniteLoading
  },
  mounted() {
    // this.getVideos()
  }
}
</script>

<style lang="scss">
.card {
  background: #f9f9f9 !important;
}
</style>
