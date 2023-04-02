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
        target.roles.add(role)

        if (!reason) reason = 'No provided reason'
        await interaction.reply(`***${target.user.username}*** was muted for reason: ${reason}`)
    }
}