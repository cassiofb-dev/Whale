const fetch = require('node-fetch');
const querystring = require('querystring');
module.exports = {
	search: async input => {
		const options = {
			action: 'query',
			list: 'search',
			srsearch: input,
			format: 'json',
		};
		const query_url = 'https://en.wikipedia.org/w/api.php?' + querystring.stringify(options);
		const received = await fetch(query_url)
			.catch(err => console.log(err))
			.then(response => response.json());
		if(!received) return console.log('Wikipedia API Error!');
		return received.query.search;
	},
	get_page: async input => {
		const options = {
			action: 'query',
			prop: 'extracts',
			exchars: 1000,
			explaintext: true,
			titles: input,
			formatversion: 2,
			format: 'json',
		};
		const query_url = 'https://en.wikipedia.org/w/api.php?' + querystring.stringify(options);
		const received = await fetch(query_url)
			.catch(err => console.log(err))
			.then(response => response.json());
		if(!received) return console.log('Wikipedia API Error!');
		if(received.query.pages[0].missing) return null;
		const page = {
			title: received.query.pages[0].title,
			content: received.query.pages[0].extract,
			url: 'https://en.wikipedia.org/wiki/' + querystring.escape(received.query.pages[0].title),
		};
		return page;
	},
};