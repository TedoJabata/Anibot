// const Discord = require('discord.js')
// const client = new Discord.Client({
//     intents: [
//         Discord.GatewayIntentBits.Guilds,
//         Discord.GatewayIntentBits.GuildMessages,
//         Discord.GatewayIntentBits.GuildVoiceStates,
//         Discord.GatewayIntentBits.MessageContent
//     ]
// })

// module.exports = {
//     description: 'Spawns a pokemon',

//     slash: true,
//     testOnly: true,

//     callback: ({ interaction }) => {
//         client.commands = new Discord.Collection()
//         let cmd = require(`./Fun/spawn`)
//         client.commands.set('spawn', cmd)
//         cmd = client.commands.get('spawn')
//         cmd.run(client, '', '', true, interaction)
//     }
// }

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spawn')
        .setDescription('Spawns a pokemon'),
    async execute(interaction, client, commands) {
        let cmd = require(`../Fun/spawn`)
        cmd = commands.get('spawn')
        cmd.execute(client, '', '', true, interaction)
    },
};