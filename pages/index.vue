<template>
  <div>
    <h1>Welcome</h1>
    <h2>Browse your favorite artist's music</h2>
    <div class = "browser">
      <b-form-input placeholder="Artist's name" v-model="artistQuery" />
      <b-list-group>
        <b-list-group-item
          variant="light"
          href="#"
          v-for="artist in artistsList"
          :key="artist.artistId"
        >
          <nuxt-link :to="`/artist/${artist.artistName}`">{{
            artist.artistName
          }}</nuxt-link>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
var _ = require('lodash')

export default {
  data() {
    return {
      artistQuery: '',
      artistsList: [],
    }
  },

  watch: {
    artistQuery: function (newq, oldq) {
      if (newq != '') {
        this.debouncedQuery()
      } else {
        this.artistsList = []
      }
    },
  },
  methods: {
    getArtist: async function () {
      try {
        this.artistsList = (
          await axios.get(`/api/artist/${this.artistQuery}`)
        ).data
      } catch (e) {
        this.artistsList = []
      }
    },
    debouncedQuery: _.debounce(function () {
      this.getArtist()
    }, 300),
  },
}
</script>
<style scoped>
h1,
h2 {
  text-align: center;
}
.browser{
  max-width: 400px;
  width: 100%;
  margin: 1em auto;
}
.browser a{
  display : block;
  width: 100%;
}
</style>
