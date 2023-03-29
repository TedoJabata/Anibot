const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'resume',
    aliases: ['resume', 'unpause'],
    inVoiceChannel: true,
    execute: async(message, args, client, isInteraction, interaction) => {
        const queue = await client.distube.getQueue(message)
        if (!queue) return await Send(isInteraction, `${client.emotes.error} | There is nothing in the queue right now!`, true, interaction, message)

        if (queue.paused) {
            await queue.resume()
            await Send(isInteraction, 'Resumed the song for you :)', true, interaction, message)
        } else {
            await Send(isInteraction, 'The queue is not paused!', true, interaction, message)
        }
    }
}