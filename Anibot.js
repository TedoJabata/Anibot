//DISCORD
const { Events } = require('discord.js')
const Discord = require('discord.js')
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.MessageContent
    ]
})

//DISTUBE
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

require("discord-player/smoothVolume");

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

//HANDLERS & REGISTRANT & READER
const { InteractionHandler } = require("./Handlers/InteractionHandler")
const { MessageHandler } = require("./Handlers/MessageHandler")
const { ReadCommands, ReadSlashCommands } = require("./CommandsReader")

//CONFIGS
const config = require('./config.json')
client.config = require('./config.json')
require("dotenv/config")
require("discord-player/smoothVolume")

//COMANDS - SLASHES - EMOTES
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.slashCommands = new Discord.Collection()
client.emotes = config.emoji

//DATABASE
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO, { useNewUrlParser: true })

const db = mongoose.connection
db.once("open", function() {
    console.log("Database connected")
})

client.on(Events.ClientReady, () => {
    ReadCommands(['Music', 'Fun', 'Math', 'Moderation'], client)
    ReadSlashCommands(['Music', 'Fun', 'Math', 'Moderation'], client)
    console.log('The bot is ready.')
})

client.on(Events.MessageCreate, async message => {
    MessageHandler(message, client)
})

client.on(Events.InteractionCreate, async interaction => {
    InteractionHandler(interaction, client)
})

//WIP
client.on(Events.GuildMemberAdd, async member => {
    const role = guild.roles.find(role => role.name === 'Member')
    member.addRole(role)
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