const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    execute: async(message, args, client, isInteraction, interaction) => {
        const searchString = args.join(' ')
        if (!searchString) return await Send(isInteraction, `${client.emotes.error} | Please enter a song url or query to search.`, true, interaction, message)
        await client.distube.play(message.member.voice.channel, searchString, {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
}