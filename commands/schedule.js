module.exports = {
	name: 'schedule',
	description: 'With this command I will give you your school schedule either as a pdf or png, depending on your preference 🗓️',
	execute(message, args, conf){
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' used the schedule command.');
		
		const fs = require('fs');

		const regExPattern = new RegExp(conf.regExPattern, conf.regExFlags);

		if(args[1] && args[1].toLowerCase() === 'download' ){
			if(args[0].toLowerCase() === 'me'){
				let sendFile = false;
				
				message.member.roles.cache.map(role => {

					let roleName = role.name.toLowerCase().replace(regExPattern, '');

					if(fs.existsSync(`schedules/download/${roleName}.pdf`)){
						sendFile = true;
						message.channel.send(`You have the role of class ${role.name} here is your schedule as a pdf:`);
						message.channel.send({
							files: [{
								attachment: `schedules/download/${roleName}.pdf`,
							}]
						});
					}
				});

				if(!sendFile){
					message.channel.send('Could not find any file relating to any of your server roles... Please check you applied server roles and/or contact a server admin or "Sokker - Paulo".');
					message.channel.send('List is incomplete: If you wish to contribute and add a schedule, please send a .pdf schedule as well as the class name to "Sokker - Paulo".');
				}
			}else{
				if(fs.existsSync(`schedules/download/${args[0].toLowerCase()}.pdf`)){
					message.channel.send(`Here is the schedule of class ${args[0]} as a pdf:`);
					message.channel.send({
						files: [{
							attachment: `schedules/download/${args[0].toLowerCase()}.pdf`,
						}]
					});
				}
				else{
					message.channel.send(`Could not find any file relating to "${args[0]}"...`);
					message.channel.send('List is incomplete: If you wish to contribute and add a schedule, please send a .pdf schedule as well as the class name to "Sokker - Paulo".');
				}
			}
		}
		else if(args[1] !== '' && args[1] !== undefined){
			message.channel.send(`Unknown argument "${args[1]}"...`);
		}
		else{
			if(args[0] && args[0].toLowerCase() === 'me'){
				let sendFile = false;

				
				message.member.roles.cache.map(role => {

					let roleName = role.name.toLowerCase().replace(regExPattern, '');

					if(fs.existsSync(`schedules/image/${roleName}.png`)){
						sendFile = true;
						message.channel.send(`You have the role of class ${role.name} here is your schedule as a png:`);
						message.channel.send({
							files: [{
								attachment: `schedules/image/${roleName}.png`,
							}]
						});
					}
				});

				if(!sendFile){
					message.channel.send('Could not find any file relating to any of your server roles... Please check you applied server roles and/or contact a server admin or "Sokker - Paulo".');
					message.channel.send('List is incomplete: If you wish to contribute and add a schedule image, please send a .png schedule image as well as the class name to "Sokker - Paulo".');
				}
			}
			else if(args[0] !== '' && args[0] !== undefined){
				if(fs.existsSync(`schedules/image/${args[0].toLowerCase()}.png`)){
					message.channel.send(`Here is the schedule of class ${args[0]} as a png:`);
					message.channel.send({
						files: [{
							attachment: `schedules/image/${args[0].toLowerCase()}.png`,
						}]
					});
				}
				else{
					message.channel.send(`Could not find any file relating to "${args[0]}"...`);
					message.channel.send('List is incomplete: If you wish to contribute and add a schedule image, please send a .png schedule image as well as the class name to "Sokker - Paulo".');
				}
			}
			else if(args.join(' ').toLowerCase() === ''){
				message.channel.send(`${conf.prefix}schedule {argument 1} {argument 2}\n\n**${conf.prefix}schedule:** returns a requested schedule as a .pdf or .png file\n**{argument 1}:** defines which schedule is being requested\n(**"me"** -> bot will check your roles and find you schedule II **"IT-1o"** -> will return the schedule for IT-1o)\n**{argument 2}:** optional argument, "download" can be passed in here to make the bot send you your schedule as a .pdf file instead of .png.`);
			}
		}
	}
};