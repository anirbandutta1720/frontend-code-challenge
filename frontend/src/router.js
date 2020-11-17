import Vue from "vue";
import Router from "vue-router";
import Pokemons from "./views/Pokemons.vue";
import PokemonDetails from "./views/PokemonDetails.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "pokemons",
      component: Pokemons,
      props: { showOnlyFavorite: false }
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Pokemons,
      props: { showOnlyFavorite: true }
    },
    {
      path: "/pokemon/:name",
      name: "pokemon-details",
      component: PokemonDetails
    }
  ]
});
