const config = require('../config.json')

async function OnJoin(member, Discord) {
    const role = member.guild.roles.cache.find(role => role.name === config.defaultRoleName)
    member.roles.add(role)

    const welcomembed = new Discord.EmbedBuilder()
        .setColor('6AAE5D')
        .setTitle(`Welcome ***${member.user.username}*** to ***${member.guild.name}***`)
        .setAuthor({
            name: (await member.guild.fetchOwner()).user.username,
            iconURL: (await member.guild.fetchOwner()).avatarURL()
        })
        .setDescription('You automaticly got the role "Member".')
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()

    let channel = member.guild.channels.cache.get(config.joinLeaveChannelId)
    await channel.send({ content: `<@${member.user.id}>`, embeds: [welcomembed] })
}

async function OnLeave(member, client) {
    let channel = client.channels.cache.get(config.joinLeaveChannelId)
    await channel.send({ content: `***${member.user.username}*** left the server ` + client.emotes.sad })
}

module.exports = { OnJoin, OnLeave }