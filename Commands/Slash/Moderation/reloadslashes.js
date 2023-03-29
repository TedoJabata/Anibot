const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { RegisterSlashCommands } = require("../../../SlashRegistrant")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reloadslashes')
        .setDescription('Reloads all slash commands.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await RegisterSlashCommands(['Music', 'Fun', 'Math', 'Moderation'])
        await interaction.reply(`Reloaded all slash commands!`)
    },
}