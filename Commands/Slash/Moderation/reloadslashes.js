const { RegisterSlashCommands } = require("../../../SlashRegistrant")
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reloadslashes')
        .setDescription('Reloads all slash commands.'),
    async execute(interaction) {
        RegisterSlashCommands(['Fun', 'Math', 'Moderation'])
        await interaction.reply(`Reloaded all slash commands!`);
    },
};