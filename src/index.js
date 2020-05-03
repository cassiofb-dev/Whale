require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
const whale = require('./data/whale.json');
const token = process.env.TOKEN;

client.commands = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(token);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity('Everything Whale be alright!');
});

client.on('guildCreate', guild => {
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on('guildDelete', guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.cache.find(ch => ch.name === '🌺new-people');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	channel.send(`Welcome to Whale talk, ${member}!`);
});

client.on('message', message => {
	if(!message.content.startsWith(whale.prefix) || message.author.tag === client.user.tag) return;

	const args = message.content.slice(whale.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if(!commandName) return;

	const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) {
		const error_str = 'Sorryyy~ I couldn\'t find `' + commandName + '` command! Please try `>help` for more info!';
		return message.reply(error_str);
	}

	if (command.args && !args.length) {
		let reply = `I can't do this without info!, ${message.author}!`;
		if (command.usage) {
			reply += `\nYou should use it like this: \`${whale.prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`OOF! Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	try {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		command.execute(message, args);
	}
	catch(error) {
		console.error(error);
		message.reply(`Something is wrong with me. I couldn't do ${command.name}\n!`);
	}
});