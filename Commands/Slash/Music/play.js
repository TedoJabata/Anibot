const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays music.')
        .addStringOption(option =>
            option.setName('argument')
            .setDescription('The search query')
            .setRequired(true)),
    async execute(interaction, client) {
        const arg = interaction.options.getString('argument')

        let cmd = require(`../../Music/play`)
        cmd = await client.commands.get('play')
        await cmd.execute(null, arg, client, interaction)
    }
}