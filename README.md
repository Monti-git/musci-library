# music-library

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

#run tests
$ npm run test
```
**********************
The second task of the test is in the files code-snippet.js and code-snippet-refactor.js
**********************

This project uses the itunes search api to fetch artists, albums and songs.
It is build with Nuxt Js as a Framework on top of Vue Js.
Its logic is simple:
    -Look for artists in the main page
    -Access their album catalog
    -Show album songs and more albums from the artist

Using NuxtJs allows for server side rendering of the pages, this has several advantages:
    -Faster loading speed for the client, as the main data fetching and html creation is done at the server side.
    -Better for SEO as the content can be detected by crawlers

The tests are fairly simple as they assert basic things, like the correct behavior of a page when no data is available and the correct functionality of the api endpoints. 

Bootstrap is used as a UI framework, its implementation is not very complex as there was no design to follow.

Disclaimer : This is my first approach to Vue and Nuxt, so there might be some things that could be done bette using Vue/Nuxt tools I don't know yet.

Credits : 
    Test suite was heavily inspired by this post : https://dev.to/bawa_geek/how-to-setup-jest-testing-in-nuxt-js-project-5c84
    Algorithm to get array of unique objects by : https://dev.to/misterwhat/comment/a65g
