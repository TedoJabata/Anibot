const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins your voice channel.')
        .addStringOption(option =>
            option.setName('query')
            .setDescription('The search query')
            .setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query')
        let cmd = require(`../../Music/join`)
        cmd = await client.commands.get('join')
        await cmd.execute(null, null, client, true, interaction)
    },
}