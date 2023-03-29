const fs = require('fs')

async function ReadCommands(categories, client) {
    for (let i = 0; i < categories.length; i++) {
        const commandFiles = fs.readdirSync('./Commands/' + categories[i]).filter(file => file.endsWith('.js'))

        for (const file of commandFiles) {
            const command = require(`./Commands/${categories[i]}/${file}`)
            await client.commands.set(command.name, command)
        }
    }

}

async function ReadSlashCommands(categories, client) {
    for (let i = 0; i < categories.length; i++) {
        const slashCommandFiles = fs.readdirSync('./Commands/Slash/' + categories[i]).filter(file => file.endsWith('.js'))

        for (const file of slashCommandFiles) {
            const slashCommand = require(`./Commands/Slash/${categories[i]}/${file}`)
            await client.slashCommands.set(slashCommand.data.name, slashCommand)
        }
    }

}

module.exports = { ReadCommands, ReadSlashCommands }