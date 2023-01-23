const { Info } = require("../Prefix/info")

module.exports = {
    category: 'fun',
    description: 'Ping Pong command',

    slash: true,
    testOnly: true,
    callback: ({ interaction }) => {
        Info(interaction)
    },
}