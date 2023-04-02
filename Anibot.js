//DISCORD
const { Events } = require('discord.js')
const Discord = require('discord.js')
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
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

const { DisTubeEventsListener } = require('./DisTubeEventsListener')
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

//REGISTER ALL COMMANDS
ReadCommands(['Music', 'Fun', 'Math', 'Moderation'], client)
ReadSlashCommands(['Music', 'Fun', 'Math', 'Moderation'], client)
DisTubeEventsListener(client)

//LISTENERS
client.on(Events.ClientReady, () => {
    console.log('The bot is ready.')
})

client.on(Events.MessageCreate, async message => {
    MessageHandler(message, client)
})

client.on(Events.InteractionCreate, async interaction => {
    InteractionHandler(interaction, client)
})

client.on(Events.GuildMemberAdd, async member => {
    console.log('5')
    const role = member.guild.roles.cache.find(role => role.name === 'Member') //WIP
    console.log('4')
    member.roles.add(role)

    console.log('3')

    console.log('2')
    const welcomembed = new Discord.EmbedBuilder()
        .setColor('6AAE5D')
        .setTitle('Welcome ' + member.user.username)
        .setAuthor({ name: await member.guild.fetchOwner().user.username, iconURL: await member.guild.fetchOwner().avatarURL() })
        .setDescription('You automaticly got the role "Member".')
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
    console.log('1')
    let channel = member.guild.channels.cache.get("1092162519046561902")
    console.log('0')
    await channel.send({ content: `<@${member.user.id}>`, embeds: [welcomembed] })
})

//LOGIN
client.login(process.env.TOKEN)