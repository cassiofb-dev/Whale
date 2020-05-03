const fetch = require('node-fetch');
const querystring = require('querystring');
module.exports = {
	get_album: async (albumId, clientId) => {
		const options = {
			method: 'GET',
			headers: {
				'Authorization': clientId,
			},
		};
		const url = 'https://api.imgur.com/3/album/' + albumId;
		const received = await fetch(url, options).then(response => response.json());
		return received.data;
	},
	search_image: async (input, clientId) => {
		const options = {
			method: 'GET',
			headers: {
				'Authorization': clientId,
			},
		};
		const url = 'https://api.imgur.com/3/gallery/search/time/all/0?q=' + querystring.unescape(input);
		const received = await fetch(url, options).then(response => response.json());
		const gallery = received.data;
		if(gallery.length === 0) return null;

		let tries = 0;
		while(tries < 30) {
			tries++;
			const thing = gallery[Math.floor(Math.random() * gallery.length)];
			if(!thing.is_album && thing.type.indexOf('video') === -1) return thing;
			const img = thing.images[Math.floor(Math.random() * thing.images.length)];
			if(img.type.indexOf('video') === -1) return img;
		}
	},
	random_gallery: async clientId => {
		const options = {
			method: 'GET',
			headers: {
				'Authorization': clientId,
			},
		};
		const section = ['hot/', 'top/', 'user/'];
		const sort = ['viral/', 'top/', 'time/'];
		const page = String(Math.floor(Math.random() * 10)) + '/';
		const window = ['day', 'week', 'month', 'year', 'all'];
		const random_key = keys => {
			return keys[Math.floor(Math.random() * keys.length)];
		};
		const keys_string = random_key(section) + random_key(sort) + page + random_key(window);
		const url = 'https://api.imgur.com/3/gallery/' + keys_string;
		const received = await fetch(url, options).then(response => response.json());
		return received.data;
	},
	random_image: async clientId => {
		const options = {
			method: 'GET',
			headers: {
				'Authorization': clientId,
			},
		};
		const section = ['hot/', 'top/', 'user/'];
		const sort = ['viral/', 'top/', 'time/'];
		const page = String(Math.floor(Math.random() * 10)) + '/';
		const window = ['day', 'week', 'month', 'year', 'all'];
		const random_key = keys => {
			return keys[Math.floor(Math.random() * keys.length)];
		};
		const keys_string = random_key(section) + random_key(sort) + page + random_key(window);
		const url = 'https://api.imgur.com/3/gallery/' + keys_string;
		const received = await fetch(url, options).then(response => response.json());

		const gallery = received.data;
		if(gallery.length === 0) return null;
		let tries = 0;
		while(tries < 30) {
			tries++;
			const thing = gallery[Math.floor(Math.random() * gallery.length)];
			if(!thing.is_album && thing.type.indexOf('video') === -1) return thing;
			const img = thing.images[Math.floor(Math.random() * thing.images.length)];
			if(img.type.indexOf('video') === -1) return img;
		}
	},
};