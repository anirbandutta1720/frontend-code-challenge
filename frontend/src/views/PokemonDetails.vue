<template>
  <div class="pokemon-details" v-if="pokemonInfo">
    <PokemonInfo :data="pokemonInfo" @onPokemonStausChange="onPokemonStausChange"/>
    <div class="evolution" v-if="pokemonInfo.evolutions.length>0">
      <h3>Evolutions</h3>
      <div class="pokemon-list">
        <PokemonCard
          v-for="pokemon of pokemonInfo.evolutions"
          v-bind:key="pokemon.id"
          :data="pokemon"
          @onPokemonStausChange="onPokemonStausChange"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.pokemon-details .evolution {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #000;
  margin-bottom: 2em;
  h3 {
    margin: 10px 0 0 0;
    padding-left: 10px;
  }
  .pokemon-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
<script>
// @ is an alias to /src
import PokemonInfo from "@/components/PokemonInfo.vue";
import PokemonCard from "@/components/PokemonCard.vue";

import axios from "axios";
export default {
  name: "pokemon-details",
  data: () => ({
    pokemonInfo: null
  }),
  components: {
    PokemonInfo,
    PokemonCard
  },
  methods: {
    async getPokemonDetails() {
      let result = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql",
        data: {
          query: `query pokemonByName($name: String!) {
                    pokemonByName(name: $name) {
                        id
                        name
                        image
                        sound
                        classification
                        types
                        isFavorite
                        evolutions {
                            id
                            name
                            image
                            isFavorite
                        }
                        maxCP
                        maxHP
                        weaknesses
                        weight {
                            minimum
                            maximum
                        }
                        height{
                            minimum
                            maximum
                        }
                    }
                }`,
          variables: {
            name: this.$route.params.name
          }
        }
      });
      this.pokemonInfo = result.data.data.pokemonByName;
    },
    onPokemonStausChange() {
      this.getPokemonDetails();
    }
  },
  mounted() {
    try {
      this.getPokemonDetails();
    } catch (error) {
      console.error(error);
    }
  },
  watch: {
    '$route.params.name': function(newVal, oldVal) {
      this.getPokemonDetails();
    }
  },
};
</script>
