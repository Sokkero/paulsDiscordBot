module.exports = {
    name: 'ping',
    description: "this is a ping command",
    execute(message, args){
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' used the ping command.');
		
        message.channel.send('pong');
    }
}