const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current song.'),
    async execute(interaction, client) {
        let cmd = require(`../../Music/pause`)
        cmd = await client.commands.get('pause')
        await cmd.execute(null, null, client, interaction)
    }
}