require("../../global")

const { UserExists, CreateUser, CreatePokemon } = require("../../Controllers/dbController")

module.exports = {
    name: 'catch',
    run: async(client, message, args, isInteraction, interaction) => {
        if (typeof pokename == 'undefined' || pokename == '') {
            if (isInteraction) {
                interaction.reply(`No pokemons around to be catched!`)
            } else {
                message.channel.send(`No pokemons around to be catched!`);
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
                await CreateUser(interaction.user.id, interaction.user.name)
            } else {
                await CreateUser(message.author.id, message.author.id)
            }
        }

        if (isInteraction) {
            await CreatePokemon(pokename, pokeattack, interaction.user.id)
        } else {
            await CreatePokemon(pokename, pokeattack, message.author.id)
        }

        if (isInteraction) {
            await interaction.reply(`<@${interaction.user.id}> you got ***${pokename}*** with ***${pokeattack}*** power!`)
        } else {
            await message.channel.send(`<@${message.author.id}> you got ***${pokename}*** with ***${pokeattack}*** power!`)
        }

        pokename = ''
        pokeattack = 0
    }
}