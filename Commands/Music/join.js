const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'join',
    aliases: ['move'],
    execute: async(message, args, client, isInteraction, interaction) => {
        let voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return await Send(isInteraction, `${client.emotes.error} | You must be in a voice channel!`, true, interaction, message)
        }
        await client.distube.voices.join(voiceChannel)
    }
}