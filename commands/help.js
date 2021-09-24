module.exports = {
    name: 'help',
    description: "this is a help command",
    execute(message, args){
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' used the help command.');
		
		message.channel.send('👋 Hayo, the commands which I can help you with are:\n\n**"-ping":** A quick ping to see if I am online and able to respond ✌️\n**"-rolecount":** Use this command to let me tell you the member count of a certain role 📊\n**"-schedule":** With this command I will give you your school schedule either as a pdf or png, depending on you preference 🗓️ \n\nI am still missing some data regarding the schedules, so If you want me to add any, just message "Sokker - Paulo#0001" here on discord! 👀');
    }
}