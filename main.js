const Discord = require('discord.js');
const config = require('./config.json');

const intents = new Discord.Intents("GUILDS", "GUILDS_MESSAGES");

const client = new Discord.Client({ 
    intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MEMBERS,
	]
 });

const prefix = '-';

const fs = require('fs');
const schedule = require('./commands/schedule');

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
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if(command === 'rolecount'){
		client.commands.get('memberCount').execute(message, args);
	} else if(command === 'schedule'){
		client.commands.get('schedule').execute(message, args);
	}
});

client.login(config.token);