module.exports = {
    name: 'pinged',
    description: "this is some info that is display when the bot is pinged",
    execute(message, config){
		console.log('User ' + message.author.username + ' // ' + message.author.id + ' pinged the bot.');

		message.channel.send(`Hello, I am Pauls info bot! 🤖 \nMy prefix is "${config.prefix}", so why dont we get startet by typing "${config.prefix}help"? 🙌\n\nDeveloped by: Paul Sohns ("Sokker - Paulo")\nGit-Repo: <https://github.com/Sokkernr1/paulsDiscordBot>`);
    }
}