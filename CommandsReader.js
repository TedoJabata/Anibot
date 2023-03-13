const fs = require('fs')

async function ReadCommands(path, client) {
    const commandFiles = fs.readdirSync('./Commands/' + path).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./Commands/${path}/${file}`);
        client.commands.set(command.name, command);
    }
}

async function ReadSlashCommands(path, client) {
    const slashCommandFiles = fs.readdirSync('./Commands/Slash/' + path).filter(file => file.endsWith('.js'));

    for (const file of slashCommandFiles) {
        const slashCommand = require(`./Commands/Slash/${path}/${file}`);
        client.slashCommands.set(slashCommand.data.name, slashCommand);
    }
}

module.exports = { ReadCommands, ReadSlashCommands }