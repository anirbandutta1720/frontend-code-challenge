import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    viewOption: "grid",
    listPageY: 0
  },
  mutations: {
    saveViewOption: (state, option) => {
      state.viewOption = option;
    },
    saveScrollPosition: (state, pos) => {
      state.listPageY = pos;
    }
  },
  actions: {}
});
