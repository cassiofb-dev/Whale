const Discord = require('discord.js');
const Wikipedia = require('../services/wikipedia.js');

module.exports = {
	name: 'search',
	description: 'Search for something in wikipedia',
	usage: '<content>',
	args: true,
	cooldown: 5,
	aliases: ['wiki'],
	async execute(message, args) {
		const question = args.join(' ');
		const pages = await Wikipedia.search(question);

		if(!pages) return message.channel.send(`No results found for ${question}`);

		let titles = '';

		for(const idx in pages) {
			titles += `${Number(idx) + 1}: ${pages[idx].title}\n`;
		}

		const embed = new Discord.MessageEmbed()
			.setColor('#00AAFF')
			.setTitle('Wiki Search')
			.addFields(
				{
					name: 'Select an title by number:',
					value: titles,
				},
			);

		message.channel.send(embed).then(() => {
			const filter = response => {
				const index = Number(response.content);
				return index > 0 && index < pages.length + 1;
			};
			message.channel.awaitMessages(filter, { max: 1, time: 30000, errors:['time'] })
				.then(async collected => {
					const key = collected.first().content;
					const page = await Wikipedia.get_page(pages[key - 1].title);
					const embed_result = new Discord.MessageEmbed()
						.setColor('#00AAFF')
						.setTitle(page.title)
						.setURL(page.url)
						.addFields(
							{
								name: 'Result',
								value: page.content,
							},
						);
					message.channel.send(embed_result);
				})
				.catch(collected => {
					console.log(collected);
					message.channel.send('Time out, aborting the search.');
				});
		});
	},
};