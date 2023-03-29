const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('battle')
        .setDescription('Fight someone with your pokemons!')
        .addStringOption(option =>
            option
            .setName('reset')
            .setDescription('If you want to reset eneter "reset"')),
    async execute(interaction, client) {
        let reset = interaction.options.getString('reset');
        let cmd = require(`../../Fun/battle`)
        cmd = client.commands.get('battle')
        if (!reset) {
            reset = ''
        }
        await cmd.execute('', reset, client, true, interaction)
    },
};