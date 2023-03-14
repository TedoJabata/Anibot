module.exports = {
    name: 'pause',
    aliases: ['pause', 'hold'],
    inVoiceChannel: true,
    execute: async(message, args, client) => {
        const queue = await client.distube.getQueue(message)
        if (!queue) return await message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        if (queue.paused) {
            await queue.resume()
            return message.channel.send('Resumed the song for you :)')
        }
        await queue.pause()
        await message.channel.send('Paused the song for you :)')
    }
}