const UserSchema = require("../Models/User")
const PokemonSchema = require("../Models/Pokemon")

async function UserExists(userId) {
    let foundUser = await UserSchema.findOne({ discordId: userId })
    if (foundUser == null) {
        return false
    }
    return true
}

async function CreateUser(userId, username) {
    const user = new UserSchema({ discordId: userId, discordName: username, pokemons: [] })
    user.save()
}

async function CreatePokemon(name, attack, userId) {

    const pokemon = new PokemonSchema({ name: name, attack: attack, ownerId: userId })
    pokemon.save()
    await AddPokemonToUser(pokemon.id, userId)
}

async function AddPokemonToUser(pokemonId, userId) {
    let foundUser = await UserSchema.findOne({ discordId: userId })
    foundUser.pokemons.push(pokemonId)
    foundUser.save()
}

module.exports = { UserExists, CreateUser, CreatePokemon }