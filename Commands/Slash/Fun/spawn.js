const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spawn')
        .setDescription('Spawns a pokemon.'),
    async execute(interaction, client) {
        let cmd = require(`../../Fun/spawn`)
        cmd = client.commands.get('spawn')
        await cmd.execute('', '', client, true, interaction)
    },
};