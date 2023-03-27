const { RegisterSlashCommands } = require("../../../SlashRegistrant")
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reloadslashes')
        .setDescription('Reloads all slash commands.'),
    async execute(interaction) {
        if (interaction.user.id == '978754737031761960') {
            RegisterSlashCommands(['Fun', 'Math', 'Moderation'])
            await interaction.reply(`Reloaded all slash commands!`);
        } else {
            await interaction.reply(`You don't have the premission to reload commands!`);
        }
    },
};