const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gives info.'),
    async execute(interaction) {
        await interaction.reply('insert info here');
    },
};