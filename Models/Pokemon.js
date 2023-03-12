const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Pokemon = new Schema({
    name: String,
    attack: Number,
    ownerId: String,
});

mongoose.model('Pokemon', Pokemon)
module.exports = mongoose.model('Pokemon', Pokemon, "pokemons");