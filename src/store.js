import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectJbxxByIdObj:{},
    pageSize:10,
    page:1,
  },
  mutations: {
    selectJbxxByIdObj(state, str){
      state.selectJbxxByIdObj = str;
    },
    pageSize(state, str){
      state.pageSize = str;
    },
    page(state, str){
      state.page = str;
    },
  },
  actions: {

  },
});
