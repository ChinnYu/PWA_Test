import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    flag: false
  },
  getters: {
    getDrawer: (state) => {
      return state.flag
    }
  },
  mutations: {
    setDrawer(state, flag) {
      console.log("進來了M" + flag);
      state.flag = !state.flag;
    },
    addComment(state, comment) {
      // console.log('hello', comment)
      state.comments.data.unshift(comment)
      // console.log(state.comments.data)
    }
  },
  actions: {
    setDrawerAction({ commit }, flag) {
      console.log("進來了" + flag);
      commit('setDrawer', flag)
    },
    addComment({ commit }, comment) {
      commit('addComment', comment)
    }
  }
}
