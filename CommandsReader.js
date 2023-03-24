const fs = require('fs')

async function ReadCommands(path, client) {
    const commandFiles = fs.readdirSync('./Commands/' + path).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./Commands/${path}/${file}`);
        client.commands.set(command.name, command);
    }
}

async function ReadSlashCommands(paths, client) {
    for (let i = 0; i < paths.length; i++) {
        const slashCommandFiles = fs.readdirSync('./Commands/Slash/' + paths[i]).filter(file => file.endsWith('.js'));

        for (const file of slashCommandFiles) {
            const slashCommand = require(`./Commands/Slash/${paths[i]}/${file}`);
            client.slashCommands.set(slashCommand.data.name, slashCommand);
        }
    }

}

module.exports = { ReadCommands, ReadSlashCommands }