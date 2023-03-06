module.exports = {
        name: 'ping',
        description: 'Ping Pong command',
        async execute(interaction, player) {

            interaction.reply("***Pong!***")

        }
    }
    /*category: 'fun',
        description: 'Ping Pong command',

        slash: true,
        testOnly: true,
        callback: ({ interaction }) => {
            if (interaction) {
                interaction.reply("***Pong!***")
            }
        },*/