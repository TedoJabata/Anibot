const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a member to kick.')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('The member to kick')
            .setRequired(true))
        .addStringOption(option =>
            option
            .setName('reason')
            .setDescription('The reason for kicking'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('target')
        let reason = interaction.options.getString('reason')
        if (!reason) {
            reason = 'No reason provided';
        }
        await interaction.guild.members.kick(target, { reason })
        await interaction.reply(`***${target.username}*** was kicked for reason: ${reason}`)
    }
}