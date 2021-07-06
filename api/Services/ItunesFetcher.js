const axios = require('axios');
const itunesAPI = 'https://itunes.apple.com/search'

const validateProps = (item, validations) =>{
    let passed = true;
    validations.forEach(validation=>{
        if(item[validation.prop] != validation.equal) passed = false;
    })
    return passed;
}

const uniqByProp_map = (prop, dataValidation = false) => arr =>
    Array.from(
        arr
            .reduce(
                (acc, item) => (
                    item
                    && item[prop]
                    && (dataValidation ? validateProps(item, dataValidation)
                        : true)
                    && acc.set(String(item[prop]).toLowerCase(), item),
                    acc
                ), // using map (preserves ordering)
                new Map()
            )
            .values()
    );

exports.artist_search = (req, res) => {
    const { name } = req.params;

    axios.get(
        itunesAPI, {
        params: {
            media: "music",
            entity: "musicArtist",
            country: "MX",
            attribute: "artistTerm",
            limit: "10",
            term: name,
        }
    }
    ).then(response => {
        res.status(response.status).send(response.data.results);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error)
    })
}
exports.artist_albums = (req, res) => {
    const { name } = req.params;
    axios.get(
        itunesAPI, {
        params: {
            media: "music",
            entity: "album",
            country: "MX",
            attribute: "artistTerm",
            limit: "200",
            term: name,
        }
    }
    ).then(response => {
        if (response.data.results <= 1) {
            res.status(response.status).send(response.data.results);
        } else {
            const albums = uniqByProp_map('collectionName', 
            [{ prop: "artistName", equal: name }]
            )(response.data.results);
            res.status(response.status).send(albums);
        }
    }).catch(error => {
        console.log(error);
        res.status(500).send(error)
    })
}

exports.album_songs = (req, res) => {
    const { name, albumname } = req.params;
    axios.get(
        itunesAPI, {
        params: {
            media: "music",
            entity: "song",
            country: "MX",
            attribute: "albumTerm",
            limit: 199,
            term: albumname,
        }
    }).then(response => {
        if (response.data.results <= 1) {
            res.status(response.status).send(response.data.results);
        } else {
            const songs = uniqByProp_map('trackCensoredName', 
            [
                { prop: "collectionName", equal: albumname },
                { prop: "artistName", equal: name },
            ]
            )(response.data.results);
            res.status(response.status).send(songs);
        }
    }).catch(error => {
        console.log(error);
        res.status(500).send(error)
    })
}