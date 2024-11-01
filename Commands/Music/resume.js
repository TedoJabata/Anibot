const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'resume',
    aliases: ['resume', 'unpause'],
    inVoiceChannel: true,
    execute: async(message, args, client, interaction) => {
        let msgOrIntr
        if (interaction) {
            msgOrIntr = interaction
        } else {
            msgOrIntr = message
        }

        let queue = await client.distube.getQueue(msgOrIntr)
        //queue.textChannel = msgOrIntr.channel // Do i need that??

        if (!queue) return await Send(`${client.emotes.error} | There is nothing in the queue right now!`, true, interaction, message)

        if (queue.paused) {
            await queue.resume()
            await Send('Resumed the song for you :)', true, interaction, message)
        } else {
            await Send('The queue is not paused!', true, interaction, message)
        }
    }
}