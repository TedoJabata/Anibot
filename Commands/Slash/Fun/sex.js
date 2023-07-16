const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sex')
        .setDescription('Have sex with someone <3')
        .addUserOption(option =>
            option
            .setName('partner')
            .setDescription('The person to have sex with.')
            .setRequired(true))
        .setDMPermission(false),
    async execute(interaction) {
        let partner = interaction.options.getMember('partner')

        await interaction.reply(`<@${interaction.user.id}> is having sex with <@${partner.user.id} and is close to cumming AHHHHH~~~`)
    }
}