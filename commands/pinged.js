module.exports = {
    name: 'pinged',
    description: "this is some info that is display when the bot is pinged",
    execute(message, args){
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' pinged the bot.');

		message.channel.send('Hello, I am Pauls info bot! 🤖 \nMy prefix is "-", so why dont we get startet by typing "-help"? 🙌\n\nDeveloped by: Paul Sohns ("Sokker - Paulo")\nGit-Repo: <https://github.com/Sokkernr1/paulsDiscordBot>');
    }
}