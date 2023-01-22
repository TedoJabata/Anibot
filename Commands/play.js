const { ApplicationCommandOptionType } = require("discord.js")
const { Play } = require("../Music/play")

module.exports = {
    category: 'music',
    description: 'Play music',

    slash: true,
    testOnly: true,

    options: [{
        name: 'arg',
        description: 'link or keyword',
        type: ApplicationCommandOptionType.String,
        required: true,
    }],
    callback: ({ interaction, arg }) => {
        Play(interaction, arg)
    },
}