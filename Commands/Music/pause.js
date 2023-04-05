const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'pause',
    aliases: ['pause', 'hold'],
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
        if (queue.paused) {
            await queue.resume()
            return await Send('Resumed the song for you ' + client.emotes.smile, true, interaction, message)
        }
        await queue.pause()
        await Send('Paused the song for you ' + client.emotes.smile, true, interaction, message)
    }
}