const { Client, GatewayIntentBits, Constants, discordSort, ApplicationCommandOptionType } = require("discord.js");
require('dotenv/config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
})

client.on('ready', () => {
    console.log('Logged In!');
    const guildId = "1004132716335333376"
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application.commands
    }

    commands.create({
        name: 'ping',
        description: 'Replies with pong.'
    })

    commands.create({
        name: 'add',
        description: 'Adds 2 numbers',
        options: [{
            name: "number1",
            description: 'The first number',
            required: true,
            type: ApplicationCommandOptionType.Number
        }, {
            name: "number2",
            description: 'The second number',
            required: true,
            type: ApplicationCommandOptionType.Number
        }]
    })
})

client.on('interactionCreate', async(interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'ping') {
        interaction.channel.send({
            content: 'pong'
        })
    } else if (commandName === 'add') {
        const num1 = options.getNumber('number1')
        const num2 = options.getNumber('number2')

        await interaction.channel.send({
            content: `The result is: ${num1 + num2}`
        })
    }
})

client.on('messageCreate', (message) => {

    const args = message.toString().split(' ');
})
client.login(process.env.TOKEN);