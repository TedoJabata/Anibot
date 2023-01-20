const play = require('play-dl')
const {
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require('@discordjs/voice');
module.exports = {
    async execute(message) {

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
            player.once(AudioPlayerStatus.Idle, () => connection.destroy)
        }
    }
}

/*const {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
global.AbortController = require("node-abort-controller").AbortController;

module.exports = {
    name: 'play',
    description: 'joins aadn plays muusic',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel)
            return message.channel.send('> **You need to join voicechannel first!**');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT'))
            return message.channel.send('> **You dont have right permissions!**');
        if (!permissions.has('SPEAK'))
            return message.channel.send('> **You dont have right permissions!**');
        if (args.length < 2)
            return message.channel.send('> **You need to insert name of the song!**');

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        const videoFinder = async(query) => {
            const videoResult = await ytSearch(query);
            return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
        };

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly', highWaterMark: 100000 });
            const player = createAudioPlayer();
            const resource = createAudioResource(stream);

            await player.play(resource);
            connection.subscribe(player);

            player.on('error', (error) => console.error(error));
            player.on(AudioPlayerStatus.Idle, () => {
                console.log(`song's finished`);
                connection.disconnect();
            });

            await message.reply(`:thumbsup: Now playing ***${video.title}***`);
        } else {
            message.channel.send('No video results found');
        }
    },
};*/