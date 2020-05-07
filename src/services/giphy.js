const fetch = require('node-fetch');
const querystring = require('querystring');
const api_url = 'https://api.giphy.com/v1/gifs/search?';

module.exports = {
    gif: async (input, key) => {
        const query = querystring.stringify({ api_key: key, q: input });
        const received = await fetch(api_url + query).catch(e => console.log(e)).then(r => r.json());
        if(!received.data.length) return null;
        const gifs = received.data;
        const gif = gifs[Math.floor(Math.random() * gifs.length)];
        return {
            url: gif.images.original.url,
            original: gif,
        };
    }
};