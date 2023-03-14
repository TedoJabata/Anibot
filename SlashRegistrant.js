require("dotenv/config");
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');


async function RegisterSlashCommands(path) {
    const slashCommands = [];
    const slashCommandFiles = fs.readdirSync('./Commands/Slash/' + path).filter(file => file.endsWith('.js'));

    for (const file of slashCommandFiles) {
        const slashCommand = require(`./Commands/Slash/${path}/${file}`);
        slashCommands.push(slashCommand.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    (async() => {
        let guildId = '1004132716335333376'
        try {
            console.log(`Started refreshing ${slashCommands.length} application (/) commands.`);

            //GLOBAL -->
            // const data = await await rest.put(
            //     Routes.applicationCommands(process.env.APP_ID), { body: slashCommands },
            // );

            //SERVER -->
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.APP_ID, guildId), { body: slashCommands },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();
}

module.exports = { RegisterSlashCommands }