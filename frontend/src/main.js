import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (from.name === "pokemons") {
    store.commit("saveScrollPosition", window.pageYOffset);
  }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
