const Discord = require('discord.js');
const Imgur = require('../services/imgur');

module.exports = {
	name: 'art',
	description: 'Gets a random art (Only has kitten for now...)',
	cooldown: 3,
	aliases: ['drawing', 'painting'],
	async execute(message) {
		const album = await Imgur.get_album('XrWeqOa', 'Client-ID b06d325874bf57f');
		const idx = Math.floor(Math.random() * album.images.length);
		const random_photo = album.images[idx];
		const embed = new Discord.MessageEmbed()
			.setColor('#00aaff')
			.setTitle(`Here is your random art made by ${album.title}`)
			.setImage(random_photo.link);
		message.channel.send(embed);
	},
};