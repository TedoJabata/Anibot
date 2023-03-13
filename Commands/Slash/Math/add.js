// module.exports = {
//     description: 'Adds two numbers',

//     slash: true,
//     testOnly: true,

//     options: [{
//             name: 'num1',
//             description: 'The first number.',
//             required: true,
//         },
//         {
//             name: 'num2',
//             description: 'The second number.',
//             required: true,
//         },
//     ],
//     callback: ({ interaction, args }) => {
//         const num1 = parseInt(args[0])
//         const num2 = parseInt(args[1])

//         if (interaction) {
//             interaction.reply({
//                 content: `The result is: ***${String(num1 + num2)}***`
//             })
//         }
//     },
// }
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Adds 2 numbers together')
        .addNumberOption(option =>
            option.setName('number1')
            .setDescription('The first number'))
        .addNumberOption(option =>
            option.setName('number2')
            .setDescription('The second number')),
    async execute(interaction) {
        const num1 = interaction.option.getNumber('number1')
        const num2 = interaction.option.getNumber('number2')
        await interaction.reply(`The result is: ***${String(num1 + num2)}***`);
    },
}