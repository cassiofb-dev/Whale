require('dotenv').config();
const Discord = require('discord.js');
const Giphy = require('../services/giphy.js');
const Tenor = require('../services/tenor.js');

module.exports = {
	name: 'gif',
	description: 'Search a gif on Giphy',
	cooldown: 3,
	aliases: ['animation', 'giphy'],
	async execute(message, args) {
		const giphy_key = process.env.GIPHY_KEY;
		const tenor_key = process.env.TENOR_KEY;
        const gif = await Tenor.gif(args.join(' '), tenor_key) || await Giphy.gif(args.join(' '), giphy_key);
		if(!gif) return message.channel.send('Gif not found.');
		const embed = new Discord.MessageEmbed()
			.setColor('#00aaff')
			.setTitle('Here is your gif!')
			.addFields(
				{ name: 'Author title', value: gif.title || 'No title 😢' },
			)
			.setImage(gif.url);
		message.channel.send(embed);
	},
};