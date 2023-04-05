const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subtract')
        .setDescription('Subtracts the 2nd number from the 1st.')
        .addNumberOption(option =>
            option.setName('number1')
            .setDescription('The first number')
            .setRequired(true))
        .addNumberOption(option =>
            option.setName('number2')
            .setDescription('The second number')
            .setRequired(true)),
    async execute(interaction) {
        const num1 = interaction.options.getNumber('number1')
        const num2 = interaction.options.getNumber('number2')
        await interaction.reply(`The result is: ***${String(num1 - num2)}***`)
    },
}