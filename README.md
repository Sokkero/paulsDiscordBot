# paulsDiscordBot

Rules for contribution:
	1. Indents = Tabs, size 4 (for VScode I can recommend the 'EditorConfig' extension)
	2. This bot is exclusively in english
	3. Do NOT push any tokens or 'config.json' files 

<----------------------------------------------->

-> This project is based on nodeJS

-> 	Before being able to start the bot,
	create a 'config.json' file like this in the root dir:

	{
		"token": "YOUR_TOKEN_HERE",
		"prefix": "YOUR_PREFERED_PREFIX",
		"regExPattern": ".*(?=it)",
		"regExFlags": "g"
	}

-> Also create a 'guildConfigs' folder in the root dir

-> Navigate to the project in your console
$ cd {your path}/paulsDiscordBot

-> Initialize the bot
$ npm install

-> Start the bot
$ node .