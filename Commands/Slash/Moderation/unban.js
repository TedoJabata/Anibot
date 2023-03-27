const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Select a member and unban them.')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('The member to unban')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        await interaction.guild.members.unban(target);
        await interaction.reply(`***${target.username}*** was unbanned.`);
    }
}