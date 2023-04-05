const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'stop',
    aliases: ['disconnect', 'leave'],
    inVoiceChannel: true,
    execute: async(message, args, client, interaction) => {
        let msgOrIntr
        if (interaction) {
            msgOrIntr = interaction
        } else {
            msgOrIntr = message
        }

        let queue = await client.distube.getQueue(msgOrIntr)
        queue.textChannel = msgOrIntr.channel

        if (!queue) return await Send(`${client.emotes.error} | There is nothing in the queue right now!`, true, interaction, message)

        await queue.stop()
        await Send(`${client.emotes.success} | Stopped!`, true, interaction, message)
    }
}