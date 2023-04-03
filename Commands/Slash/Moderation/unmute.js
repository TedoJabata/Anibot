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
        const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted')

        if (!mutedRole) {
            await interaction.reply({
                content: 'Muted role doesnt exist! Please create a role named "Muted".',
                ephemeral: true
            })
        } else if (!target.roles.cache.some(role => role.name === 'Muted')) {
            await interaction.reply({ content: `***${target.user.username}*** is not muted.`, ephemeral: true })
        } else {
            await target.roles.remove(mutedRole)
            await interaction.reply(`***${target.user.username}*** was unmuted by ***${interaction.member.user.username}***`)
        }
    }
}