const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes the music'),
    async execute(interaction, client) {
        let cmd = require(`../../Music/resume`)
        cmd = await client.commands.get('resume')
        await cmd.execute(null, null, client, true, interaction)
    },
}