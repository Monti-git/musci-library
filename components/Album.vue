<template>
  <b-col align-v="stretch" cols="6" sm="4" lg="3" class="album">
    <nuxt-link :to="`/artist/${album.artistName}/${album.collectionName}`">
      <div class="imageContainer">
        <img :src="album.artworkUrl100" />
      </div>
      <div class="albumInfo">
        <p>{{ album.collectionName }}</p>
        <p class="albumPrice">${{ album.collectionPrice }}</p>
        <!-- {{ album.releaseDate }} -->
      </div>
    </nuxt-link>
  </b-col>
</template>

<script>
export default {
  name: 'Album',
  props: ['album']
}
</script>

<style scoped>
.album {
  padding: 1em;
  color: rgba(115, 115, 115, 1);
  text-align: center;
}
.album a {
  color: inherit;
}

.imageContainer {
  width: 100%;
  height: 210px;
  overflow: hidden;
  position: relative;
}
.imageContainer img {
  height: 100%;
  transition: all 0.4s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.album:hover {
  color: black;
}
.album:hover img {
  height: 120%;
}
.albumPrice {
  margin-bottom: 0;
}
</style>