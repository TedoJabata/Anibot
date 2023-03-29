const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins your voice channel.'),
    async execute(interaction, client) {
        let cmd = require(`../../Music/join`)
        cmd = await client.commands.get('join')
        await cmd.execute(null, null, client, true, interaction)
        await interaction.reply('Joining...')
    },
}