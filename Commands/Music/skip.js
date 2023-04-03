const { Send } = require("../../Controllers/ReplyController")

module.exports = {
    name: 'skip',
    inVoiceChannel: true,
    execute: async(message, args, client, isInteraction, interaction) => {
        let queue
        if (isInteraction) {
            queue = await client.distube.getQueue(interaction)
            queue.textChannel = interaction.channel
        } else {
            queue = await client.distube.getQueue(message)
            queue.textChannel = message.channel
        }

        if (!queue) return await Send(isInteraction, `${client.emotes.error} | There is nothing in the queue right now!`, true, interaction, message)
        try {
            const song = await queue.skip()
            await Send(isInteraction, `${client.emotes.success} | Skipped!`, false, interaction, message)
        } catch (e) {
            let error = e.toString().split(' ').slice(2).join(' ')
            await Send(isInteraction, `${client.emotes.error} | ${error}`, true, interaction, message)
        }
    }
}