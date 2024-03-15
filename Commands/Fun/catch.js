const { UserExists, CreateUser, CreatePokemon } = require("../../Controllers/DBController")
require("../../global")

module.exports = {
    name: 'catch',
    execute: async(message, args, client, interaction) => {
        let msgOrIntr
        if (interaction) {
            msgOrIntr = interaction
        } else {
            msgOrIntr = message
        }

        // if (typeof pokename == 'undefined' || pokename == '') {
        //     await msgOrIntr.reply(`No pokemons around to be catched!`)
        //     return
        // }

        // let userExists = await UserExists(msgOrIntr.member.id)
        // if (!userExists) { await CreateUser(msgOrIntr.member.id, msgOrIntr.member.user.username) }
        // await CreatePokemon(pokename, pokeattack, msgOrIntr.member.id, msgOrIntr.member.user.username)

        // if (interaction) {
        //     await interaction.reply(`You got ***${pokename}*** with ***${pokeattack}*** power!`)
        // } else {
        //     await message.channel.send(`<@${message.member.id}> got ***${pokename}*** with ***${pokeattack}*** power!`)
        // }

        // pokename = ''
        // pokeattack = 0
        if (interaction) {
            await interaction.reply(`This command isn't available right now`)
        } else {
            await message.channel.send(`This command isn't available right now`)
        }
    }
}