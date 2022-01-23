import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment";
// import moment from "moment";

Vue.use(Vuex)

export default {
  state: {
    //datePicks: [{ "name": "Birthday", "color": "#2196F3", "start": 1642522500000, "end": 1642527900000, "timed": true,"pdate":"2022-01-20","pindex":moment().unix() }]
    datePicks: [],
    dTitle:null,
    dLoc:null,
    dNote:null,
    dPage:0
  },
  getters: {
    getDatePick: (state) => {
      return state.datePicks;
    },
    getdTitle: (state) => {
      return state.dTitle;
    },
    getdLoc: (state) => {
      return state.dLoc;
    },
    getdNote: (state) => {
      return state.dNote;
    },
    getdPage: (state) => {
      return state.dPage;
    },

  },
  mutations: {
    setDatePick(state, datePicks) {
      console.log("進來了D");
      state.datePicks.push(datePicks);
    },
    setdTitle(state, title) {
      console.log("進來了title");
      state.dTitle = title;
    },
    setdLoc(state, title) {
      console.log("進來了title");
      state.dLoc = title;
    },
    setdNote(state, title) {
      console.log("進來了title");
      state.dNote = title;
    },
    delDate(state, date) {
      let temp_date = [];
      state.datePicks.forEach(function (value) {
          if(moment(value['start']).format('YYYY-MM-DD') !== date){
            temp_date.push(value);
          }
      })
      state.datePicks= temp_date;
    },
    delDateByIndex(state, date_Index) {
      let temp_date = [];
      state.datePicks.forEach(function (value) {
        if(value['pindex'] !== date_Index){
          temp_date.push(value);
        }
      })
      state.datePicks= temp_date;
    },
    upDateDate(state, date_Item){
      // let temp_date = [];
      state.datePicks.forEach(function (value,index) {
        if(value['pindex'] === date_Item['pindex']){
          // console.log(value['pindex']);
          // console.log(date_Item['pindex']);
          for(let i=0; i< date_Item['change_items'].length;i++){
            // console.log((date_Item['change_items'])[i]);
            // console.log((state.datePicks[index])[(date_Item['change_items'])[i]]);
            console.log(date_Item[(date_Item['change_items'])[i]]);

            (state.datePicks[index])[(date_Item['change_items'])[i]] = date_Item[(date_Item['change_items'])[i]];
          }
        }
      })
      console.log(state.datePicks);
    },
    upDatePage(state, page){
      console.log("page");
      state.dPage = page;
    }
  },
  actions: {
    addDatePick({ commit }, datePick) {
      commit('setDatePick', datePick)
    },
    addDtitle({ commit }, title) {
      console.log("asdasd");
      commit('setdTitle', title)
    },
    addDNote({ commit }, title) {
      console.log("asdasd");
      commit('setdNote', title)
    },
    addDLoc({ commit }, title) {
      console.log("asdasd");
      commit('setdLoc', title)
    },
    delDatePick({ commit }, date) {
      commit('delDate', date)
    },
    delDatePickByIndex({ commit }, date_Index) {
      commit('delDateByIndex', date_Index)
    },
    upDateDatePick({ commit }, date_Item) {
      commit('upDateDate', date_Item)
    },
    upDatePageChose({ commit }, page) {
      commit('upDatePage', page)
    }
  }
}
