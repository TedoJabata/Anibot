require("../../global")

module.exports = {
    name: 'spawn',
    run: async(client, message, args, isInteraction, interaction) => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
            .then((response) => response.json())
            .then((data) => {
                let index = Math.floor(Math.random() * data.count);
                const pokemonName = data.results[index].name;
                let fixedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
                fixedName = fixedName.replaceAll('-', ' ');
                const attack = Math.floor(Math.random() * 101);
                if (isInteraction) {
                    interaction.reply(`***A pokemon appeared!***\nName: ***${fixedName}***\nAttack: ***${attack}***`)
                } else {
                    message.channel.send(`***A pokemon appeared!***\nName: ***${fixedName}***\nAttack: ***${attack}***`);
                }

                pokename = fixedName;
                pokeattack = attack;
            })
    }
}