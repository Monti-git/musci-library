<template>
  <b-row>
    <b-col cols="12" md="4" align-self="center">
        <div class="image">
      <img :src="songs[0].artworkUrl100" />
        </div>
    </b-col>
    <b-col cols="12" md="8">
      <ul class = "list">
        <li v-for="song in songs" :key="song.trackId">
          {{ song.trackCensoredName }}
          <b-button target="_blank" :href="song.trackViewUrl" class="ml-auto">
              Buy
              ${{ song.trackPrice }}
              </b-button>
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>
export default {
    name : "SongsDisplay",
    props:['songs']
}
</script>

<style scoped>
.image{
    text-align: center;
}
.image img{
    max-width: 250px;
    width: 100%;
}
.list{
    padding : 0;
    max-height: 500px;
    overflow-y: auto;
    margin-top: 2em;
}
.list li{
    list-style: none;
    padding : 5px 10px;
    border-bottom: solid 1px rgba(0, 0, 0, 0.6);
    background: rgba(0, 0, 0, 0.03);
    display: flex;
}
.list li:hover{
    background: rgba(0, 0, 0, 0.13);
}
</style>