require("../../global")

const { UserExists, CreateUser, CreatePokemon } = require("../../Controllers/dbController")

module.exports = {
    name: 'catch',
    run: async(client, message) => {
        if (typeof pokename == 'undefined' || pokename == '') {
            message.channel.send(`No pokemons around to be catched!`);
            return;
        }

        let userExists = await UserExists(message.author.id)

        if (!userExists) {
            await CreateUser(message.author.id, message.author.username)
        }

        await CreatePokemon(pokename, pokeattack, message.author.id)

        await message.channel.send(`<@${message.author.id}> you got ***${pokename}*** with ***${pokeattack}*** power!`)

        pokename = ''
        pokeattack = 0
    }
}