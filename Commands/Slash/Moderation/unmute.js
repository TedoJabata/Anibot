const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Select a member and unmute them.')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('The member to unmute')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDMPermission(false),
    async execute(interaction) {
        let target = interaction.options.getMember('target')
        const role = interaction.guild.roles.cache.find(role => role.name === 'Muted')

        target.roles.remove(role)
        await interaction.reply(`${target.user.username} was unmuted.`)
    }
}