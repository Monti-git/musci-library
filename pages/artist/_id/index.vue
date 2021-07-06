<template>
  <div>
    <div v-if="artistAlbums">
      <b-row class="filterbar">
        <b-col cols="12" md="6">
          <h1>{{ artistName }}</h1>
        </b-col>
        <b-col cols="12" md="6" class="filters">
          <b-row class = "mb-1">
            <b-col cols = "2">
              <label for="album-query"> Search: </label>
            </b-col>
            <b-col cols = "10">
              <b-form-input v-model="albumq" id="album-query" />
            </b-col>
          </b-row>
          <div>
            <span>Order :</span>
            <b-button variant="outline-info" v-on:click="filterByName">
              <span v-show="!filterName">A-Z</span>
              <span v-show="filterName">Z-A</span>
            </b-button>
            <b-button variant="outline-info" v-on:click="filterByDate">
              <span v-show="filterDate">LATEST</span>
              <span v-show="!filterDate">OLDEST</span>
            </b-button>
            <b-button variant="outline-info" v-on:click="filterByPrice">
              <span v-show="!filterPrice">$ - $$$</span>
              <span v-show="filterPrice">$$$ - $</span>
            </b-button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <Album
          v-for="album in artistAlbumsCopy"
          :key="album.collectionId"
          :album="album"
        />
      </b-row>
    </div>
    <h1 v-else>No albums found for {{ artistName }}</h1>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Album from '../../../components/Album.vue'
export default {
  components: {
    Album,
  },
  data() {
    return {
      albumq: '',
      filterName: false,
      filterDate: false,
      filterPrice: false,
      artistName: '',
    }
  },
  async asyncData({ params }) {
    const artistName = params.id
    try {
      const artistAlbums = (await axios.get(`/api/artist/${artistName}/albums`))
        .data

      if (artistAlbums.length > 0) {
        return {
          albumq: '',
          artistName,
          artistAlbums,
          artistAlbumsCopy: [...artistAlbums],
        }
      } else {
        return { artistAlbums: false, artistName }
      }
    } catch (e) {
      return { artistAlbums: false, artistName }
    }
  },
  watch: {
    albumq: function (newQ, oldQ) {
      if (newQ != '') {
        const filteredAlbums = this.artistAlbums.filter((album) =>
          album.collectionName.toLowerCase().includes(newQ)
        )
        this.artistAlbumsCopy = filteredAlbums
      } else {
        this.artistAlbumsCopy = this.artistAlbums
      }
    },
  },
  methods: {
    filterByName() {
      let filteredAlbums = this.artistAlbumsCopy.sort((a, b) =>
        a.collectionName > b.collectionName ? 1 : -1
      )
      if (this.filterName) {
        filteredAlbums.reverse()
      }
      this.filterName = !this.filterName
      this.artistAlbumsCopy = filteredAlbums
    },
    filterByDate() {
      let filteredAlbums = this.artistAlbumsCopy.sort((a, b) =>
        a.releaseDate > b.releaseDate ? 1 : -1
      )
      if (this.filterDate) {
        filteredAlbums.reverse()
      }
      this.filterDate = !this.filterDate
      this.artistAlbumsCopy = filteredAlbums
    },
    filterByPrice() {
      let filteredAlbums = this.artistAlbumsCopy.sort((a, b) =>
        a.collectionPrice > b.collectionPrice ? 1 : -1
      )
      if (this.filterPrice) {
        filteredAlbums.reverse()
      }
      this.filterPrice = !this.filterPrice
      this.artistAlbumsCopy = filteredAlbums
    },
  },
}
</script>

