const Discord = require('discord.js');
const Imgur = require('../services/imgur');

module.exports = {
	name: 'img',
	description: 'Search an image or gets a random image at imgur if empty',
	cooldown: 3,
	aliases: ['random-img', 'pic'],
	async execute(message, args) {
		const img = (args.length === 0) ? await Imgur.random_image('Client-ID b06d325874bf57f') : await Imgur.search_image(args.join(' '), 'Client-ID b06d325874bf57f');
		if(!img) return message.channel.send('Couldn\'t get image');
		const embed = new Discord.MessageEmbed()
			.setColor('#00aaff')
			.setTitle('Here is your image!')
			.addFields(
				{ name: 'Author description', value: img.description || 'No description 😢' },
			)
			.setImage(img.link);
		message.channel.send(embed);
	},
};