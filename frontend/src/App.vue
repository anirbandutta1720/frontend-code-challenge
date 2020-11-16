<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">All</router-link>
      <router-link to="/favorites">Favorites</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  margin: 10px;
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
</style>
