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

async function CreatePokemon(name, attack, userId, username) {

    const pokemon = new PokemonSchema({ name: name, attack: attack, ownerId: userId })
    pokemon.save()
    await AddPokemonToUser(pokemon.id, userId, username)
}

async function AddPokemonToUser(pokemonId, userId, username) {
    let foundUser = await UserSchema.findOne({ discordId: userId })
    foundUser.pokemons.push(pokemonId)
    if (foundUser.discordName !== username) { foundUser.discordName = username }
    foundUser.save()
}

module.exports = { UserExists, CreateUser, CreatePokemon }