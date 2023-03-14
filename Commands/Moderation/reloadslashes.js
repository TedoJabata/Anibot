const { RegisterSlashCommands } = require("../../SlashRegistrant")

module.exports = {
    name: 'reloadslashes',
    execute: async(message) => {
        RegisterSlashCommands('Fun')
        RegisterSlashCommands('Math')
        RegisterSlashCommands('Moderation')
        await message.channel.send(`Reloaded all slash commands!`);
    }
};