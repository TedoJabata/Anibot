const { Client, IntentsBitField, Partials } = require("discord.js");
const WOK = require("wokcommands");
const path = require("path");
const { Play } = require("./Music/play");
require("dotenv/config");

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
    console.log("The bot is ready!")
});


client.on('messageCreate', async message => {
    let args = message.content.split(' ')
    if (args[0] == "ani" && !message.author.bot) {
        switch (args[1]) {
            case "ping":
                await message.reply("***Pong!***")
                break;
            case "play":
                await Play(message, ' ')
                break;
            default:
                await message.reply("***No such command!***")
                break;
        }
    }
})

client.login(process.env.TOKEN);