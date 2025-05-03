const { RegisterSlashCommands } = require("../../SlashRegistrant")

module.exports = {
    name: 'reloadslashes',
    aliases: ['rs'],
    execute: async(message) => {
        if (message.member.id = "978754737031761960") {
            RegisterSlashCommands(['Music', 'Fun', 'Math', 'Moderation'], message.guild.id)
            await message.channel.send(`Reloaded all slash commands!`)
        } else {
            await message.reply(`You don't have the premission to reload commands!`)
        }
    }
};