const fetch = require('node-fetch');
const querystring = require('querystring');
const api_url = 'https://api.tenor.com/v1/search?';

module.exports = {
    gif: async (input, key) => {
        const query = querystring.stringify({ q: input, key: key });
        const received = await fetch(api_url + query).catch(e => console.log(e)).then(r => r.json());
        const gifs = received.results;
        if(!gifs.length) return null;
        const gif = gifs[Math.floor(Math.random() * gifs.length)];
        return {
            searchurl: received.weburl,
            weburl: gif.url,
            url: gif.media[0].gif.url,
            original: gif,
        };
    }
};