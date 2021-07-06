<template>
  <div>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
    </nav>
    <b-container class="mainContainer">
      <Nuxt />
    </b-container>
  </div>
</template>
<style>
h1 {
  font-size: 2em;
}
h2{
  font-size: 1.4em;
}
nav {
  position: sticky;
  height : 35px;
  top: 0;
  background: white;
  z-index: 1;
  padding: 5px 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.filterbar {
  position: sticky;
  top: 35px;
  background: white;
  z-index: 1;
  padding: 10px 0;
  box-shadow: 1px 2px 35px rgba(160, 160, 160, 0.195531);
}
.filterbar .filters{
  text-align: right;
}
.mainContainer {
  min-height: calc(100vh - 35px);
  box-shadow: 1px 2px 35px rgba(160, 160, 160, 0.195531);
}
</style>