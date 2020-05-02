const Discord = require('discord.js');
const UrbanDictionary = require('../services/urban-dictionary.js');
const trim = require('../assets/trim');

module.exports = {
	name: 'define',
	description: 'search for something in urban dictionary',
	usage: '<content>',
	args: true,
	cooldown: 5,
	aliases: ['what-is', 'meaning'],
	async execute(message, args) {
		const question = args.join(' ');
		const [answer] = await UrbanDictionary.define(question);

		if (!answer) return message.channel.send(`No results found for **${question}**.`);

		const embed = new Discord.MessageEmbed()
			.setColor('#00AAFF')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{
					name: 'Definition',
					value: trim(answer.definition, 1024).replace(/[[\]]/g, ''),
				},
				{
					name: 'Example',
					value: trim(answer.example, 1024).replace(/[[\]]/g, '') || 'No example 😢',
				},
				{
					name: 'Rating',
					value: `${answer.thumbs_up}👍 | ${answer.thumbs_down}👎`,
				},
			);
		message.channel.send(embed);
	},
};