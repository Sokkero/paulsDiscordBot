module.exports = {
    name: 'mensa',
    description: "Mensaplan for this week",
    execute(message) {
        console.log('User ' + message.author.username + ' // ' + message.author.id + ' used the mensa command.');

        message.channel.send('https://www.itech-bs14.de/fileadmin/redakteur/6-Headermenu/Mensa/Mensa_Wochenplan.jpg');
    }
}