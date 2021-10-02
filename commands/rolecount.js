module.exports = {
    name: 'rolecount',
    description: "Use this command to let me tell you the members of a certain role 📊",
    execute(message, args, config){
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' used the memberCount command.');

		const conf = require('../config.json');
		
		const regExPattern = new RegExp(conf.regExPattern, conf.regExFlags);

		if(args.join(' ') === ''){
			message.channel.send(`${config.prefix}rolecount {argument1} {argument2}\n\n**${config.prefix}rolecount:** Prints the amount of users in this server with a specific role\n**{argument 1}:** The name of the role whos members are wished to be counted.\n**{argument 2}:** Optional argument "list" to print a list of all users with this role.`);
		}
		else{
			if(!args.find(x => x === 'list')) {
				let role = message.guild.roles.cache.find(role => role.name === args.join(' '));

				if(!role){
					message.channel.send('No role with the name "' + args.join(' ') + '" has been found...\nCheck for exact spelling... Discord can be a bitch about that 😐');
					return;
				}
				else{
					message.channel.send('This role has ' + message.guild.roles.cache.get(role.id).members.size + ' members!');
				}
			}
			else{
				args.pop();

				let role = message.guild.roles.cache.find(role => role.name === args.join(' '));
	
				if(!role){
					message.channel.send('No role with the name "' + args.join(' ') + '" has been found...\nCheck for exact spelling... Discord can be a bitch about that 😐');
					return;
				}
				else{
					let memberString = message.guild.roles.cache.get(role.id).members.map(m => m.user.username);

					memberString=memberString.sort();
					memberString=memberString.join('\n');

					message.channel.send('This role has ' + message.guild.roles.cache.get(role.id).members.size + ' members!\n\n __The users with this role are:__\n' + memberString);
				}
			}
		}
    }
}