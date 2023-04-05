const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips to the next song.'),
    async execute(interaction, client) {
        let cmd = require(`../../Music/skip`)
        cmd = await client.commands.get('skip')
        await cmd.execute(null, null, client, interaction)
    },
}