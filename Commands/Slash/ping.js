const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};




// const { CommandType } = require("wokcommands");

// module.exports = {
//     description: "Info command",

//     type: CommandType.SLASH,

//     callback: () => {
//         return {
//             content: "***Pong!***",
//         }
//     },
// }