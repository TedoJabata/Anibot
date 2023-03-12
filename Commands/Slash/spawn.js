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
    description: 'Spawns a pokemon',

    slash: true,
    testOnly: true,

    callback: ({ interaction }) => {
        client.commands = new Discord.Collection()
        let cmd = require(`../Fun/spawn`)
        client.commands.set('spawn', cmd)
        cmd = client.commands.get('spawn')
        cmd.run(client, '', '', true, interaction)
    }
}