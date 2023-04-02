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
require('discord-player/smoothVolume');

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

//HANDLERS, REGISTRANT & READER
const { InteractionHandler } = require('./Handlers/InteractionHandler')
const { MessageHandler } = require('./Handlers/MessageHandler')
const { ReadCommands, ReadSlashCommands } = require('./CommandsReader')

//JOIN & LEAVE MESSAGES
const { OnJoin, OnLeave } = require('./Controllers/JoinLeaveController')

//CONFIGS
const config = require('./config.json')
client.config = require('./config.json')
require('dotenv/config')
require('discord-player/smoothVolume')

//COMANDS, SLASHES & EMOTES
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.slashCommands = new Discord.Collection()
client.emotes = config.emoji

//DATABASE
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO, { useNewUrlParser: true })

const db = mongoose.connection
db.once("open", function() {
    console.log('Database connected')
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
    OnJoin(member, Discord)
})

client.on(Events.GuildMemberRemove, async member => {
    console.log('left')
    OnLeave(member, client)
})

//LOGIN
client.login(process.env.TOKEN)