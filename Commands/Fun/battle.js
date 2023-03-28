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
        let premission
        if (isInteraction) {
            premission = interaction.member.permissions.has('Administrator')
        } else {
            premission = message.member.permissions.has('Administrator')
        }
        if ((args[0] == 'reset' || args[0] == 'r' || args == 'reset') && premission) {
            Player1.id = ''
            battleReset = true
            if (isInteraction) {
                await interaction.reply(`Resetting the battle...`)
            } else {
                await message.reply(`Resetting the battle...`)
            }
        } else {
            let pokemon
            if (isInteraction) {
                pokemon = await ChoosePokemon(interaction.user.id, interaction.user.tag.slice(0, -5))
            } else {
                pokemon = await ChoosePokemon(message.author.id, message.author.tag.slice(0, -5))
            }
            if (!pokemon) {
                if (isInteraction) {
                    await interaction.reply(`You have no pokemons to use for a battle.`)
                } else {
                    await message.reply(`You have no pokemons to use for a battle.`)
                }
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
                    if (isInteraction) {
                        await interaction.reply(`Waiting for an opponent...`)
                    } else {
                        await message.reply(`Waiting for an opponent...`)
                    }
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
                        if (isInteraction) {
                            await interaction.reply(`You can't battle yourself!`)
                        } else {
                            await message.reply(`You can't battle yourself!`)
                        }
                    } else {
                        if (isInteraction) {
                            Player2.name = interaction.user.tag.slice(0, -5)
                        } else {
                            Player2.name = message.author.tag.slice(0, -5)
                        }
                        Player2.pokeName = pokemon.name
                        Player2.pokeAtk = pokemon.attack
                        if (Player1.pokeAtk > Player2.pokeAtk) {
                            if (isInteraction) {
                                await interaction.reply(`***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)*** was brutally beaten from ***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)!***\n***${Player1.name}*** wins!`)
                            } else {
                                await message.channel.send(`***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)*** was brutally beaten from ***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)!***\n***${Player1.name}*** wins!`)
                            }
                        } else if (Player1.pokeAtk < Player2.pokeAtk) {
                            if (isInteraction) {
                                await interaction.reply(`***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)*** was brutally beaten from ***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)!***\n***${Player2.name}*** wins!`)
                            } else {
                                await message.channel.send(`***${Player1.name}'s ${Player1.pokeName}(${Player1.pokeAtk}atk)*** was brutally beaten from ***${Player2.name}'s ${Player2.pokeName}(${Player2.pokeAtk}atk)!***\n***${Player2.name}*** wins!`)
                            }
                        } else {
                            if (isInteraction) {
                                await interaction.reply(`The battle ends in a draw!`)
                            } else {
                                await message.channel.send(`The battle ends in a draw!`)
                            }
                        }
                        Player1.id = ''
                        battleReset = true
                    }
                }
            }
        }
    }
}