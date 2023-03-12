const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    discordId: Number,
    discordName: String,
    pokemons: Array,
});

mongoose.model('User', User)
module.exports = User