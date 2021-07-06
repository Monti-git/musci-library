const express = require('express')
const app = express()
const itunes_fetcher = require('./Services/ItunesFetcher');

app.get('/echo/:what', (req, res) => {
    res.json(req.params)
})
app.get('/artist/:name',itunes_fetcher.artist_search);
app.get('/artist/:name/albums',itunes_fetcher.artist_albums);
app.get('/artist/:name/album/:albumname', itunes_fetcher.album_songs);

module.exports = {
   path: '/api',
   handler: app,
}