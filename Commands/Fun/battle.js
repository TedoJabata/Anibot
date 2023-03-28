const { ChoosePokemon } = require("../../Controllers/DBController")

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
        let premission
        if (isInteraction) {
            premission = interaction.member.permissions.has('Administrator')
        } else {
            premission = message.member.permissions.has('Administrator')
        }
        if ((args[0] == 'reset' || args[0] == 'r' || args == 'reset') && premission) {
            Player1.id = ''
            battleReset = true
            await Print(isInteraction, `Resetting the battle...`, true, interaction, message)
        } else {
            let pokemon
            if (isInteraction) {
                pokemon = await ChoosePokemon(interaction.user.id, interaction.user.tag.slice(0, -5))
            } else {
                pokemon = await ChoosePokemon(message.author.id, message.author.tag.slice(0, -5))
            }
            if (!pokemon) {
                await Print(isInteraction, `You have no pokemons to use for a battle.`, true, interaction, message)
            } else {
                if (battleReset == undefined || battleReset == true) {
                    battleReset = false
                    if (isInteraction) {
                        Player1.name = interaction.user.tag.slice(0, -5)
                        Player1.id = interaction.user.id
                    } else {
                        Player1.name = message.author.tag.slice(0, -5)
                        Player1.id = message.author.id
                    }

                    Player1.pokeName = pokemon.name
                    Player1.pokeAtk = pokemon.attack

                    await Print(isInteraction, `Waiting for an opponent...`, true, interaction, message)
                } else {
                    let isSamePlayer
                    if (isInteraction) {
                        if (Player1.id == interaction.user.id) {
                            isSamePlayer = true
                        }
                    } else {
                        if (Player1.id == message.author.id) {
                            isSamePlayer = true
                        }
                    }
                    if (isSamePlayer) {
                        await Print(isInteraction, `You can't battle yourself!`, true, interaction, message)
                    } else {
                        if (isInteraction) {
                            Player2.name = interaction.user.tag.slice(0, -5)
                        } else {
                            Player2.name = message.author.tag.slice(0, -5)
                        }
                        Player2.pokeName = pokemon.name
                        Player2.pokeAtk = pokemon.attack
                        if (Player1.pokeAtk > Player2.pokeAtk) {
                            await Print(isInteraction, `***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)*** was brutally beaten from ***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)!***\n***${Player1.name}*** wins!`, false, interaction, message)
                        } else if (Player1.pokeAtk < Player2.pokeAtk) {
                            await Print(isInteraction, `***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)*** was brutally beaten from ***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)!***\n***${Player2.name}*** wins!`, false, interaction, message)
                        } else {
                            await Print(isInteraction, `The battle ends in a draw!`, false, interaction, message)
                        }
                        Player1.id = ''
                        battleReset = true
                    }
                }
            }
        }
    }
}

async function Print(isInteraction, text, reply, interaction, message) {
    if (isInteraction) {
        await interaction.reply(text)
    } else {
        if (reply) {
            await message.reply(text)
        } else {
            await message.channel.send(text)
        }
    }
}