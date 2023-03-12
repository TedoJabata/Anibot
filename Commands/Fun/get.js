require("../../global")

module.exports = {
    name: 'get',
    run: async(client, message) => {
        if (pokename == '') return;

        message.channel.send(`<@${message.author.id}> You got ***${pokename}*** with ***${pokeattack}*** power!`)

        pokename = ''
        pokeattack = 0
    }
}