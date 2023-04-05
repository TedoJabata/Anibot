const { ChoosePokemon } = require("../../Controllers/DBController")
const { Send } = require("../../Controllers/ReplyController")

const Player1 = {
    id: '',
    name: '',
    pokeName: '',
    pokeAtk: 0,
}

const Player2 = {
    name: '',
    pokeName: '',
    pokeAtk: 0,
}

let battleReset = true

module.exports = {
    name: 'battle',
    execute: async(message, args, client, interaction) => {
        let msgOrIntr
        if (interaction) {
            msgOrIntr = interaction
        } else {
            msgOrIntr = message
        }

        let hasPremission = msgOrIntr.member.permissions.has('Administrator')
        if ((args[0] == 'reset' || args[0] == 'r' || args == 'reset') && hasPremission) {
            Player1.id = ''
            battleReset = true
            await Send(`Resetting the battle...`, true, interaction, message)
        } else {
            let pokemon = await ChoosePokemon(msgOrIntr.member.id, msgOrIntr.member.user.username)
            if (!pokemon) {
                await Send(`You have no pokemons to use for a battle.`, true, interaction, message)
            } else {
                if (battleReset == undefined || battleReset == true) {
                    battleReset = false

                    Player1.name = msgOrIntr.member.user.username
                    Player1.id = msgOrIntr.member.id
                    Player1.pokeName = pokemon.name
                    Player1.pokeAtk = pokemon.attack

                    await Send(`Waiting for an opponent...`, true, interaction, message)
                } else {
                    let isSamePlayer = false
                    if (Player1.id == msgOrIntr.member.id) {
                        isSamePlayer = true
                    }

                    if (isSamePlayer) {
                        await Send(`You can't battle yourself!`, true, interaction, message)
                    } else {
                        Player2.name = msgOrIntr.member.user.username
                        Player2.pokeName = pokemon.name
                        Player2.pokeAtk = pokemon.attack

                        if (Player1.pokeAtk > Player2.pokeAtk) {
                            await Send(`***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)*** was brutally beaten from ***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)!***\n***${Player1.name}*** wins!`, false, interaction, message)
                        } else if (Player1.pokeAtk < Player2.pokeAtk) {
                            await Send(`***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)*** was brutally beaten from ***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)!***\n***${Player2.name}*** wins!`, false, interaction, message)
                        } else {
                            await Send(`The battle ends in a draw!`, false, interaction, message)
                        }
                        Player1.id = ''
                        battleReset = true
                    }
                }
            }
        }
    }
}