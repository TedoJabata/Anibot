const play = require('play-dl')
const {
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    NoSubscriberBehavior,
} = require('@discordjs/voice');
module.exports = {
    async Play(message) {

        if (message.content.startsWith('!play')) {

            if (!message.member.voice.channel) return message.channel.send('Connect to a Voice Channel')

            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })


            let args = message.content.split('play')[1]
            let yt_info = await play.search(args, {
                limit: 1
            })

            let stream = await play.stream(yt_info[0].url)

            let resource = createAudioResource(stream.stream, {
                inputType: stream.type
            })

            let player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Play
                }
            })

            player.play(resource)

            connection.subscribe(player)

            message.channel.send(`Now playing ${yt_info[0].title}`)
        }
    }
}