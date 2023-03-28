require("../../global")

const { UserExists, CreateUser, CreatePokemon } = require("../../Controllers/DBController")

module.exports = {
    name: 'catch',
    execute: async(message, args, client, isInteraction, interaction) => {
        if (typeof pokename == 'undefined' || pokename == '') {
            if (isInteraction) {
                await interaction.reply(`No pokemons around to be catched!`)
            } else {
                await message.channel.send(`No pokemons around to be catched!`);
            }
            return;
        }

        let userExists
        if (isInteraction) {
            userExists = await UserExists(interaction.user.id)
        } else {
            userExists = await UserExists(message.author.id)
        }

        if (!userExists) {
            if (isInteraction) {
                await CreateUser(interaction.user.id, interaction.user.tag.slice(0, -5))
            } else {
                await CreateUser(message.author.id, message.author.tag.slice(0, -5))
            }
        }
        ////////////////////////
        if (isInteraction) {
            await CreatePokemon(pokename, pokeattack, interaction.user.id, interaction.user.tag.slice(0, -5))
        } else {
            await CreatePokemon(pokename, pokeattack, message.author.id, message.author.tag.slice(0, -5))
        }

        if (isInteraction) {
            await interaction.reply(`You got ***${pokename}*** with ***${pokeattack}*** power!`)
        } else {
            await message.channel.send(`<@${message.author.id}> you got ***${pokename}*** with ***${pokeattack}*** power!`)
        }

        pokename = ''
        pokeattack = 0
    }
}