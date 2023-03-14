module.exports = {
    name: 'stop',
    aliases: ['disconnect', 'leave'],
    inVoiceChannel: true,
    execute: async(message, args, client) => {
        const queue = await client.distube.getQueue(message)
        if (!queue) return await message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        await queue.stop()
        await message.channel.send(`${client.emotes.success} | Stopped!`)
    }
}