const { DisTube } = require('distube')
const mongoose = require("mongoose");
const WOK = require("wokcommands");
const path = require("path");
const Discord = require('discord.js')
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.MessageContent
    ]
})
const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp');
require("dotenv/config");
require("discord-player/smoothVolume");

client.config = require('./config.json')
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

mongoose.connect(process.env.MONGO, { useNewUrlParser: true });

const db = mongoose.connection
db.once("open", function() {
    console.log("Connected successfully")
});






ReadCommands('./Commands/Music')
ReadCommands('./Commands/Fun')
ReadCommands('./Commands/Math')

async function ReadCommands(path) {
    fs.readdir(path, (err, files) => {
        if (err) { console.log(err); return }
        const jsFiles = files.filter(f => f.split('.').pop() === 'js')

        jsFiles.forEach(file => {
            const cmd = require(`${path}/${file}`)
            console.log(`Loaded ${file}`)
            client.commands.set(cmd.name, cmd)
            if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
        })
    })
}

client.on('ready', () => {
    new WOK({
        client,
        commandsDir: path.join(__dirname, "Commands/Slash"),
        testServers: ['1004132716335333376'],
    });
    console.log('The bot is ready.')
})

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    const prefix = 'ani'

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    }
    try {
        cmd.run(client, message, args)
    } catch (error) {
        console.log("Invalid command")
        message.channel.send("Invalid command")
    }
})

client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send(
            `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\``
        )
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send(
            `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        )
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(
            `${client.emotes.success} | Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
        )
    )
    .on('error', (channel, e) => {
        if (channel) channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
        else console.error(e)
    })
    .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
    .on('searchNoResult', (message, query) =>
        message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
    )
    .on('finish', queue => queue.textChannel.send('Finished!'))

client.login(process.env.TOKEN)