const UserSchema = require("../Models/UserModel")
const PokemonSchema = require("../Models/PokemonModel")
const ServerSchema = require("../Models/ServerModel")

async function UserExists(userId) {
    let foundUser = await UserSchema.findOne({ discordId: userId })
    if (foundUser == null) {
        return false
    }
    return true
}

async function CreateUser(userId, username) {
    const user = new UserSchema({ discordId: userId, discordName: username, pokemons: [] })
    await user.save()
}

async function CreatePokemon(name, attack, userId, username) {

    const pokemon = new PokemonSchema({ name: name, attack: attack, ownerId: userId })
    await pokemon.save()
    await AddPokemonToUser(pokemon.id, userId, username)
}

async function AddPokemonToUser(pokemonId, userId, username) {
    let foundUser = await UserSchema.findOne({ discordId: userId })
    foundUser.pokemons.push(pokemonId)
    if (foundUser.discordName !== username) { foundUser.discordName = username }
    await foundUser.save()
}

async function ChoosePokemon(userId, username) {
    let foundUser = await UserSchema.findOne({ discordId: userId })
    if (!foundUser) {
        await CreateUser(userId, username)
        foundUser = await UserSchema.findOne({ discordId: userId })
    }
    if (foundUser.pokemons.length != 0) {
        let pokemonId = foundUser.pokemons[Math.floor(Math.floor(Math.random() * foundUser.pokemons.length))]
        let foundPokemon = await PokemonSchema.findOne({ _id: pokemonId })
        return foundPokemon
    }
}

async function Set(sName, serId, joinLeave, muted, member, verified) {
    let foundServer = await ServerSchema.findOne({ serverId: serId })
    if (!foundServer) {
        await CreateServer(sName, serId, joinLeave, muted, member, verified)
        foundServer = await ServerSchema.findOne({ serverId: serId })
    } else {
        if (sName) {
            foundServer.name = sName
        }
        if (serId) {
            foundServer.serverId = serId
        }
        if (joinLeave) {
            foundServer.joinLeaveChannelId = joinLeave
        }
        if (muted) {
            foundServer.mutedRoleName = muted
        }
        if (member) {
            foundServer.memberRoleName = member
        }
        if (verified) {
            foundServer.verifiedRoleName = verified
        }
        await foundServer.save()
    }
}

async function CreateServer(sName, serId, joinLeave, muted, member, verified) {
    const server = new ServerSchema({ name: sName, serverId: serId, joinLeaveChannelId: joinLeave, mutedRoleName: muted, memberRoleName: member, verifiedRoleName: verified })
    await server.save()
}

module.exports = { UserExists, CreateUser, CreatePokemon, ChoosePokemon, Set }