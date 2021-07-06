const { Nuxt, Builder } = require('nuxt')
// eslint-disable-next-line no-unused-vars
const request = require('supertest')
const nuxtConfig = require('../nuxt.config.js')
import api from '../api';
// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null

// Init Nuxt.js and create a server listening on localhost:4000
beforeAll(async () => {
  // const config = {
  //   dev: process.env.NODE_ENV === 'production',
  //   rootDir: resolve(__dirname, '../'),
  //   mode: 'universal',
  //   plugins,
  //   modules
  // }

  nuxt = new Nuxt({...nuxtConfig, server: { port: 3000}, buildDir: '.nuxt-build-jest'})

  await new Builder(nuxt).build()

  await nuxt.server.listen(3000, 'localhost')
}, 300000)

// Example of testing only generated html
describe('GET /', () => {
  test('Route / exits and render HTML', async () => {
    const { html } = await nuxt.server.renderRoute('/', {})

    expect(html).toContain("Browse your favorite artist's music")
  })
})
//no albums for unexisting artist
describe('GET /artist/mockArtist', () => {
  test('Shows no albums for unexisting artist', async () => {
    const { html } = await nuxt.server.renderRoute('/artist/mockArtist-non-existant-12312', {})
    expect(html).toContain("No albums found for")

  })
})

//no songs for unexisting artist/album
describe('GET /artist/mockArtist', () => {
  test('Shows no songs for unexisting artist/album', async () => {
    const { html } = await nuxt.server.renderRoute('/artist/mockArtist/-non-existant-12312', {})
    expect(html).toContain("No songs found for")

  })
})

describe('API is alive', () => {
  test('api is on', async () => {
    const response = await request(api.handler).get('/echo/alive');
    expect(response.statusCode).toBe(200)
  })
})

describe('API fetches artists', () => {
  test('fetching artists works', async () => {
    const response = await request(api.handler).get('/artist/queen');
    expect(response.body.length > 0).toBe(true)
  })
})

describe('API fetches albums', () => {
  test('fetching album works', async () => {
    const response = await request(api.handler).get('/artist/Queen/albums');
    expect(response.body.length > 0).toBe(true)
  })
})

describe('API no repeated albums', () => {
  test('fetching album SET works', async () => {
    const response = await request(api.handler).get('/artist/Queen/albums');
    const albums = response.body;
    const names = {}
    let failed = false;
    albums.forEach(album=>{
        if(!names[album.collectionName]){
            names[album.collectionName] = true;
        }else{
            failed = true;
        }
    })
    expect(failed).toBe(false)
  })
})

describe('API fetches songs', () => {
  test('fetching songs works', async () => {
    const response = await request(api.handler).get('/artist/Queen/album/Queen');
    console.log(response.body)
    expect(response.body.length > 0).toBe(true)
  })
})

// Close server and ask nuxt to stop listening to file changes
afterAll(() => {
  nuxt.close()
})