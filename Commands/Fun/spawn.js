require("../../global")

module.exports = {
    name: 'spawn',
    run: async(client, message) => {
        if (message.author.id === '978754737031761960' || message.author.id === '1057227424967962664') {
            fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
                .then((response) => response.json())
                .then((data) => {
                    let index = Math.floor(Math.random() * data.count);
                    const pokemonName = data.results[index].name
                    const fixedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
                    const attack = Math.floor(Math.random() * 101)
                    message.channel.send(`***A pokemon appeared!***\nName: ***${fixedName}***\nAttack: ***${attack}***`)
                    pokename = fixedName
                    pokeattack = attack
                });
        } else {
            message.channel.send(`<@${message.author.id}> You can't spawn pokemons!`)
        }
    }
}