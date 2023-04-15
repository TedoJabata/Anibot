const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leaves the current voice channel.'),
    async execute(interaction, client) {
        await interaction.reply('Leaving...')
        await client.distube.voices.leave(interaction)
    }
}