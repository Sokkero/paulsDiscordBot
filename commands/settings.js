const fs = require('fs');
const standardConfig = require('../config.json');
let guild;
let guildConfig;
let changed;

module.exports = {
    name: 'settings',
    description: 'this command is for admins to configure the config.json',
    execute(message, args, currentConfig){
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' used the settings command. ' + args[0]);

		guild = message.guild.id;
		changed = false;

		if(fs.existsSync(`guildConfigs/${guild}.json`)){
			guildConfig = Object.assign({}, require(`../guildConfigs/${guild}.json`));
		}
		else{
			guildConfig = Object.assign({}, standardConfig);
		}

		if(args[0] === undefined){
			args[0] = '';
		}
		
        switch (args[0].toLowerCase()){
			case 'reset':
				args.shift();
				resetConfig(message);
			break;
			case 'prefix':
				args.shift();
				changePrefix(message, args);
			break;
			case 'regex':
				args.shift();
				changeRegEx(message, args);
			break;
			case 'regexflags':
				args.shift();
				changeRegExFlag(message, args);
			break;
			case '':
				provideHelp(message, currentConfig);
			break;
			default:
				message.channel.send(`Invalid argument "${args[0]}"...`);
			break;
		}

		if(changed){
			writeGuildJSON();
		}
    }
}

function writeGuildJSON(message){
	let jsonContent = JSON.stringify(guildConfig);

	let logMessage;

	if(fs.existsSync(`guildcConfigs/${guild}.json`)){
		logMessage = `Changed config.json for guildId ${guild}`;
	}
	else{
		logMessage = `Created config.json for guildId ${guild}`;
	}
 
	fs.writeFileSync(`guildConfigs/${guild}.json`, jsonContent, { flag: 'w+' }, function (err) {
    	if (err) {
			message.channel.send('An error occurred while writing the file...');
        	console.log(`An error occured while writing JSON Object to File. GuildId: ${guild}`);
        	return console.log(err);
    	}
	});
	changed = false;
	console.log(logMessage);
}

function resetConfig(message){
	if(fs.existsSync(`guildConfigs/${guild}.json`)){
		fs.unlinkSync(`guildConfigs/${guild}.json`);
		console.log(`Deleted config.json for guildId ${guild}`);
		message.channel.send('Settings succesfully reset!');
	}
	else{
		message.channel.send('Nothing to reset!');
	}

}

function changePrefix(message, args){
	if(args[0] === undefined || args[0].length > 3){
		message.channel.send('Symbol/-s needed to set a new prefix...\nAny string is allowed, as long as it is at least 1 character and a maximum of 3 characters long.');
	}
	else{
		if(guildConfig.prefix !== args[0]){
			guildConfig.prefix = String(args[0]);
			changed = true;
			message.channel.send('Prefix successfully changed!');
		}
		else{
			message.channel.send('This is already the set prefix!');
		}
	}
}

function changeRegEx(message, args){
	if(args[0] === undefined){
		message.channel.send('The regEx helps filtering out unneeded information within channel and role names. I would recommend not to change this setting...')
	}
	else{
		message.channel.send('Changing the regEx is annoying and tedious... I hope you know what you are doing...\nJust in case, here is the standart setting: ' + standardConfig.regExPattern);
		
		if(guildConfig.regExPattern !== args[0]){
			guildConfig.regExPattern = String(args[0]);
			changed = true;
			message.channel.send('RegEx successfully changed!');
		}
		else{
			message.channel.send('This is already the set regEx!');
		}
	}
}

function changeRegExFlag(message, args){
	if(args[0] === undefined){
		message.channel.send('The regEx flags help filtering out unneeded information within channel and role names. I would recommend not to change this setting...')
	}
	else{
		message.channel.send('Changing the regEx flags is annoying and tedious... I hope you know what you are doing...\nJust in case, here is the standart setting: ' + standardConfig.regExFlags);
		
		if(guildConfig.regExFlags !== args[0]){
			guildConfig.regExFlags = String(args[0]);
			changed = true;
			message.channel.send('RegEx flags successfully changed!');
		}
		else{
			message.channel.send('These are already the set regEx Flags!');
		}
	}
}

function provideHelp(message, currentConfig){
	message.channel.send(`These are the admin settings for "Pauls info bot" 🤖\n\nPlease be careful with some of these settings, as they could seriously influence the way this bot operates!\n\n**${currentConfig.prefix}settings {argument 1} {argument 2}**\n\n**${currentConfig.prefix}settings:** Admin settings for this bot\n**{argument 1}:** What you want to change\n__reset:__ Use this command to reset the bot settings to standart\n__prefix:__ The prefix for commands this bot uses\n__regEx:__ The regEx this bot uses for filtering strings\n__regExFlags:__ The regEx flags this bot uses for filtering strings\n**{argument 2}:** The new value you want to enforce`);
}