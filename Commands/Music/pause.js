const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'pause',
    aliases: ['pause', 'hold'],
    inVoiceChannel: true,
    execute: async(message, args, client, isInteraction, interaction) => {
        const queue = await client.distube.getQueue(message)
        if (!queue) return await Send(isInteraction, `${client.emotes.error} | There is nothing in the queue right now!`, true, interaction, message)
        if (queue.paused) {
            await queue.resume()
            return await Send(isInteraction, 'Resumed the song for you :)', true, interaction, message)
        }
        await queue.pause()
        await Send(isInteraction, 'Paused the song for you :)', true, interaction, message)
    }
}