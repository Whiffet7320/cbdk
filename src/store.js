import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectJbxxByIdObj: null,
    pageSize: 10,
    page: 1,
    enumerationpageSize: 10,
    enumerationpage: 1,
    mapObj:null,
    getshape:null,
  },
  mutations: {
    selectJbxxByIdObj(state, str) {
      state.selectJbxxByIdObj = str;
    },
    pageSize(state, str) {
      state.pageSize = str;
    },
    page(state, str) {
      state.page = str;
    },
    enumerationpageSize(state, str) {
      state.enumerationpageSize = str;
    },
    enumerationpage(state, str) {
      state.enumerationpage = str;
    },
    mapObj(state, str) {
      state.mapObj = str;
    },
    getshape(state, str) {
      state.getshape = str;
    },
  },
  actions: {

  },
});
