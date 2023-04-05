const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    execute: async(message, args, client, interaction) => {
        let msgOrIntr
        let searchString
        if (interaction) {
            msgOrIntr = interaction
            searchString = args
            interaction.reply('Added!')
        } else {
            msgOrIntr = message
            searchString = args.join(' ')
        }

        if (!searchString) return await Send(`${client.emotes.error} | Please enter a song url or query to search.`, true, interaction, message)
        await client.distube.play(msgOrIntr.member.voice.channel, searchString, {
            member: msgOrIntr.member,
            textChannel: msgOrIntr.channel,
            msgOrIntr
        })
    }
}