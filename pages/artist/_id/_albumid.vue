<template>
  <div>
    <div v-if="albumSongs">
      <h1>{{ albumName }}</h1>
      <SongsDisplay
        :songs="albumSongs"
      />
    </div>
    <h1 v-else>No songs found for {{ albumName }}</h1>
    <b-row v-if="relatedAlbums" class="mt-4">
      <b-col cols="12">
        <h2>More of {{ artistName }}</h2>
      </b-col>
      <Album
        v-for="album in relatedAlbums"
        :key="album.collectionId"
        :album="album"
      />
      <b-col align-self="center" class = "text-center">
        <nuxt-link :to="`/artist/${relatedAlbums[0].artistName}`">
          <b-button variant="outline-primary" size="lg">See all</b-button>
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Album from '../../../components/Album.vue'
import SongsDisplay from '../../../components/SongsDisplay.vue'
export default {
  name : "SongPage",
  components: {
    Album, SongsDisplay
  },
  data() {
    return {
      albumName: '',
      relatedAlbums: false,
      artistName: '',
    }
  },
  async asyncData({ params }) {
    const albumName = params.albumid
    const artistName = params.id
    try {
      const albumSongs = (
        await axios.get(`/api/artist/${artistName}/album/${albumName}`)
      ).data


      let relatedAlbums = (
        await axios.get(`/api/artist/${artistName}/albums`)
      ).data.slice(0, 10)

      relatedAlbums = relatedAlbums.filter(
        (album) => album.collectionName != albumName
      )
      if (relatedAlbums.length < 0) {
        relatedAlbums = false
      }
      if (albumSongs.length > 0) {
        return {
          albumName,
          artistName,
          albumSongs,
          relatedAlbums,
        }
      } else {
        return { albumSongs: false, albumName }
      }
    } catch (e) {
      console.log(e);
      return { albumSongs: false, albumName }
    }
  },
}
</script>

<style scoped>

</style>