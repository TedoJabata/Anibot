const { RegisterSlashCommands } = require("../../SlashRegistrant")

module.exports = {
    name: 'reloadslashes',
    aliases: ['rs'],
    execute: async(message) => {
        if (message.member.permissions.has('Administrator')) {
            RegisterSlashCommands(['Music', 'Fun', 'Math', 'Moderation'])
            await message.channel.send(`Reloaded all slash commands!`)
        } else {
            await message.reply(`You don't have the premission to reload commands!`)
        }
    }
};