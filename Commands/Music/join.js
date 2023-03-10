module.exports = {
    name: 'join',
    aliases: ['move'],
    run: async(client, message, args) => {
        let voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send(
                `${client.emotes.error} | You must be in a voice channel!`
            )
        }
        client.distube.voices.join(voiceChannel)
    }
}