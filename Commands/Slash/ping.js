module.exports = {
    category: 'fun',
    description: 'Ping Pong command',

    slash: true,
    testOnly: true,
    callback: ({ interaction }) => {
        if (interaction) {
            interaction.reply("***Pong!***")
        }
    },
}