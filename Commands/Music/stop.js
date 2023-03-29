const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'stop',
    aliases: ['disconnect', 'leave'],
    inVoiceChannel: true,
    execute: async(message, args, client, isInteraction, interaction) => {
        const queue = await client.distube.getQueue(message)
        if (!queue) return await Send(isInteraction, `${client.emotes.error} | There is nothing in the queue right now!`, true, interaction, message)
        await queue.stop()
        await Send(isInteraction, `${client.emotes.success} | Stopped!`, true, interaction, message)
    }
}