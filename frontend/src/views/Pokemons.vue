<template>
  <div class="home">
    <PokemonList :showOnlyFavorite="showOnlyFavorite"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PokemonList from "@/components/PokemonList.vue";

export default {
  name: "pokemons",
  props: {
    showOnlyFavorite: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PokemonList
  }
};
</script>
