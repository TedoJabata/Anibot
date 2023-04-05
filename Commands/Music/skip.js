const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'skip',
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
        try {
            await queue.skip()
            await Send(`${client.emotes.success} | Skipped!`, true, interaction, message)
        } catch (e) {
            let error = e.toString().split(' ').slice(2).join(' ')
            await Send(`${client.emotes.error} | ${error}`, true, interaction, message)
        }
    }
}