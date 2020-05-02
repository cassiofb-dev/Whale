module.exports = {
	name: 'ping',
	description: 'Check the delay between you and me.',
	cooldown: 3,
	aliases: ['delay'],
	async execute(message) {
		const m = await message.channel.send('Calculating...');
		m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
	},
};