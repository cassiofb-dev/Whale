require('dotenv').config();
const Discord = require('discord.js');
const Giphy = require('../services/giphy.js');

module.exports = {
	name: 'gif',
	description: 'Search a gif on Giphy',
	cooldown: 3,
	aliases: ['animation', 'giphy'],
	async execute(message, args) {
        const giphy_key = process.env.GIPHY_KEY;
        const gif = await Giphy.gif(args.join(' '), giphy_key);
		const embed = new Discord.MessageEmbed()
			.setColor('#00aaff')
			.setTitle('Here is your image!')
			.addFields(
				{ name: 'Author title', value: gif.title || 'No title 😢' },
			)
			.setImage(gif.source);
		message.channel.send(embed);
	},
};