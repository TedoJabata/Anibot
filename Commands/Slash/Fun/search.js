const { SlashCommandBuilder } = require('discord.js');
const GoogleImages = require('google-images');
require("dotenv/config");
const client = new GoogleImages(process.env.SEARCH_MACHINE_ID, process.env.GOOGLE_API_KEY);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Searches for an image.')
        .addStringOption(option =>
            option.setName('argument')
            .setDescription('The first number')
            .setRequired(true)),
    async execute(interaction) {
        const arg = interaction.options.getString('argument')

        client.search(arg)
            .then(async images => {
                images = images.filter(img => !img.url.endsWith('.svg'));
                await interaction.reply(`${images[Math.floor(Math.random() * images.length)].url}`)
            });
    },
}