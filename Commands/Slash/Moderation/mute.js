const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

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
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');
        // var role = interaction.guild.roles.cache.find(role => role.name === "Muted");
        // target.roles.add(role)
        // await interaction.reply(`${target.username} was muted for reason: ${reason}`);
        await interaction.reply(`WIP`);
    }
}