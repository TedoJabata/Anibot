const play = require('play-dl')
const {
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    NoSubscriberBehavior,
} = require('@discordjs/voice');
module.exports = {
    async Play(message, args) {
        console.log(args)
        if (!message.member.voice.channel) return await message.reply('Connect to a Voice Channel')

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })

        if (args == ' ') {
            args = message.content.split('play')[1]
        }

        let yt_info = await play.search(String(args), {
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

        await message.channel.send(`Now playing ***${yt_info[0].title}***`)
    }
}