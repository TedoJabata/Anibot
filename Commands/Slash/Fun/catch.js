const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catch')
        .setDescription('Catches a pokemon.'),
    async execute(interaction, client) {
        let cmd = require(`../../Fun/catch`)
        cmd = client.commands.get('catch')
        await cmd.execute(client, '', '', true, interaction)
    },
};