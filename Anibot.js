const { DisTube } = require('distube')
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
const { YtDlpPlugin } = require('@distube/yt-dlp')
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

fs.readdir('./Commands/Music', (err, files) => {
    if (err) return console.log('Could not find any commands!')
    const jsFiles = files.filter(f => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0) return console.log('Could not find any commands!')
    jsFiles.forEach(file => {
        const cmd = require(`./Commands/Music/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

client.on('ready', () => {
    console.log(`${client.user.tag} is ready to play music.`)
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
    } catch (e) {
        console.error(e)
        message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
    }
})

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
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



/*const { Client, IntentsBitField, Partials, Collection, Routes } = require("discord.js");
const WOK = require("wokcommands");
const path = require("node:path");
const { Play } = require("./Commands/Prefix/Music/play");
const { Add } = require("./Commands/Prefix/Math/add");
const { Info } = require("./Commands/Prefix/info");
const { Player } = require('discord-player');
const Discord = require('discord.js');
const fs = require('node:fs');
const { ActivityType } = require('discord.js');
require("dotenv/config");
const { REST } = require('@discordjs/rest');




const clientId = 1004491095008358530;
const guildId = 1004132716335333376;


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

const commands = [];
const commandsPath = path.join(__dirname, 'Commands/Slash');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

const player = new Player(client);

client.on("ready", () => {
    /*new WOK({
        client,
        commandsDir: path.join(__dirname, "Commands/Slash"),
        testServers: ['1004132716335333376'],
    });
console.log("The bot is ready!")
});


client.on('messageCreate', async message => {

   /* message.guild.commands.permissions.update
    if (message.content === '!deploy' /*&& message.author.id === 978754737031761960
) {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId)), { body: client.commands }
    await message.guild.commands
        .set(client.commands)
        .then(() => {
            message.reply('Deployed!');
        })
        .catch(err => {
            message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
            console.error(err);
        });
} * /


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

/*client.on('interactionCreate', async interaction => {
    const command = client.commands.get(interaction.commandName.toLowerCase());

    try {
        if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
            command.execute(interaction, client);
        } else {
            command.execute(interaction, player);
        }
    } catch (error) {
        console.error(error);
        interaction.followUp({
            content: 'There was an error trying to execute that command!',
        });
    }
}); * /

client.login(process.env.TOKEN);*/