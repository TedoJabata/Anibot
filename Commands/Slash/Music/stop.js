const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the music.'),
    async execute(interaction, client) {
        let cmd = require(`../../Music/stop`)
        cmd = await client.commands.get('stop')
        await cmd.execute(null, null, client, interaction)
    }
}