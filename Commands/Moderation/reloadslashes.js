const { RegisterSlashCommands } = require("../../SlashRegistrant")

module.exports = {
    name: 'reloadslashes',
    execute: async(message) => {
        if (message.member.permissions.has('Administrator')) {
            RegisterSlashCommands(['Fun', 'Math', 'Moderation'])
            await message.channel.send(`Reloaded all slash commands!`);
        } else {
            await message.reply(`You don't have the premission to reload commands!`);
        }
    }
};