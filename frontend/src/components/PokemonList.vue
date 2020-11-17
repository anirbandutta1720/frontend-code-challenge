<template>
  <div id="pokemon-list" v-if="pokemons && pokemons.length">
    <PokemonCard v-for="pokemon of pokemons" v-bind:key="pokemon.id" :data="pokemon" @onPokemonStausChange="onPokemonStausChange"/>
  </div>
</template>
<style lang="scss">
#pokemon-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
<script>
import axios from "axios";
import PokemonCard from "./PokemonCard.vue";
const allQuery = `query { pokemons(query: { limit: 100, offset: 0 }) { edges { id, name, image, sound, types, isFavorite } } }`;
const favoriteQuery = `query { pokemons(query: { limit: 100, offset: 0, filter: {isFavorite: true} }) { edges { id, name, image, sound, types, isFavorite } } }`;
export default {
  name: "PokemonList",
  components: { PokemonCard },
  props: {
    showOnlyFavorite: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showOnlyFavorite: function(newVal, oldVal) {
      this.getPokemonList();
    }
  },
  data: () => ({
    pokemons: null
  }),
  methods: {
    async getPokemonList() {
      let result = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql",
        data: {
          query: this.showOnlyFavorite ? favoriteQuery : allQuery
        }
      });
      this.pokemons = result.data.data.pokemons.edges;
    },
    onPokemonStausChange() {
      this.getPokemonList();
    }
  },
  mounted() {
    try {
      this.getPokemonList();
    } catch (error) {
      console.error(error);
    }
  }
};
</script>