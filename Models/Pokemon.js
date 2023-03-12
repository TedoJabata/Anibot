const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Pokemon = new Schema({
    name: String,
    attack: Number,
    ownerId: Number,
});

mongoose.model('Pokemon', Pokemon)
module.exports = Pokemon;