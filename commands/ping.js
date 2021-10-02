module.exports = {
    name: 'ping',
    description: "A quick ping to see if I am online and able to respond ✌️",
    execute(message){
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' used the ping command.');
		
        message.channel.send('pong');
    }
}