const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { Set } = require("../../../Controllers/DBController")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Set a config.')
        .addChannelOption(option =>
            option
            .setName('join_leave_channel')
            .setDescription('The channel that displays who joins and leaves the server.'))
        .addRoleOption(option =>
            option
            .setName('muted_role')
            .setDescription('The role that means someone is muted.'))
        .addRoleOption(option =>
            option
            .setName('member_role')
            .setDescription('The base member role.'))
        .addRoleOption(option =>
            option
            .setName('verified_role')
            .setDescription('The verified member role.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .setDMPermission(false),
    async execute(interaction) {
        let joinleave = interaction.options.getChannel('join_leave_channel')

        let muted = interaction.options.getRole('muted_role')

        let member = interaction.options.getRole('member_role')

        let verified = interaction.options.getRole('verified_role')

        await Set(interaction.guild.name, interaction.guild.id, joinleave.id, muted, member, verified)

        await interaction.reply({ content: `Config was updated for this server!`, ephemeral: true })
    }
}