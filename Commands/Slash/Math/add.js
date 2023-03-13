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
        const { options } = interaction;
        const num1 = options.getNumber('number1')
        const num2 = options.getNumber('number2')
        console.log(num1)
        console.log(num2)
        await interaction.reply(`The result is: ***${String(num1 + num2)}***`);
    },
}