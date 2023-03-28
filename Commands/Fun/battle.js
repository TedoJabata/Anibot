const { ChoosePokemon } = require("../../Controllers/dbController")

const Player1 = {
    id: '',
    name: '',
    pokeName: '',
    pokeAtk: 0,
};

const Player2 = {
    name: '',
    pokeName: '',
    pokeAtk: 0,
};

let battleReset = true

module.exports = {
    name: 'battle',
    execute: async(message, args, client, isInteraction, interaction) => {
        if ((args[0] == 'reset' || args[0] == 'res') && message.member.permissions.has('Administrator')) {
            Player1.id = ''
            battleReset = true
            await message.reply(`Resetting the battle...`)
        } else {
            let pokemon = await ChoosePokemon(message.author.id, message.author.name)
            if (!pokemon) {
                await message.reply(`You have no pokemons to use for a battle.`)
            } else {
                if (battleReset == undefined || battleReset == true) {
                    battleReset = false
                    Player1.name = message.author.tag.slice(0, -5)
                    Player1.pokeName = pokemon.name
                    Player1.pokeAtk = pokemon.attack
                    Player1.id = message.author.id
                    await message.reply(`Waiting for an opponent...`)
                } else {
                    if (Player1.id == message.author.id) {
                        await message.reply(`You can't battle yourself!`)
                    } else {
                        Player2.name = message.author.tag.slice(0, -5)
                        Player2.pokeName = pokemon.name
                        Player2.pokeAtk = pokemon.attack
                        if (Player1.pokeAtk > Player2.pokeAtk) {
                            await message.channel.send(`***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)*** was brutally beaten from ***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)!***\n***${Player1.name}*** wins!`)
                        } else if (Player1.pokeAtk < Player2.pokeAtk) {
                            await message.channel.send(`***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)*** was brutally beaten from ***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)!***\n***${Player2.name}*** wins!`)
                        } else {
                            await message.channel.send(`The battle ends in a draw!`)
                        }
                        Player1.id = ''
                        battleReset = true
                    }
                }
            }
        }
    }
}