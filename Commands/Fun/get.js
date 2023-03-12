require("../../global")

const { UserExists } = require("../../Controllers/dbController")

module.exports = {
    name: 'get',
    run: async(client, message) => {
        if (pokename === null || pokename == '') return;

        message.channel.send(`<@${message.author.id}> You got ***${pokename}*** with ***${pokeattack}*** power!`)

        pokename = ''
        pokeattack = 0

        UserExists(message.author.id)
    }
}