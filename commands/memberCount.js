module.exports = {
    name: 'memberCount',
    description: "this counts the amount of members in a role",
    execute(message, args){
		if(args.join(' ') === ''){
			message.channel.send('-rolecount {argument}\n\n**-rolecount:** Prints the amount of users in this server with a specific role\n**{argument}:** The name of the role whos members are wished to be counted.');
		}
		else{
			let role = message.guild.roles.cache.find(role => role.name === args.join(' '));

			if(!role){
				message.channel.send('No role with the name "' + args.join(' ') + '" has been found...');
				return;
			}
			else{
				let roleCount = message.guild.roles.cache.get(role.id).members.size;
	
				message.channel.send('Members with this role: ' + roleCount);
			}
		}
    }
}