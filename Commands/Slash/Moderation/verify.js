const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const config = require('../../../config.json')
const ServerSchema = require("../../../Models/ServerModel")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify yourself.'),
    async execute(interaction, client) {
        const foundServer = await ServerSchema.findOne({ serverId: interaction.guild.id })
        const role = await interaction.guild.roles.cache.find(role => role.name === foundServer.verifiedRoleName)

        if (!role) {
            await interaction.reply({
                content: 'Verified role doesnt exist! Please set up a verified role',
                ephemeral: true
            })
            await (await interaction.guild.fetchOwner()).send(`Verified role doesnt exist in ${interaction.guild.name}! Please create a role named "Verified"`)
        } else if (interaction.member.roles.cache.some(role => role.name === foundServer.verifiedRoleName)) {
            await interaction.reply({ content: 'You are already verified!', ephemeral: true })
        } else {
            await interaction.member.roles.add(role)

            const embed = new EmbedBuilder()
                .setColor('6AAE5D')
                .setTitle(`***${interaction.member.user.username}*** you are now verified in ***${interaction.guild.name}***!`)
                .setDescription('You are now free to use the server ' + client.emotes.smile)
                .setThumbnail(interaction.member.user.avatarURL())
                .setTimestamp()

            await interaction.reply({ content: "You have been verified!", ephemeral: true })
            await interaction.member.send({ embeds: [embed] })
        }
    }
}