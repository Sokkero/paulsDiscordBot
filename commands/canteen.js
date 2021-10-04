module.exports = {
	name: 'canteen',
	description: "Will give you the canteen plan for this week 🍕",
	execute(message) {
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' used the canteen command.');

		message.channel.send('https://www.itech-bs14.de/fileadmin/redakteur/6-Headermenu/Mensa/Mensa_Wochenplan.jpg');
	}
};