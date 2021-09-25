module.exports = {
    name: 'help',
    description: "this is a help command",
    execute(message, config){
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' used the help command.');
		
		message.channel.send(`👋 Hayo, the commands which I can help you with are:\n\n**"${config.prefix}ping":** A quick ping to see if I am online and able to respond ✌️\n**"${config.prefix}rolecount":** Use this command to let me tell you the members of a certain role 📊\n**"${config.prefix}schedule":** With this command I will give you your school schedule either as a pdf or png, depending on your preference 🗓️ \n\nI am still missing some data regarding the schedules, so If you want me to add any, just message "Sokker - Paulo#0001" here on discord! 👀`);
    }
}