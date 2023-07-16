const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const config = require('../../../config.json')
const ServerSchema = require("../../../Models/ServerModel")

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

        const foundServer = await ServerSchema.findOne({ serverId: interaction.guild.id })
        const role = interaction.guild.roles.cache.find(role => role.name === foundServer.mutedRoleName)

        if (!reason) reason = 'No provided reason'

        if (!role) {
            await interaction.reply({
                content: 'Muted role doesnt exist! Please set up a muted role.',
                ephemeral: true
            })
        } else if (target.roles.cache.some(role => role.name === foundServer.mutedRoleName)) {
            await interaction.reply({ content: `***${target.user.username}*** is already muted.`, ephemeral: true })
        } else {
            await target.roles.add(role)
            await interaction.reply(`***${target.user.username}*** was muted for reason: ${reason}`)
        }
    }
}