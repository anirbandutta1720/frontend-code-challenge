<template>
  <div class="pokemon-list-wraper">
    <div class="pokemon-header">
      <div id="nav">
        <router-link to="/">All</router-link>
        <router-link to="/favorites">Favorites</router-link>
      </div>
      <div class="filter-bar">
        <div>
          <input type="text" placeholder="Search" v-model="txtSearch" v-on:keyup="getPokemonList">
          <select v-on:change="getPokemonList" v-model="typeSelected">
            <option disabled selected value="null">Type</option>
            <option value="all">All</option>
            <option v-for="type of pokemonTypes" v-bind:key="type">{{type}}</option>
          </select>
        </div>
        <div>
          <button
            class="btn-list"
            v-on:click="updateViewOption('list')"
            v-bind:class="{'selected':this.$store.state.viewOption==='list'}"
          >
            <svg
              enable-background="new 0 0 26 26"
              id="Слой_1"
              version="1.1"
              viewBox="0 0 26 26"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <path
                  d="M24.25,12.25H1.75C1.3359375,12.25,1,12.5859375,1,13s0.3359375,0.75,0.75,0.75h22.5   c0.4140625,0,0.75-0.3359375,0.75-0.75S24.6640625,12.25,24.25,12.25z"
                  fill="#1D1D1B"
                ></path>
                <path
                  d="M24.25,16.75H1.75C1.3359375,16.75,1,17.0859375,1,17.5s0.3359375,0.75,0.75,0.75h22.5   c0.4140625,0,0.75-0.3359375,0.75-0.75S24.6640625,16.75,24.25,16.75z"
                  fill="#1D1D1B"
                ></path>
                <path
                  d="M24.25,21.75H1.75C1.3359375,21.75,1,22.0859375,1,22.5s0.3359375,0.75,0.75,0.75h22.5   c0.4140625,0,0.75-0.3359375,0.75-0.75S24.6640625,21.75,24.25,21.75z"
                  fill="#1D1D1B"
                ></path>
                <path
                  d="M1.75,4.75h22.5C24.6640625,4.75,25,4.4140625,25,4s-0.3359375-0.75-0.75-0.75H1.75   C1.3359375,3.25,1,3.5859375,1,4S1.3359375,4.75,1.75,4.75z"
                  fill="#1D1D1B"
                ></path>
                <path
                  d="M24.25,7.75H1.75C1.3359375,7.75,1,8.0859375,1,8.5s0.3359375,0.75,0.75,0.75h22.5   C24.6640625,9.25,25,8.9140625,25,8.5S24.6640625,7.75,24.25,7.75z"
                  fill="#1D1D1B"
                ></path>
              </g>
            </svg>
          </button>
          <button
            class="btn-grid"
            v-bind:class="{'selected':this.$store.state.viewOption==='grid'}"
            v-on:click="updateViewOption('grid')"
          >
            <svg
              id="Layer_1"
              style="enable-background:new 0 0 50 50;"
              version="1.1"
              viewBox="0 0 50 50"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g id="Layer_1_1_">
                <path d="M15,1H1v14h14V1z M13,13H3V3h10V13z"></path>
                <path d="M32,1H18v14h14V1z M30,13H20V3h10V13z"></path>
                <path d="M35,15h14V1H35V15z M37,3h10v10H37V3z"></path>
                <path d="M15,18H1v14h14V18z M13,30H3V20h10V30z"></path>
                <path d="M18,32h14V18H18V32z M20,20h10v10H20V20z"></path>
                <path d="M35,32h14V18H35V32z M37,20h10v10H37V20z"></path>
                <path d="M15,35H1v14h14V35z M13,47H3V37h10V47z"></path>
                <path d="M18,49h14V35H18V49z M20,37h10v10H20V37z"></path>
                <path d="M35,49h14V35H35V49z M37,37h10v10H37V37z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div id="pokemon-list" v-if="pokemons && pokemons.length">
      <PokemonCard
        v-for="pokemon of pokemons"
        v-bind:key="pokemon.id"
        :data="pokemon"
        @onPokemonStausChange="onPokemonStausChange"
      />
    </div>
  </div>
</template>
<style lang="scss">
#nav {
  border: solid 1px #71c1a1;
  a {
    font-weight: bold;
    color: #71c1a1;
    width: 50%;
    display: inline-block;
    text-decoration: none;
    padding: 5px;
    box-sizing: border-box;
    transition: all 0.3s ease-in;
    &.router-link-exact-active {
      color: #fff;
      background: #71c1a1;
    }
  }
}
#pokemon-list {
  display: flex;
  flex-wrap: wrap;
}
.pokemon-list-wraper {
  display: flex;
  flex-direction: column;
  .pokemon-header {
    padding: 10px;
    box-shadow: 1px 3px 4px 0px #dadada;
    position: sticky;
    top: 0;
    z-index: 9;
    background: #fff;
  }
  .filter-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
    div {
      display: flex;
      &:first-child {
        width: 90%;
      }
    }
    input,
    select {
      margin-right: 10px;
      background: #eee;
      padding: 7px 10px;
      border: none;
      color: #666;
    }
    input {
      width: 70%;
    }
    select {
      width: 30%;
    }
    button {
      width: 25px;
      height: 25px;
      padding: 0;
      margin: 5px 0 0 10px;
      border: none;
      outline: none;
      cursor: pointer;
      &.selected {
        svg {
          fill: #71c1a1;
          path {
            fill: #71c1a1;
          }
        }
      }
    }
    .btn-list {
      background-size: cover;
      background-color: transparent;
    }
    .btn-grid {
      background-size: cover;
      background-color: transparent;
    }
  }
}
</style>
<script>
import axios from "axios";
import PokemonCard from "./PokemonCard.vue";
//const allQuery = `query { pokemons(query: { limit: 100, offset: 0 }) { edges { id, name, image, sound, types, isFavorite } } }`;
//const favoriteQuery = `query { pokemons(query: { limit: 100, offset: 0, filter: {isFavorite: true} }) { edges { id, name, image, sound, types, isFavorite } } }`;
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
    showOnlyFavorite: function() {
      this.getPokemonList();
    }
  },
  data: () => ({
    pokemons: null,
    txtSearch: null,
    typeSelected: null,
    pokemonTypes: []
  }),
  methods: {
    async getPokemonList() {
      const queryString = `query { pokemons(query: { limit: 100, offset: 0, search:"${this
        .txtSearch || ""}",
      ${
        this.typeSelected && this.typeSelected !== "all"
          ? `filter: {type: "${this.typeSelected}", ${
              this.showOnlyFavorite ? `isFavorite: true` : ``
            }}`
          : `${this.showOnlyFavorite ? `filter: {isFavorite: true}` : ``}`
      } }) { edges { id, name, image, sound, types, isFavorite } } }`;
      let result = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql",
        data: {
          query: queryString
        }
      });
      this.pokemons = result.data.data.pokemons.edges;
    },
    async getPokemonTypes() {
      let result = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql",
        data: {
          query: `query { pokemonTypes }`
        }
      });
      this.pokemonTypes = result.data.data.pokemonTypes;
    },
    onPokemonStausChange() {
      this.getPokemonList();
    },
    updateViewOption(option) {
      this.$store.commit("saveViewOption", option);
    }
  },
  mounted() {
    try {
      this.getPokemonTypes();
      this.getPokemonList();
      if (this.$store.state.listPageY > 0) {
        setTimeout(()=>{
          window.scrollTo(0, this.$store.state.listPageY);
        },300);
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>