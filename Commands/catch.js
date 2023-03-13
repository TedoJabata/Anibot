const Discord = require('discord.js')
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.MessageContent
    ]
})

module.exports = {
    description: 'Catches a pokemon',

    slash: true,
    testOnly: true,

    callback: ({ interaction }) => {
        client.commands = new Discord.Collection()
        let cmd = require(`./Fun/catch`)
        client.commands.set('catch', cmd)
        cmd = client.commands.get('catch')
        cmd.run(client, '', '', true, interaction)
    }
}