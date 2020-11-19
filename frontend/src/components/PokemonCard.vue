<template>
  <div class="pokemon-card" v-bind:class="{'display-list':this.$store.state.viewOption==='list'}">
    <div class="pokemon-image">
      <router-link :to="'/pokemon/'+data.name">
        <img v-bind:src="data.image" alt="data.name">
      </router-link>
    </div>
    <div class="pokemon-details" v-bind:class="{short: !data.types}">
      <div class="text">
        <h3>{{data.name}}</h3>
        <h5 v-if="data.types">{{data.types.join(", ")}}</h5>
      </div>
      <div class="action">
        <button
          class="add-to-favorite"
          v-bind:title="data.isFavorite ? 'remove this pokemon from favorite list': 'add this pokemon to favorite list'"
          v-bind:class="{loved: data.isFavorite}"
          v-on:click="handleFavoriteClick"
        >
          <svg
            height="128px"
            id="Layer_1"
            style="enable-background:new 0 0 128 128;"
            version="1.1"
            viewBox="0 0 128 128"
            width="128px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M114.097,45.788  c0-13.608-11.032-24.642-24.641-24.642c-9.603,0-19.982,7.071-25.456,13.521c-5.393-6.387-15.855-13.52-25.457-13.52  c-13.609,0-24.642,11.032-24.642,24.64c0,25.742,32.628,46.341,50.099,61.065C81.47,92.129,114.097,71.654,114.097,45.788z"
              style="fill:none;stroke:#c00;stroke-width:11.9795;stroke-miterlimit:10;"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.pokemon-card {
  display: flex;
  width: calc(25% - 20px);
  border: solid 1px #ddd;
  margin: 10px;
  flex-direction: column;
  box-sizing: border-box;
  &.display-list {
    width: 100%;
    flex-direction: row;
    margin: 5px 10px;
    &:first-child {
      margin-top: 10px;
    }
    .pokemon-image {
      justify-content: center;
      flex: unset;
      padding: 5px;
      min-width: 80px;
      img {
        width: 60px;
      }
    }
    .pokemon-details {
      max-height: 150px;
      align-items: center;
    }
  }
  .pokemon-image {
    flex: 3;
    padding: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
    img {
      width: 100%;
    }
  }
  .pokemon-details {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f3f3f3;
    max-height: 60px;
    &.short {
      max-height: 40px;
    }
    .text {
      display: flex;
      flex-direction: column;
      padding: 10px;
      text-align: left;
      h3 {
        font-size: 1rem;
        margin: 0;
      }
      h5 {
        margin: 0;
        font-weight: normal;
      }
    }
    .action {
      display: flex;
      justify-content: center;
      align-items: center;
      display: flex;
      .add-to-favorite {
        height: 20px;
        width: 20px;
        background-size: contain;
        border: none;
        margin-right: 15px;
        outline: none;
        cursor: pointer;
        background: transparent;
        svg {
          height: 20px;
          width: 20px;
          path {
            transition: all 0.3s ease-in;
          }
        }
        &.loved {
          svg path {
            fill: #c00 !important;
          }
        }
      }
    }
  }
}
</style>
<script>
import axios from "axios";
const mutationAddToFav = `mutation favoritePokemon($id: ID!){
                favoritePokemon(id: $id) {
                  id
                }
              }`;
const mutationRemoveFromFav = `mutation unFavoritePokemon($id: ID!){
                unFavoritePokemon(id: $id) {
                  id
                }
              }`;
export default {
  name: "PokemonCard",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleFavoriteClick(pid) {
      if (this.data.isFavorite) {
        this.updateFavoriteStatus(mutationRemoveFromFav);
      } else {
        this.updateFavoriteStatus(mutationAddToFav);
      }
    },
    async updateFavoriteStatus(queryInfo) {
      try {
        var result = await axios({
          method: "POST",
          url: "http://localhost:4000/graphql",
          data: {
            query: queryInfo,
            variables: {
              id: this.data.id
            }
          }
        });
        if (result.data) {
          this.$emit("onPokemonStausChange");
          this.$toast.open(
            this.data.isFavorite
              ? "Removed from favorite list"
              : "Added to favorite list"
          );
        } else {
          this.$toast.open({
            message: "Oops!! Something went wrong. Try again later",
            type: "error"
          });
        }
      } catch (error) {
        console.error(error);
        this.$toast.open({
          message: "Oops!! Something went wrong. Try again later",
          type: "error"
        });
      }
    }
  }
};
</script>
