const Discord = require('discord.js');
let config = require('./config.json');

const client = new Discord.Client({ 
    intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MEMBERS,
		Discord.Intents.FLAGS.GUILD_PRESENCES,
	]
 });

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Online!');
});

client.on('messageCreate', message => {
	
	if(message.author.bot || message.mentions.everyone === true) return;
	
	if(fs.existsSync(`guildConfigs/${message.guild.id}.json`)){
		delete require.cache[require.resolve(`./guildConfigs/${message.guild.id}.json`)];
		config = Object.assign({}, require(`./guildConfigs/${message.guild.id}.json`));
	}
	else{
		config = require('./config.json');
	}

	prefix = config.prefix;
	
	if(message.mentions.has(client.user) && !message.author.bot){
		client.commands.get('pinged').execute(message, config);
	}
	else if(!message.content.startsWith(prefix)) return;
	
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'help'){
		client.commands.get('help').execute(message, config, client.commands);
	} else if(command === 'ping'){
        client.commands.get('ping').execute(message);
    } else if(command === 'rolecount'){
		client.commands.get('memberCount').execute(message, args, config);
	} else if(command === 'schedule'){
		client.commands.get('schedule').execute(message, args, config);
	} else if(command === 'canteen'){
		client.commands.get('canteen').execute(message);
	} else if(command === 'settings'){
		if(message.member.permissions.has('ADMINISTRATOR')){
			client.commands.get('settings').execute(message, args, config);
		}
		else{
			message.channel.send('This command is only available for server admins!');
		}
	}
});

client.login(config.token);