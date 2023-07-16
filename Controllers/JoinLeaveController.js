const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')
const ServerSchema = require("../Models/ServerModel")

async function OnJoin(member) {
    const foundServer = await ServerSchema.findOne({ serverId: member.guild.id })
    const role = member.guild.roles.cache.find(role => role.name === foundServer.memberRoleName)

    if (!role) {
        await (await member.guild.fetchOwner()).send(`Member role not set in ${member.guild.name}. Please set up default role to enable auto member role.`)
    } else {
        await member.roles.add(role)
    }

    const welcomeEmbed = new EmbedBuilder()
        .setColor('6AAE5D')
        .setTitle(`Welcome ***${member.user.username}*** to ***${member.guild.name}***`)
        .setAuthor({
            name: (await member.guild.fetchOwner()).user.username,
            iconURL: (await member.guild.fetchOwner()).avatarURL()
        })
        .setDescription('You automaticly got the role "Member".')
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()

    let channel = member.guild.channels.cache.get(foundServer.joinLeaveChannelId)
    if (!channel) {
        await (await member.guild.fetchOwner()).send(`Join/Leave channel not set in ${member.guild.name}. Please set up the Join/Leave channel ID.`)
    } else {
        await channel.send({ content: `<@${member.user.id}>`, embeds: [welcomeEmbed] })
    }
}

async function OnLeave(member, client) {
    let channel = client.channels.cache.get(config.joinLeaveChannelId)
    if (!channel) {
        await (await member.guild.fetchOwner()).send(`Join/Leave channel not set in ${member.guild.name}. Please set up the Join/Leave channel ID.`)
    } else {
        await channel.send({ content: `***${member.user.username}*** left the server ` + client.emotes.sad })
    }
}

module.exports = { OnJoin, OnLeave }