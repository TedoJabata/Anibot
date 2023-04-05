const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'join',
    aliases: ['move'],
    execute: async(message, args, client, interaction) => {
        let msgOrIntr
        if (interaction) {
            msgOrIntr = interaction
        } else {
            msgOrIntr = message
        }
        let vc = msgOrIntr.member.voice.channel
        if (!vc) {
            return await Send(`${client.emotes.error} | You must be in a voice channel!`, true, interaction, message)
        }
        await client.distube.voices.join(vc)
    }
}