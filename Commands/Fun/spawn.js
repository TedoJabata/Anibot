const GoogleImages = require('google-images')
const gClient = new GoogleImages(process.env.SEARCH_MACHINE_ID, process.env.GOOGLE_API_KEY);
require("dotenv/config")
require("../../global")
module.exports = {
    name: 'spawn',
    execute: async(message, args, client, interaction) => {
        // fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        //     .then(async(response) => await response.json())
        //     .then(async(data) => {
        //         let index = Math.floor(Math.random() * data.count)
        //         const pokemonName = data.results[index].name
        //         let fixedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
        //         fixedName = fixedName.replaceAll('-', ' ')
        //         const attack = Math.floor(Math.random() * 101)

        //         pokename = fixedName
        //         pokeattack = attack

        //         //FOR IMAGE RESULT
        //         //let query = fixedName + ' pokemon'
        //         // gClient.search(query)
        //         //     .then(images => {
        //         //         images = images.filter(img => !img.url.endsWith('.svg'));
        //         //         let image = images[Math.floor(Math.random() * images.length)].url
        //         //         if (interaction) {
        //         //             interaction.reply(`***A pokemon appeared!***\nName: ***${fixedName}***\nAttack: ***${attack}*** \n${image}`)
        //         //         } else {
        //         //             message.channel.send(`***A pokemon appeared!***\nName: ***${fixedName}***\nAttack: ***${attack}*** \n${image}`)
        //         //         }
        //         //     })

        //         //NO IMAGE
        //         if (interaction) {
        //             await interaction.reply(`***A pokemon appeared!***\nName: ***${fixedName}***\nAttack: ***${attack}***`)
        //         } else {
        //             await message.channel.send(`***A pokemon appeared!***\nName: ***${fixedName}***\nAttack: ***${attack}***`)
        //         }
        //     })
        if (interaction) {
            await interaction.reply(`This command isn't available right now`)
        } else {
            await message.channel.send(`This command isn't available right now`)
        }
    }
}