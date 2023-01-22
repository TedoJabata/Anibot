const { Client, IntentsBitField, Partials } = require("discord.js");
const WOK = require("wokcommands");
const path = require("path");
require("dotenv/config");
const { Play } = require("./Music/play");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
    partials: [Partials.Channel],
});

const queue = new Map();

client.on("ready", () => {
    new WOK({
        client,
        commandsDir: path.join(__dirname, "commands"),
        testServers: ['1004132716335333376'],
    });
});


client.on('messageCreate', async message => {
    Play(message)
})

client.login(process.env.TOKEN);