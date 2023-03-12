const mongoose = require("mongoose");
const UserSchema = require("./Models/User")
const PokemonSchema = require("./Models/Pokemon")

function UserExists(userId) {
    mongoose.model("users", UserSchema, "test")
    console.log(userId)
}

/*const Pokemon = mongoose.model('Pokemon', PokemonSchema, "pokemons");
const pokemon = new Pokemon({ name: "TestPokejan", ownerId: 1 })
pokemon.save()

const User = mongoose.model('User', UserSchema, "users");
const user = new User({ discordId: 1, discordName: "Test", pokemons: [pokemon.id] })
user.save()*/

module.exports = { UserExists }