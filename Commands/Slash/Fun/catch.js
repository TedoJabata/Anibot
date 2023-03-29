const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catch')
        .setDescription('Catches a pokemon.'),
    async execute(interaction, client) {
        let cmd = require(`../../Fun/catch`)
        cmd = await client.commands.get('catch')
        await cmd.execute(null, null, client, true, interaction)
    },
}