const { Client, IntentsBitField, Partials } = require("discord.js");
const WOK = require("wokcommands");
const path = require("path");
const { Play } = require("./Commands/Prefix/Music/play");
const { Add } = require("./Commands/Prefix/Math/add");
const { Info } = require("./Commands/Prefix/info");
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

client.on("ready", () => {
    new WOK({
        client,
        commandsDir: path.join(__dirname, "Commands/Slash"),
        testServers: ['1004132716335333376'],
    });
    console.log("The bot is ready!")
});


client.on('messageCreate', async message => {
    let args = message.content.split(' ')
    if (args[0].toLowerCase() == "ani" && !message.author.bot) {
        switch (args[1].toLowerCase()) {
            case "ping":
                await message.reply("***Pong!***")
                break;
            case "play":
                await Play(message, ' ')
                break;
            case "add":
                await Add(message, args.slice(2))
                break;
            case "info":
                await Info(message)
                break;
            default:
                await message.reply("***No such command!***")
                break;
        }
    }
})

client.login(process.env.TOKEN);