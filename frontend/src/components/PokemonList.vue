<template>
  <div id="app">
    <h2>Pagination</h2>
    <div class="tag-list" v-if="data">
      <div class="tag-list-item" v-for="pokemon in data.pokemons.edges">
        {{ pokemon.name }}
      </div>
      <div class="actions">
        <button v-if="showMoreEnabled" @click="showMore">Show more</button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const pageSize = 10

export default {
  name: 'app',
  data: () => ({
    page: 0,
    showMoreEnabled: true,
  }),
  apollo: {
    // Pages
    data: {
      // GraphQL Query
      query: gql`query { pokemons(query: { limit: 10, offset: 0 }) { edges { name, image, sound } } }`,
      // Initial variables
      variables: {
        page: 0,
        pageSize,
      },
    },
  }
}
</script>