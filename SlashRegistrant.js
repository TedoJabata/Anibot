const { REST, Routes } = require('discord.js')
const fs = require('node:fs')
require("dotenv/config")

async function RegisterSlashCommands(paths, gId) {
    const slashCommands = []

    for (let i = 0; i < paths.length; i++) {
        let slashCommandFiles = fs.readdirSync('./Commands/Slash/' + paths[i]).filter(file => file.endsWith('.js'))
        for (const file of slashCommandFiles) {
            let slashCommand = require(`./Commands/Slash/${paths[i]}/${file}`)
            slashCommands.push(slashCommand.data.toJSON())
        }
    }
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    (async() => {
        let guildId = gId
        try {
            console.log(`Started refreshing ${slashCommands.length} application (/) commands.`)

            // DELETE ALL
            // await rest.put(Routes.applicationGuildCommands(process.env.APP_ID, guildId), { body: [] })
            //     .then(() => console.log('Successfully deleted all guild commands.'))
            //     .catch(console.error)

            // SERVER -->
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.APP_ID, guildId), { body: slashCommands },
            )

            // GLOBAL -->
            // const data = await rest.put(
            //     Routes.applicationCommands(process.env.APP_ID), { body: slashCommands }
            // )

            // DELETE ONE
            // rest.delete(Routes.applicationGuildCommand(process.env.APP_ID, guildId, '1085851578642206741'))
            //     .then(() => console.log('Successfully deleted guild command'))
            //     .catch(console.error)

            console.log(`Successfully reloaded ${data.length} application (/) commands.`)
        } catch (error) {
            console.error(error)
        }
    })();
}

module.exports = { RegisterSlashCommands }