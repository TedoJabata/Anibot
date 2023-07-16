const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const ServerSchema = require("../../../Models/ServerModel")

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

        const foundServer = await ServerSchema.findOne({ serverId: interaction.guild.id })
        const mutedRole = interaction.guild.roles.cache.find(role => role.name === foundServer.mutedRoleName)

        if (!mutedRole) {
            await interaction.reply({
                content: 'Muted role doesnt exist! Please set up a muted  role.',
                ephemeral: true
            })
        } else if (!target.roles.cache.some(role => role.name === foundServer.mutedRoleName)) {
            await interaction.reply({ content: `***${target.user.username}*** is not muted.`, ephemeral: true })
        } else {
            await target.roles.remove(mutedRole)
            await interaction.reply(`***${target.user.username}*** was unmuted by ***${interaction.member.user.username}***`)
        }
    }
}