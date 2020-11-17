<template>
  <div class="pokemon-details-card">
    <div class="pokemon-image">
      <img v-bind:src="data.image" alt="data.name">
      <button class="btn-sound" v-on:click="playSound">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="93.038px"
          height="93.038px"
          viewBox="0 0 93.038 93.038"
          style="enable-background:new 0 0 93.038 93.038;"
          xml:space="preserve"
        >
          <g>
            <path
              d="M46.547,75.521c0,1.639-0.947,3.128-2.429,3.823c-0.573,0.271-1.187,0.402-1.797,0.402c-0.966,0-1.923-0.332-2.696-0.973
		l-23.098-19.14H4.225C1.892,59.635,0,57.742,0,55.409V38.576c0-2.334,1.892-4.226,4.225-4.226h12.303l23.098-19.14
		c1.262-1.046,3.012-1.269,4.493-0.569c1.481,0.695,2.429,2.185,2.429,3.823L46.547,75.521L46.547,75.521z M62.784,68.919
		c-0.103,0.007-0.202,0.011-0.304,0.011c-1.116,0-2.192-0.441-2.987-1.237l-0.565-0.567c-1.482-1.479-1.656-3.822-0.408-5.504
		c3.164-4.266,4.834-9.323,4.834-14.628c0-5.706-1.896-11.058-5.484-15.478c-1.366-1.68-1.24-4.12,0.291-5.65l0.564-0.565
		c0.844-0.844,1.975-1.304,3.199-1.231c1.192,0.06,2.305,0.621,3.061,1.545c4.977,6.09,7.606,13.484,7.606,21.38
		c0,7.354-2.325,14.354-6.725,20.24C65.131,68.216,64.007,68.832,62.784,68.919z M80.252,81.976
		c-0.764,0.903-1.869,1.445-3.052,1.495c-0.058,0.002-0.117,0.004-0.177,0.004c-1.119,0-2.193-0.442-2.988-1.237l-0.555-0.555
		c-1.551-1.55-1.656-4.029-0.246-5.707c6.814-8.104,10.568-18.396,10.568-28.982c0-11.011-4.019-21.611-11.314-29.847
		c-1.479-1.672-1.404-4.203,0.17-5.783l0.554-0.555c0.822-0.826,1.89-1.281,3.115-1.242c1.163,0.033,2.263,0.547,3.036,1.417
		c8.818,9.928,13.675,22.718,13.675,36.01C93.04,59.783,88.499,72.207,80.252,81.976z"
            ></path>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </button>
    </div>
    <div class="pokemon-details">
      <div class="details-row">
        <div class="text">
          <h3>{{data.name}}</h3>
          <h5>{{data.types.join(", ")}}</h5>
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
      <div class="details-row">
        <div class="bars">
          <div class="bar">
            <span class="cp-bar"></span>
            <span>CP: {{data.maxCP}}</span>
          </div>
          <div class="bar">
            <span class="hp-bar"></span>
            <span>HP: {{data.maxHP}}</span>
          </div>
        </div>
      </div>
      <div class="details-row">
          <div class="dimensions">
              <div class="dimension-block">
                  <span>Weight</span>
                  <span>{{data.weight.minimum}} - {{data.weight.maximum}}</span>
              </div>
              <div class="dimension-block">
                  <span>Height</span>
                  <span>{{data.height.minimum}} - {{data.height.maximum}}</span>
              </div>
          </div>
      </div>
    </div>
    <audio id="pokemonSound">
      <source :src="data.sound" type="audio/mpeg">Your browser does not support the audio element.
    </audio>
  </div>
</template>
<style lang="scss">
.pokemon-details-card {
  display: flex;
  width: calc(100% - 20px);
  border: solid 1px #ddd;
  margin: 10px;
  flex-direction: column;
  box-sizing: border-box;
  .pokemon-image {
    flex: 3;
    padding: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
    img {
      max-height: 400px;
    }
    .btn-sound {
      height: 25px;
      width: 25px;
      background-size: contain;
      border: none;
      margin-right: 15px;
      outline: none;
      cursor: pointer;
      background: transparent;
      position: absolute;
      left: 10px;
      bottom: 20px;
      svg {
        height: 25px;
        width: 25px;
        fill: #71c1a1;
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
  .pokemon-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: #f3f3f3;
    color: #000;
    .details-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px;
    }
    .text {
      display: flex;
      flex-direction: column;
      text-align: left;
      h3 {
        font-size: 1.5rem;
        margin: 0;
      }
      h5 {
        margin: 0;
        font-size: 1rem;
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
        outline: none;
        background: transparent;
        cursor: pointer;
        margin-right: 5px;
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
    .bars {
      flex-direction: column;
      display: flex;
      width: 100%;
      .bar {
        flex-direction: row;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 7px;
        span:first-child {
          display: flex;
          border-radius: 5px;
          height: 10px;
          width: 90%;
          &.cp-bar{
              background: #9e9eff;
          }
          &.hp-bar{
              background: #71c1a1;
          }
        }
        span:last-child {
          display: flex;
          margin-left: 15px;
          font-weight: bold;
          color: #000;
          font-size: 1rem;
          text-align: right;
        }
      }
    }
    .dimensions{
        display: flex;
        width: 100%;
        margin: -10px;
        border-top: solid 1px #ddd;
        .dimension-block{
            width: 50%;
            flex-direction: column;
            display: flex;
            padding: 10px;
            color: #000;
            &:first-child{
                border-right: solid 1px #ddd;
            }
            span:first-child {
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 10px;
            }
            span:last-child {
                font-weight: 500;
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
    playSound() {
      const soundElem = document.getElementById("pokemonSound");
      soundElem.play();
    },
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
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
