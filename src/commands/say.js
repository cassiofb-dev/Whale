module.exports = {
	name: 'say',
	description: 'Make me says what you want',
	usage: '<text>',
	args: true,
	cooldown: 3,
	aliases: ['repeat', 'echo'],
	execute(message, args) {
		const sayMessage = args.join(' ');
		message.delete().catch();
		message.channel.send(sayMessage);
	},
};