const { Info } = require("../Prefix/info")

module.exports = {
    category: 'info',
    description: 'Command for infformation',

    slash: true,
    testOnly: true,
    callback: ({ interaction }) => {
        Info(interaction)
    },
}