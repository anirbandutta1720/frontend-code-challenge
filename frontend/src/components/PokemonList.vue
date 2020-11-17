<template>
  <div id="pokemon-list" v-if="pokemons && pokemons.length">
    <PokemonCard v-for="pokemon of pokemons" v-bind:key="pokemon.id" :data="pokemon"/>
  </div>
</template>
<style lang="scss">
#pokemon-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
</style>
<script>
import axios from "axios";
import PokemonCard from "./PokemonCard.vue";

export default {
  name: "PokemonList",
  components: { PokemonCard },
  props: {
    showOnlyFavorite: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    pokemons: null,
    loading: true,
    errored: false
  }),
  async mounted() {
    try {
      var result = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql",
        data: {
          query: `query { pokemons(query: { limit: 100, offset: 0 }) { edges { id, name, image, sound, types, isFavorite } } }`
        }
      });
      this.pokemons = result.data.data.pokemons.edges;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>