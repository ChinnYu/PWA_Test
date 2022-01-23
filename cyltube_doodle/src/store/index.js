import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import sidebar from './modules/sidebar'
import doodle from './modules/doodle'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: { auth, sidebar, doodle}
})
