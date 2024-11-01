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
require('discord-player');

const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const { DisTubeEventsListener } = require('./DisTubeEventsListener')

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin(),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
    ]
})

//HANDLERS, REGISTRANT & READER
const { InteractionHandler } = require('./Handlers/InteractionHandler')
const { MessageHandler } = require('./Handlers/MessageHandler')
const { ReadCommands, ReadSlashCommands } = require('./CommandsReader')

//JOIN & LEAVE MESSAGES
//const { OnJoin, OnLeave } = require('./Controllers/JoinLeaveController')

//CONFIGS
const config = require('./config.json')
client.config = require('./config.json')
require('dotenv/config')

//COMANDS, SLASHES & EMOTES
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.slashCommands = new Discord.Collection()
client.emotes = config.emoji

//DATABASE
/*
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO, { useNewUrlParser: true })

const db = mongoose.connection
db.once("open", function() {
    console.log('Database connected')
})
*/

//REGISTER ALL COMMANDS
ReadCommands(['Music', 'Fun', 'Math', 'Moderation'], client)
ReadSlashCommands(['Music', 'Fun', 'Math', 'Moderation'], client)

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

//client.on(Events.GuildMemberAdd, async member => {
 //   OnJoin(member)
//})

//client.on(Events.GuildMemberRemove, async member => {
//    OnLeave(member, client)
//})

DisTubeEventsListener(client)

//LOGIN
client.login(process.env.TOKEN)