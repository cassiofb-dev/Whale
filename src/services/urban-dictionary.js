const fetch = require('node-fetch');
const querystring = require('querystring');
module.exports = {
	define: async input => {
		const options = {
			term: input,
		};
		const query_url = 'https://api.urbandictionary.com/v0/define?' + querystring.stringify(options);
		const { list } = await fetch(query_url)
			.catch(err => console.log(err))
			.then(response => response.json());
		return list;
	},
};