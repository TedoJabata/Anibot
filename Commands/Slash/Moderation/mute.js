const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const config = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Select a member and mute them.')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('The member to mute')
            .setRequired(true))
        .addStringOption(option =>
            option
            .setName('reason')
            .setDescription('The reason for muting'))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDMPermission(false),
    async execute(interaction) {
        let target = interaction.options.getMember('target')
        let reason = interaction.options.getString('reason')

        const role = interaction.guild.roles.cache.find(role => role.name === config.mutedRoleName)

        if (!reason) reason = 'No provided reason'

        if (!role) {
            await interaction.reply({
                content: 'Muted role doesnt exist! Please create a role named "Muted".',
                ephemeral: true
            })
        } else if (target.roles.cache.some(role => role.name === 'Muted')) {
            await interaction.reply({ content: `***${target.user.username}*** is already muted.`, ephemeral: true })
        } else {
            await target.roles.add(role)
            await interaction.reply(`***${target.user.username}*** was muted for reason: ${reason}`)
        }
    }
}